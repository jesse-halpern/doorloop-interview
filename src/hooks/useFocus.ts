import { useRef, useEffect } from 'react'

export default function useFocusInput() {
  const inputElement = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus()
    }
  }, [])

  return inputElement
}
