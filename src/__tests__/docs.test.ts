import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = process.cwd()

function readProjectFile(fileName: string) {
  return readFileSync(resolve(root, fileName), 'utf8')
}

describe('project documentation', () => {
  it('keeps AGENTS and CLAUDE guidance synchronized', () => {
    const agents = readProjectFile('AGENTS.md')
    const claude = readProjectFile('CLAUDE.md')

    expect(agents).toContain('npm run dev')
    expect(agents).toContain('npm run build')
    expect(agents).toContain('npm test -- --run')
    expect(agents).toContain('移动端优先')
    expect(agents).toContain('src/data/bodyParts.ts')
    expect(agents).toContain('GPT-Image-2')

    expect(claude).toContain('npm run dev')
    expect(claude).toContain('npm run build')
    expect(claude).toContain('npm test -- --run')
    expect(claude).toContain('移动端优先')
    expect(claude).toContain('src/data/bodyParts.ts')
    expect(claude).toContain('GPT-Image-2')
  })

  it('documents the final React health atlas workflow in README', () => {
    const readme = readProjectFile('README.md')

    expect(readme).toContain('Vite + React + TypeScript')
    expect(readme).toContain('移动端优先')
    expect(readme).toContain('npm run assets:fallback')
    expect(readme).toContain('src/assets/generated')
    expect(readme).toContain('本页面提供健康科普信息')
  })
})
