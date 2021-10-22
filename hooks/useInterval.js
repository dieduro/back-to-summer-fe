import { useEffect, useRef } from 'react'

export default function useInterval(callback, delay, inRunning) {
  const savedCallback = useRef(null)

  useEffect(() => {
    savedCallback.current = callback
  })

  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current()
      }
    }

    if (inRunning) {
      const id = setInterval(tick, delay)

      return () => clearInterval(id)
    }
  }, [inRunning])
}
