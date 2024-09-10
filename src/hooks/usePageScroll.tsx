import { useState, useEffect } from 'react'

export function usePageScroll() {
  const [isOnTop, setIsOnTop] = useState(true)

  useEffect(() => {
    const verifyScroll = () => {
      setIsOnTop(window.scrollY === 0)
    }

    window.addEventListener('scroll', verifyScroll)

    return () => {
      window.removeEventListener('scroll', verifyScroll)
    }
  })

  return { isOnTop }
}
