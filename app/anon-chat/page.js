export const metadata = {
  title: '익명 채팅방',
}

export default function AnonChatPage() {
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
        <h1 style={{ fontSize: 22, fontWeight: 800, margin: 0 }}>익명 채팅방</h1>
        <p style={{ color: '#64748b', fontSize: 14, marginTop: 8 }}>
          A가 만든 페이지 — 실시간 익명 채팅 데모 (준비 중)
        </p>
      </div>
    </main>
  )
}
