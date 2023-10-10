import { useEffect, useRef } from 'react'

function useKeyPress(targetKey: string, callback: () => void) {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    function handleKeyPress(event: KeyboardEvent) {
      if (event.key === targetKey) {
        callbackRef.current()
      }
    }

    document.addEventListener('keydown', handleKeyPress)

    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [targetKey])
}

export default useKeyPress
