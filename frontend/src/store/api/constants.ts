export const apiURLS = {
  base: `${import.meta.env.VITE_API_BASE_URL}/api/`,

  auth: {
    login: 'auth/login',
    refresh: 'auth/refresh',
    logout: 'auth/logout',
    verifyOtp: 'auth/verify',
    setPassword: 'auth/set-password',
    forgotPassword: 'auth/forgot-password'
  },

  users: {
    getAll: 'users',
    getById: (id: number) => `users/${id}`,
    create: 'users/create-user',
    update: (id: number) => `users/${id}`,
    delete: (id: number) => `users/${id}`,
    getAllRoles: 'users/roles',
    getAllPositions: 'users/positions'
  }
} as const
