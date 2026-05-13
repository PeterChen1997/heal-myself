import { Activity } from 'lucide-react'

export function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="回到全身健康关注地图顶部">
        <span className="brand-mark" aria-hidden="true">
          <Activity size={18} strokeWidth={2.4} />
        </span>
        <span>健康图鉴</span>
      </a>
      <a className="header-link" href="#guide">
        三色分级
      </a>
    </header>
  )
}
