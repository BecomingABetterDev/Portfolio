import { NextResponse } from 'next/server'

function requireAuth(request: Request) {
  const auth = request.headers.get('authorization') || ''
  return auth.startsWith('Bearer ')
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!requireAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
  }
  const { id } = await params
  try {
    const body = await request.json()
    return NextResponse.json({ ...body, _id: id })
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!requireAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
  }
  const { id } = await params
  return NextResponse.json({ success: true, id })
}
