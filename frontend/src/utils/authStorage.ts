interface Role {
  name: string
}

interface Position {
  name: string
}

interface User {
  id: number
  fullName: string
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  role: Role
  position: Position
  avatar: string
  age: number
  birthDate: string
}

export const saveUserAndTokenToLocalStorage = (
  user: User,
  accessToken: string
) => {
  localStorage.setItem('user', JSON.stringify(user))
  localStorage.setItem('accessToken', accessToken)
}

export const getUserFromLocalStorage = () => {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}

export const getAccessTokenFromLocalStorage = () => {
  return localStorage.getItem('accessToken')
}

export const clearUserAndTokenFromLocalStorage = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('accessToken')
}

export const isAuthenticated = () => {
  return !!localStorage.getItem('accessToken')
}
