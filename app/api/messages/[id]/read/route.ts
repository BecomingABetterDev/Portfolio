import { NextResponse } from 'next/server'

export async function PATCH(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  // In demo mode — just acknowledge the request
  return NextResponse.json({ success: true, id })
}
