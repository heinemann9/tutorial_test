export default function Home() {
  const teamName = process.env.NEXT_PUBLIC_TEAM_NAME
  const displayName = teamName ? `${teamName} 사이트` : '우리 팀 사이트'

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
      }}
    >
      <h1>{displayName}</h1>
      <p style={{ color: teamName ? '#16a34a' : '#94a3b8' }}>
        {teamName ? '환경변수 적용됨' : '아직 설정 안 됨'}
      </p>
    </main>
  )
}
