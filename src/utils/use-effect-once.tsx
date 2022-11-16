import { useRef, useState, useEffect } from 'react'

// Reference: https://dev.to/ag-grid/react-18-avoiding-use-effect-getting-called-twice-4i9e

export const useEffectOnce = (effect: () => void | (() => void)) => {
  const destroyFunc = useRef<void | (() => void)>()
  const effectCalled = useRef(false)
  const renderAfterCalled = useRef(false)
  const [_, setVal] = useState<number>(0)

  if (effectCalled.current) {
    renderAfterCalled.current = true
  }

  useEffect(() => {
    if (!effectCalled.current) {
      destroyFunc.current = effect()
      effectCalled.current = true
    }

    setVal(val => val + 1)

    return () => {
      if (!renderAfterCalled.current) {
        return
      }
      if (destroyFunc.current) {
        destroyFunc.current()
      }
    }
  }, [])
}
