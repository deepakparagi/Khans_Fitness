import { NextResponse } from 'next/server'
import { getGalleryItems } from '@/lib/gallery'

export async function GET() {
  const items = await getGalleryItems()
  return NextResponse.json({ items })
}
