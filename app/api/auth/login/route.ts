import { NextResponse } from 'next/server'

// Demo admin credentials — replace with a real auth system (e.g. Better Auth + Neon) for production
const DEMO_EMAIL = process.env.ADMIN_EMAIL || 'admin@eyobdev.com'
const DEMO_PASSWORD = process.env.ADMIN_PASSWORD || 'portfolio2024'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password required.' }, { status: 400 })
    }

    if (email !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
      return NextResponse.json({ message: 'Invalid credentials.' }, { status: 401 })
    }

    // Issue a simple demo token (not cryptographically secure — use JWT in production)
    const token = Buffer.from(`${email}:${Date.now()}`).toString('base64')

    return NextResponse.json({
      token,
      admin: { email },
    })
  } catch {
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 })
  }
}
