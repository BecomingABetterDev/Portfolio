import { useState, useEffect, useCallback } from 'react'
import axiosInstance from '../api/axiosInstance'
import { STATIC_PROJECTS } from '../data/staticData'

export function useProjects() {
  const [projects, setProjects] = useState(STATIC_PROJECTS)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchProjects = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await axiosInstance.get('/projects')
      if (res.data && res.data.length > 0) {
        setProjects(res.data)
      } else {
        setProjects(STATIC_PROJECTS)
      }
    } catch {
      // Fall back to static data silently
      setProjects(STATIC_PROJECTS)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  return { projects, loading, error, refetch: fetchProjects }
}
