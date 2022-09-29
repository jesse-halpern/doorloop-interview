import { useRef, useEffect } from 'react'

/**
 * Initializes focus for a given input element
 */
export default function useFocusInput() {
  const inputElement = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus()
    }
  }, [])

  return inputElement
}
