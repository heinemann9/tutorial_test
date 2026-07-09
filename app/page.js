import { supabase } from '@/lib/supabase'

export default async function Home() {
  const teamName = process.env.NEXT_PUBLIC_TEAM_NAME
  const isSet = Boolean(teamName)
  const displayName = isSet ? `${teamName} 사이트` : '우리 팀 사이트'

  const hasSupabaseEnv = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
  const { data: notices } = hasSupabaseEnv
    ? await supabase.from('notices').select('*').order('created_at', { ascending: false })
    : { data: null }

  return (
    <main
      style={{
        minHeight: 'calc(100vh - 72px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 460,
          background: '#fff',
          borderRadius: 20,
          border: '1px solid #e2e8f0',
          boxShadow: '0 12px 40px rgba(15, 23, 42, 0.08)',
          padding: '44px 36px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            margin: '0 auto 22px',
            borderRadius: 16,
            background: 'linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 800,
            fontSize: 16,
            boxShadow: '0 8px 16px rgba(99, 102, 241, 0.25)',
          }}
        >
          VS
        </div>

        <h1 style={{ fontSize: 24, fontWeight: 800, margin: 0 }}>{displayName}</h1>
        <p style={{ color: '#64748b', fontSize: 14, marginTop: 8 }}>
          Vercel 배포 따라하기 데모 페이지
        </p>

        <span
          style={{
            display: 'inline-block',
            marginTop: 16,
            padding: '4px 12px',
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 600,
            color: isSet ? '#15803d' : '#94a3b8',
            background: isSet ? '#dcfce7' : '#f1f5f9',
          }}
        >
          {isSet ? '● 환경변수 적용됨' : '○ 아직 설정 안 됨'}
        </span>

        <p style={{ color: '#94a3b8', fontSize: 12, marginTop: 24 }}>
          <code>NEXT_PUBLIC_TEAM_NAME</code> 값을 바꾸고 재배포하면 위 이름이 바뀝니다.
        </p>

        <hr style={{ margin: '28px 0', border: 0, borderTop: '1px solid #e2e8f0' }} />

        <h2
          style={{
            fontSize: 16,
            fontWeight: 700,
            margin: 0,
            textAlign: 'left',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: 999,
              background: '#6366f1',
              display: 'inline-block',
            }}
          />
          공지사항
        </h2>

        {!hasSupabaseEnv ? (
          <p style={{ color: '#94a3b8', fontSize: 13, marginTop: 12, textAlign: 'left' }}>
            아직 Supabase 연결 전입니다. 환경변수를 넣고 재배포하면 여기에 데이터가 표시됩니다.
          </p>
        ) : notices?.length ? (
          <ul style={{ listStyle: 'none', padding: 0, margin: '12px 0 0', textAlign: 'left' }}>
            {notices.map((n) => (
              <li
                key={n.id}
                style={{
                  padding: '14px 16px',
                  marginBottom: 8,
                  borderRadius: 12,
                  background: '#f8fafc',
                }}
              >
                <strong style={{ fontSize: 14 }}>{n.title}</strong>
                <p style={{ color: '#64748b', fontSize: 13, margin: '4px 0 0' }}>{n.content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ color: '#94a3b8', fontSize: 13, marginTop: 12, textAlign: 'left' }}>
            아직 등록된 공지사항이 없습니다.
          </p>
        )}
      </div>
    </main>
  )
}
