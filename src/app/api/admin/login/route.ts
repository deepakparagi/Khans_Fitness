import { NextRequest, NextResponse } from 'next/server'
import { verifyPassword, setAdminSession } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json()

    if (!password || typeof password !== 'string') {
      return NextResponse.json({ error: 'Password is required' }, { status: 400 })
    }

    if (!verifyPassword(password)) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    await setAdminSession()
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
  }
}
