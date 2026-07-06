'use client'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

interface GalleryItem {
  url: string
  pathname: string
  type: 'image' | 'video'
  uploadedAt: string
}

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [deletingPath, setDeletingPath] = useState<string | null>(null)
  const [error, setError] = useState('')
  const router = useRouter()

  const fetchItems = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/gallery')
      if (res.status === 401) {
        router.push('/admin/login')
        return
      }
      const data = await res.json()
      setItems(data.items || [])
    } catch {
      setError('Failed to load gallery items')
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    setError('')

    for (const file of Array.from(files)) {
      const formData = new FormData()
      formData.append('file', file)

      try {
        const res = await fetch('/api/admin/gallery', {
          method: 'POST',
          body: formData,
        })
        const data = await res.json()

        if (!res.ok) {
          setError(`Failed to upload ${file.name}: ${data.error}`)
          continue
        }
      } catch {
        setError(`Failed to upload ${file.name}`)
      }
    }

    setUploading(false)
    e.target.value = ''
    fetchItems()
  }

  const handleDelete = async (pathname: string) => {
    if (!confirm('Delete this item permanently?')) return

    setDeletingPath(pathname)
    setError('')

    try {
      const res = await fetch('/api/admin/gallery', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pathname }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Delete failed')
      } else {
        setItems((prev) => prev.filter((item) => item.pathname !== pathname))
      }
    } catch {
      setError('Delete failed')
    } finally {
      setDeletingPath(null)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  if (loading) {
    return (
      <div style={{ padding: '144px 80px', color: 'var(--text-secondary)' }}>
        Loading gallery...
      </div>
    )
  }

  return (
    <div style={{ padding: '80px', minHeight: '100vh' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '48px',
        }}
      >
        <div>
          <span
            className="jetbrains"
            style={{ fontSize: '11px', color: 'var(--accent)', letterSpacing: '2px' }}
          >
            [ADMIN_PANEL]
          </span>
          <h1 className="bebas" style={{ fontSize: '48px', marginTop: '8px' }}>
            MANAGE GALLERY
          </h1>
        </div>
        <button
          onClick={handleLogout}
          className="btn-outline"
          style={{ padding: '10px 24px' }}
        >
          LOGOUT
        </button>
      </div>

      <div
        style={{
          border: '2px dashed var(--border)',
          padding: '40px',
          textAlign: 'center',
          marginBottom: '48px',
        }}
      >
        <label
          style={{
            cursor: uploading ? 'not-allowed' : 'pointer',
            display: 'block',
          }}
        >
          <input
            type="file"
            accept="image/*,video/*"
            multiple
            onChange={handleUpload}
            disabled={uploading}
            style={{ display: 'none' }}
          />
          <div
            className="btn-accent"
            style={{
              display: 'inline-block',
              padding: '14px 32px',
              opacity: uploading ? 0.6 : 1,
            }}
          >
            {uploading ? 'UPLOADING...' : '+ UPLOAD PHOTOS / VIDEOS'}
          </div>
        </label>
        <p style={{ marginTop: '16px', fontSize: '12px', color: 'var(--text-muted)' }}>
          Max 10MB per image, 50MB per video. You can select multiple files.
        </p>
      </div>

      {error && (
        <div
          style={{
            padding: '16px',
            background: 'rgba(230,57,70,0.1)',
            border: '1px solid var(--red)',
            color: 'var(--red)',
            marginBottom: '32px',
            fontSize: '14px',
          }}
        >
          {error}
        </div>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '20px',
        }}
      >
        {items.length === 0 && (
          <p style={{ color: 'var(--text-secondary)' }}>
            No items yet. Upload your first photo or video above.
          </p>
        )}

        {items.map((item) => (
          <div
            key={item.pathname}
            style={{
              border: '1px solid var(--border)',
              position: 'relative',
              aspectRatio: '1',
              overflow: 'hidden',
              background: 'var(--surface)',
            }}
          >
            {item.type === 'image' ? (
              <img
                src={item.url}
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <video
                src={item.url}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                muted
                preload="metadata"
              />
            )}

            <button
              onClick={() => handleDelete(item.pathname)}
              disabled={deletingPath === item.pathname}
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                background: 'var(--red)',
                color: 'white',
                border: 'none',
                width: '32px',
                height: '32px',
                fontSize: '16px',
                cursor: 'pointer',
                opacity: deletingPath === item.pathname ? 0.5 : 1,
              }}
              aria-label="Delete item"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
