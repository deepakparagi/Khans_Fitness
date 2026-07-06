import { put, del, list } from '@vercel/blob'

export interface GalleryItem {
  url: string
  pathname: string
  type: 'image' | 'video'
  uploadedAt: string
}

const GALLERY_INDEX_PATH = 'gallery/index.json'

export async function getGalleryItems(): Promise<GalleryItem[]> {
  try {
    const { blobs } = await list({ prefix: 'gallery/index' })
    if (blobs.length === 0) return []

    const response = await fetch(blobs[0].url, { cache: 'no-store' })
    if (!response.ok) return []

    return await response.json()
  } catch (error) {
    console.error('Error fetching gallery items:', error)
    return []
  }
}

async function saveGalleryIndex(items: GalleryItem[]): Promise<void> {
  const json = JSON.stringify(items, null, 2)
  await put(GALLERY_INDEX_PATH, json, {
    access: 'public',
    contentType: 'application/json',
    allowOverwrite: true,
  })
}

export async function addGalleryItem(file: File): Promise<GalleryItem> {
  const isVideo = file.type.startsWith('video/')
  const isImage = file.type.startsWith('image/')

  if (!isVideo && !isImage) {
    throw new Error('Only image and video files are allowed')
  }

  const maxSize = isVideo ? 50 * 1024 * 1024 : 10 * 1024 * 1024
  if (file.size > maxSize) {
    throw new Error(`File too large. Max size: ${isVideo ? '50MB' : '10MB'}`)
  }

  const timestamp = Date.now()
  const safeFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
  const pathname = `gallery/media/${timestamp}-${safeFileName}`

  const blob = await put(pathname, file, {
    access: 'public',
    contentType: file.type,
  })

  const newItem: GalleryItem = {
    url: blob.url,
    pathname: blob.pathname,
    type: isVideo ? 'video' : 'image',
    uploadedAt: new Date().toISOString(),
  }

  const currentItems = await getGalleryItems()
  await saveGalleryIndex([newItem, ...currentItems])

  return newItem
}

export async function deleteGalleryItem(pathname: string): Promise<void> {
  const currentItems = await getGalleryItems()
  const itemToDelete = currentItems.find((item) => item.pathname === pathname)

  if (!itemToDelete) throw new Error('Item not found')

  await del(itemToDelete.url)

  const updatedItems = currentItems.filter((item) => item.pathname !== pathname)
  await saveGalleryIndex(updatedItems)
}
