import { renderHook, act } from '@testing-library/react'
import { useAuth } from '@/hooks/useAuth'
import { useUserStore } from '@/store'

describe('useAuth', () => {
  beforeEach(() => {
    useUserStore.setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    })
  })

  it('returns null user by default', () => {
    const { result } = renderHook(() => useAuth())
    expect(result.current.user).toBeNull()
  })

  it('returns isAuthenticated false by default', () => {
    const { result } = renderHook(() => useAuth())
    expect(result.current.isAuthenticated).toBe(false)
  })

  it('sets user correctly', () => {
    const { result } = renderHook(() => useAuth())
    act(() => {
      result.current.setUser({
        id: '1',
        name: 'John',
        email: 'john@test.com',
        timezone: 'UTC',
        createdAt: '2024-01-01',
      })
    })
    expect(result.current.user?.name).toBe('John')
    expect(result.current.isAuthenticated).toBe(true)
  })

  it('logs out correctly', () => {
    const { result } = renderHook(() => useAuth())
    act(() => {
      result.current.setUser({
        id: '1',
        name: 'John',
        email: 'john@test.com',
        timezone: 'UTC',
        createdAt: '2024-01-01',
      })
    })
    act(() => {
      result.current.logout()
    })
    expect(result.current.user).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
  })
})
