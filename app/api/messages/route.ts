import { NextResponse } from 'next/server'

// In-memory store for messages (demo purposes — no DB connected)
const messages: Array<{
  _id: string
  name: string
  email: string
  subject?: string
  message: string
  isRead: boolean
  createdAt: string
}> = []

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 })
    }

    const newMessage = {
      _id: `msg_${Date.now()}_${Math.random().toString(36).slice(2)}`,
      name: name.trim(),
      email: email.trim(),
      subject: subject?.trim() || '',
      message: message.trim(),
      isRead: false,
      createdAt: new Date().toISOString(),
    }

    messages.push(newMessage)
    return NextResponse.json({ success: true, id: newMessage._id }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}

export async function GET(request: Request) {
  // Minimal auth check — accept any Bearer token in demo mode
  const auth = request.headers.get('authorization') || ''
  if (!auth.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
  }
  return NextResponse.json(messages.sort((a, b) => b.createdAt.localeCompare(a.createdAt)))
}
