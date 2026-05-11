'use server'

import { headers } from 'next/headers'
import { createHash } from 'crypto'
import { createServiceClient } from '@/lib/supabase/server'

type WaitlistInput = {
  phone: string
  countryCode: string
  countryName: string
  currency: string
}

type WaitlistResult =
  | { success: true }
  | { error: 'invalid_phone' | 'rate_limited' | 'duplicate' | 'server_error' }

function sanitisePhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, '')
  return digits.length >= 7 && digits.length <= 15 ? digits : null
}

function hashIp(ip: string): string {
  const salt = process.env.IP_HASH_SALT ?? 'fallback-salt'
  return createHash('sha256').update(`${ip}:${salt}`).digest('hex')
}

export async function submitWaitlist(input: WaitlistInput): Promise<WaitlistResult> {
  try {
    // ── 1. Validate & sanitise ──────────────────────────────────────────────
    const digits = sanitisePhone(input.phone)
    if (!digits) return { error: 'invalid_phone' }

    const countryCode = input.countryCode.replace(/[^+\d]/g, '')
    const countryName = input.countryName.replace(/[^a-zA-ZÀ-ÿ '\-\.]/g, '').slice(0, 80)
    const currency = ['GHS', 'XOF', 'XAF'].includes(input.currency) ? input.currency : null
    if (!currency) return { error: 'invalid_phone' }

    const fullPhone = `${countryCode}${digits}`

    // ── 2. Hash IP ──────────────────────────────────────────────────────────
    let ipHash = 'unknown'
    try {
      const headersList = await headers()
      const rawIp =
        headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ??
        headersList.get('x-real-ip') ??
        'unknown'
      ipHash = hashIp(rawIp)
    } catch {
      // headers() can throw outside request context — safe to continue
    }

    const supabase = createServiceClient()

    // ── 3. Rate limit: max 5 per IP per 24 hours ────────────────────────────
    const since = new Date(Date.now() - 86_400_000).toISOString()
    const { count: recentCount } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true })
      .eq('ip_hash', ipHash)
      .gte('created_at', since)

    if ((recentCount ?? 0) >= 5) return { error: 'rate_limited' }

    // ── 4. Duplicate phone check ────────────────────────────────────────────
    const { data: existing } = await supabase
      .from('waitlist')
      .select('id')
      .eq('phone', fullPhone)
      .limit(1)

    if (existing && existing.length > 0) return { error: 'duplicate' }

    // ── 5. Insert ───────────────────────────────────────────────────────────
    const { error: insertErr } = await supabase.from('waitlist').insert({
      phone: fullPhone,
      country_code: countryCode,
      country_name: countryName,
      currency,
      ip_hash: ipHash,
    })

    if (insertErr) {
      console.error('[waitlist] insert error:', insertErr.message)
      return { error: 'server_error' }
    }

    return { success: true }

  } catch (err) {
    console.error('[waitlist] unexpected error:', err)
    return { error: 'server_error' }
  }
}
