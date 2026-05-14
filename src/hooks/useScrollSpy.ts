import { useCallback, useEffect, useState } from 'react'

export function useScrollSpy(sectionIds: string[]) {
  const [activeId, setActiveId] = useState(() => {
    const hashId = window.location.hash.slice(1)
    return sectionIds.includes(hashId) ? hashId : (sectionIds[0] ?? '')
  })

  const updateActiveId = useCallback(() => {
    const anchorOffset = 124
    const guideElement = document.getElementById('guide')
    const guideTop = guideElement?.getBoundingClientRect().top
    const isNearPageEnd =
      window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 24

    if (
      sectionIds.includes('guide') &&
      ((guideTop !== undefined && guideTop < window.innerHeight * 0.72) || isNearPageEnd)
    ) {
      setActiveId('guide')
      return
    }

    const candidates = sectionIds
      .map((id) => {
        const element = document.getElementById(id)
        if (!element) return null

        return {
          id,
          top: element.getBoundingClientRect().top
        }
      })
      .filter((item): item is { id: string; top: number } => item !== null)

    const passed = candidates.filter((candidate) => candidate.top <= anchorOffset)
    const nextId = passed.at(-1)?.id ?? candidates[0]?.id ?? ''

    if (nextId) {
      setActiveId(nextId)
    }
  }, [sectionIds])

  useEffect(() => {
    updateActiveId()

    window.addEventListener('scroll', updateActiveId, { passive: true })
    window.addEventListener('resize', updateActiveId)

    return () => {
      window.removeEventListener('scroll', updateActiveId)
      window.removeEventListener('resize', updateActiveId)
    }
  }, [updateActiveId])

  useEffect(() => {
    const updateFromHash = () => {
      const hashId = window.location.hash.slice(1)
      if (sectionIds.includes(hashId)) {
        setActiveId(hashId)
      }
    }

    window.addEventListener('hashchange', updateFromHash)
    return () => window.removeEventListener('hashchange', updateFromHash)
  }, [sectionIds])

  return activeId
}
