import { render, screen, within } from '@testing-library/react'
import App from '../App'

describe('App', () => {
  afterEach(() => {
    window.history.pushState({}, '', '/')
  })

  it('renders the health atlas hero, navigation, atlas sections and disclaimer', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: '全身健康关注地图' })).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: '健康图鉴分区' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '头面部' })).toHaveAttribute('href', '#head-face')
    expect(screen.getByRole('link', { name: '颈肩躯干' })).toHaveAttribute('href', '#neck-torso')
    expect(screen.getByRole('link', { name: '运动系统' })).toHaveAttribute('href', '#movement')
    expect(screen.getByRole('link', { name: '系统关注' })).toHaveAttribute('href', '#system')
    expect(screen.getByRole('heading', { name: '眼睛' })).toBeInTheDocument()
    expect(screen.getByText('视力正常，不等于眼睛舒服。')).toBeInTheDocument()
    expect(screen.getAllByText('为什么关注')[0]).toBeInTheDocument()
    expect(screen.getAllByText('日常怎么看')[0]).toBeInTheDocument()
    expect(screen.getByText(/本页面提供健康科普信息/)).toBeInTheDocument()
  })

  it('keeps section navigation concise without duplicated short labels', () => {
    render(<App />)

    const nav = screen.getByRole('navigation', { name: '健康图鉴分区' })

    expect(within(nav).getByRole('link', { name: '头面部' })).toBeInTheDocument()
    expect(within(nav).getByRole('link', { name: '颈肩躯干' })).toBeInTheDocument()
    expect(within(nav).getByRole('link', { name: '运动系统' })).toBeInTheDocument()
    expect(within(nav).getByRole('link', { name: '系统关注' })).toBeInTheDocument()
    expect(within(nav).queryByText('头面')).not.toBeInTheDocument()
    expect(within(nav).queryByText('运动')).not.toBeInTheDocument()
  })

  it('marks the guide header action active when opening the guide hash', () => {
    window.history.pushState({}, '', '/#guide')

    render(<App />)

    expect(screen.getByRole('link', { name: '三色分级' })).toHaveAttribute('aria-current', 'true')
    expect(screen.getByRole('link', { name: '头面部' })).not.toHaveAttribute('aria-current')
  })
})
