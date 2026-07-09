import Link from 'next/link'

const links = [
  { href: '/', label: '홈' },
  { href: '/anon-chat', label: '익명 채팅방' },
  { href: '/anon-board', label: '익명 게시판' },
  { href: '/anon-poll', label: '익명 투표소' },
]

export default function Nav() {
  return (
    <nav
      style={{
        display: 'flex',
        gap: 8,
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: '24px 16px 0',
      }}
    >
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          style={{
            padding: '8px 16px',
            borderRadius: 999,
            fontSize: 13,
            fontWeight: 600,
            color: '#475569',
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            textDecoration: 'none',
          }}
        >
          {l.label}
        </Link>
      ))}
    </nav>
  )
}
