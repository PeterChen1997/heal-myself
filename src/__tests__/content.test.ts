import { bodyParts } from '../data/bodyParts'
import { imagePrompts } from '../data/imagePrompts'
import { sections } from '../data/sections'

describe('health atlas content', () => {
  it('covers the approved 13 body parts across 4 sections', () => {
    expect(sections).toHaveLength(4)
    expect(bodyParts).toHaveLength(13)
    expect(new Set(bodyParts.map((part) => part.id)).size).toBe(13)
    expect(bodyParts.map((part) => part.name)).toEqual([
      '眼睛',
      '口腔',
      '鼻腔',
      '头皮',
      '颈椎',
      '甲状腺',
      '胃肠',
      '脊柱',
      '膝盖',
      '足弓',
      '睡眠',
      '过敏',
      '营养'
    ])
  })

  it('keeps featured parts image-rich and compact parts lightweight', () => {
    const featured = bodyParts.filter((part) => part.priority === 'featured')
    const compact = bodyParts.filter((part) => part.priority === 'compact')

    expect(featured.map((part) => part.id)).toEqual([
      'eyes',
      'oral',
      'neck',
      'gut',
      'knee',
      'feet',
      'sleep'
    ])
    expect(compact).toHaveLength(6)
    featured.forEach((part) => {
      expect(part.images.principle).toBeTruthy()
      expect(part.images.lifestyle).toBeTruthy()
    })
  })

  it('has prompts for every referenced image asset', () => {
    const referenced = bodyParts.flatMap((part) =>
      [part.images.principle, part.images.lifestyle].filter(Boolean)
    )

    expect(imagePrompts.map((prompt) => prompt.fileName)).toEqual(
      expect.arrayContaining(['hero-health-map.webp', ...referenced])
    )
  })
})
