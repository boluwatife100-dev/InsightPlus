import { useEffect, useRef, useState } from 'react'

// ============================================================
// useApi — tiny data-fetching hook used by every page.
//
//   const { data, error, loading, reload } = useApi(loader, deps)
//
// - `loader` must be a Promise-returning function (any service).
// - `deps` are the values that trigger a refetch; keep them to
//   primitives / stable arrays (they are compared by serialization).
// - `data` / `error` are null until resolved.
// - `reload()` re-runs the loader (used by Retry buttons).
// Guards against state updates after unmount.
// ============================================================
export function useApi(loader, deps = []) {
  const [state, setState] = useState({ data: null, error: null, loading: true })
  const [tick, setTick] = useState(0)

  // Keep the latest loader in a ref so the effect never goes stale.
  const loaderRef = useRef(loader)
  loaderRef.current = loader

  // Flatten caller deps into a stable string so the dependency array
  // stays a literal that the linter can verify statically.
  const depsKey = JSON.stringify(deps)

  useEffect(() => {
    let active = true
    setState((prev) => ({ ...prev, loading: true, error: null }))

    loaderRef.current()
      .then((data) => {
        if (active) setState({ data, loading: false, error: null })
      })
      .catch((error) => {
        if (active) setState({ data: null, loading: false, error })
      })

    return () => {
      active = false
    }
  }, [tick, depsKey])

  const reload = () => setTick((value) => value + 1)
  const setData = (newData) => setState((prev) => ({ ...prev, data: newData }))

  return { ...state, reload, setData }
}