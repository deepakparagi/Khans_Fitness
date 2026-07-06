import { NextRequest, NextResponse } from 'next/server'
import { isAdminAuthenticated } from '@/lib/auth'
import { getGalleryItems, addGalleryItem, deleteGalleryItem } from '@/lib/gallery'

// GET — list items (admin view)
export async function GET() {
  const authed = await isAdminAuthenticated()
  if (!authed) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const items = await getGalleryItems()
  return NextResponse.json({ items })
}

// POST — upload a new file
export async function POST(req: NextRequest) {
  const authed = await isAdminAuthenticated()
  if (!authed) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const newItem = await addGalleryItem(file)
    return NextResponse.json({ success: true, item: newItem })
  } catch (error: any) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: error.message || 'Upload failed' },
      { status: 500 }
    )
  }
}

// DELETE — remove a file
export async function DELETE(req: NextRequest) {
  const authed = await isAdminAuthenticated()
  if (!authed) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { pathname } = await req.json()
    if (!pathname) {
      return NextResponse.json({ error: 'Pathname required' }, { status: 400 })
    }

    await deleteGalleryItem(pathname)
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Delete error:', error)
    return NextResponse.json(
      { error: error.message || 'Delete failed' },
      { status: 500 }
    )
  }
}
