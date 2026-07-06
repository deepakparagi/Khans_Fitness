'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Login failed')
        setLoading(false)
        return
      }

      router.push('/admin/gallery')
      router.refresh()
    } catch {
      setError('Something went wrong. Try again.')
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg)',
        padding: '24px',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: '100%',
          maxWidth: '360px',
          padding: '40px',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
        }}
      >
        <div style={{ marginBottom: '32px' }}>
          <span
            className="jetbrains"
            style={{
              fontSize: '11px',
              color: 'var(--accent)',
              letterSpacing: '2px',
            }}
          >
            [ADMIN_ACCESS]
          </span>
          <h1
            className="bebas"
            style={{ fontSize: '32px', marginTop: '12px' }}
          >
            GALLERY MANAGER
          </h1>
        </div>

        <label
          style={{
            fontSize: '11px',
            textTransform: 'uppercase',
            color: 'var(--text-secondary)',
            letterSpacing: '1px',
          }}
        >
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          required
          style={{ width: '100%', marginTop: '8px', marginBottom: '16px' }}
        />

        {error && (
          <div
            style={{
              color: 'var(--red)',
              fontSize: '13px',
              marginBottom: '16px',
            }}
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn-accent"
          style={{ width: '100%', padding: '14px' }}
        >
          {loading ? 'VERIFYING...' : 'LOGIN →'}
        </button>
      </form>
    </div>
  )
}
