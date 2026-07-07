export const metadata = {
  title: 'Vercel 배포 따라하기 데모',
  description: '환경변수로 팀 이름을 보여주는 최소 데모 페이지',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body style={{ margin: 0, fontFamily: 'sans-serif' }}>{children}</body>
    </html>
  )
}
