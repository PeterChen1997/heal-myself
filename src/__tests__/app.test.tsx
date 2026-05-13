import { render, screen } from '@testing-library/react'
import App from '../App'

describe('App', () => {
  it('renders the health atlas hero and section navigation', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: '全身健康关注地图' })).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: '健康图鉴分区' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '头面部' })).toHaveAttribute('href', '#head-face')
    expect(screen.getByRole('link', { name: '颈肩躯干' })).toHaveAttribute('href', '#neck-torso')
    expect(screen.getByRole('link', { name: '运动系统' })).toHaveAttribute('href', '#movement')
    expect(screen.getByRole('link', { name: '系统关注' })).toHaveAttribute('href', '#system')
  })
})
