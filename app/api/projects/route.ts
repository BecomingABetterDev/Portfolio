import { NextResponse } from 'next/server'
import { PROJECTS } from '@/lib/portfolioData'

// Start with the static data seeded in — in production, wire this to a real DB
const projects = PROJECTS.map((p) => ({ ...p, _id: p.id, isFeatured: true }))

function requireAuth(request: Request) {
  const auth = request.headers.get('authorization') || ''
  return auth.startsWith('Bearer ')
}

export async function GET() {
  return NextResponse.json(projects.slice().sort((a, b) => a.order - b.order))
}

export async function POST(request: Request) {
  if (!requireAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
  }
  try {
    const body = await request.json()
    const newProject = {
      ...body,
      _id: `proj_${Date.now()}`,
      id: `proj_${Date.now()}`,
    }
    projects.push(newProject)
    return NextResponse.json(newProject, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }
}
