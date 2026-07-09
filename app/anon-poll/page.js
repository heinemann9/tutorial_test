export const metadata = {
  title: '익명 투표소',
}

export default function AnonPollPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 420,
          background: '#fff',
          borderRadius: 16,
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 24px rgba(15, 23, 42, 0.06)',
          padding: '40px 32px',
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontSize: 22, fontWeight: 800, margin: 0 }}>익명 투표소</h1>
        <p style={{ color: '#64748b', fontSize: 14, marginTop: 8 }}>
          C가 만든 페이지 — 찬성/반대 익명 투표 데모 (준비 중)
        </p>
        <div style={{ display: 'flex', gap: 12, marginTop: 20, justifyContent: 'center' }}>
          <span
            style={{
              padding: '8px 20px',
              borderRadius: 999,
              background: '#dcfce7',
              color: '#15803d',
              fontWeight: 600,
              fontSize: 13,
            }}
          >
            찬성 0
          </span>
          <span
            style={{
              padding: '8px 20px',
              borderRadius: 999,
              background: '#fee2e2',
              color: '#b91c1c',
              fontWeight: 600,
              fontSize: 13,
            }}
          >
            반대 0
          </span>
        </div>
      </div>
    </main>
  )
}
