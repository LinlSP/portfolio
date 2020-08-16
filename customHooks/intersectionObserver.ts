import { useEffect, useRef, useState, MutableRefObject } from 'react'

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3,
}

export default function CreateIntersectionObserver(): [MutableRefObject<HTMLDivElement>, boolean] {
  const [intersected, setIntersected] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) return setIntersected(true)
        })
      }, options)
      observer.observe(ref.current)
      return () => observer.unobserve(ref.current)
    }
  }, [])

  return [ref, intersected]
}
