'use client'

// GitHub으로 로그인한 사람만 공지를 쓸 수 있게 하는 부분.
// 읽기는 누구나 가능하고(RLS의 읽기 공개 정책), 쓰기는 로그인한 본인 것만 허용된다.
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

const inputStyle = {
  width: '100%',
  padding: '10px 12px',
  marginTop: 8,
  borderRadius: 10,
  border: '1px solid #cbd5e1',
  fontSize: 14,
  fontFamily: 'inherit',
}

const buttonStyle = {
  marginTop: 12,
  padding: '10px 18px',
  borderRadius: 10,
  border: 0,
  background: '#6366f1',
  color: '#fff',
  fontSize: 14,
  fontWeight: 700,
  cursor: 'pointer',
}

export default function NoticeWriter() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    // 지금 로그인 상태인지 확인하고, 이후 로그인·로그아웃도 감지한다.
    supabase.auth.getUser().then(({ data }) => setUser(data.user ?? null))
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => sub.subscription.unsubscribe()
  }, [])

  async function signIn() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo: window.location.origin },
    })
    if (error) setMessage(`로그인 실패: ${error.message}`)
  }

  async function signOut() {
    await supabase.auth.signOut()
    setMessage('')
  }

  // 저장할 때 user_id를 본인 것으로 넣어야 RLS의 쓰기 정책을 통과한다.
  async function addNotice(event) {
    event.preventDefault()
    setBusy(true)
    setMessage('')

    const { error } = await supabase
      .from('notices')
      .insert({ title, content, user_id: user.id })

    setBusy(false)
    if (error) {
      setMessage(`저장 실패: ${error.message}`)
      return
    }
    setTitle('')
    setContent('')
    setMessage('저장했습니다.')
    router.refresh() // 위 목록을 새로 불러온다
  }

  const label = user?.user_metadata?.user_name ?? user?.email ?? '로그인됨'

  return (
    <div style={{ marginTop: 20, textAlign: 'left' }}>
      {!user ? (
        <>
          <button onClick={signIn} style={{ ...buttonStyle, marginTop: 0 }}>
            GitHub으로 로그인
          </button>
          <p style={{ color: '#94a3b8', fontSize: 12, marginTop: 10 }}>
            읽기는 누구나 가능합니다. 공지를 쓰려면 로그인하세요.
          </p>
        </>
      ) : (
        <>
          <p style={{ color: '#64748b', fontSize: 12, margin: 0 }}>
            {label} 님으로 로그인됨 ·{' '}
            <button
              onClick={signOut}
              style={{
                background: 'none',
                border: 0,
                color: '#6366f1',
                cursor: 'pointer',
                fontSize: 12,
                padding: 0,
              }}
            >
              로그아웃
            </button>
          </p>

          <form onSubmit={addNotice}>
            <input
              style={inputStyle}
              placeholder="제목"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <input
              style={inputStyle}
              placeholder="내용"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button type="submit" style={buttonStyle} disabled={busy}>
              {busy ? '저장 중…' : '공지 추가'}
            </button>
          </form>
        </>
      )}

      {message ? (
        <p style={{ color: '#475569', fontSize: 13, marginTop: 12 }}>{message}</p>
      ) : null}
    </div>
  )
}
