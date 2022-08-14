import { useAuthContext } from './useAuthContext'
import { useDailyContext } from './useDailyContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: dispatchDaily } = useDailyContext()

  const logout = () => {
    localStorage.removeItem('user')

    dispatch({ type: 'LOGOUT' })
    dispatchDaily({ type: 'SET_DAILY', payload: null })
  }

  return { logout }
}