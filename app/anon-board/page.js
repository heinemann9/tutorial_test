export const metadata = {
  title: '익명 게시판',
}

const posts = [
  { id: 1, title: '첫 글입니다', author: '익명1' },
  { id: 2, title: '반갑습니다', author: '익명2' },
]

export default function AnonBoardPage() {
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
        <h1 style={{ fontSize: 22, fontWeight: 800, margin: 0 }}>익명 게시판</h1>
        <p style={{ color: '#64748b', fontSize: 14, marginTop: 8 }}>
          B가 만든 페이지 — 익명 글쓰기 게시판 데모 (준비 중)
        </p>
        <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0 0', textAlign: 'left' }}>
          {posts.map((p) => (
            <li key={p.id} style={{ padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
              <strong style={{ fontSize: 14 }}>{p.title}</strong>
              <span style={{ color: '#94a3b8', fontSize: 12, marginLeft: 8 }}>{p.author}</span>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
