import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Themes, ThemeType } from '@/constants/constants'
import { RootState } from '@/store'

interface ThemeState {
  theme: ThemeType
}

const initialState: ThemeState = {
  theme: Themes.DARK
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeType>) => {
      state.theme = action.payload
      localStorage.setItem('theme', action.payload)
    },
    initializeTheme: (state) => {
      const savedTheme = localStorage.getItem('theme')
      state.theme =
        savedTheme === Themes.LIGHT || savedTheme === Themes.DARK
          ? (savedTheme as ThemeType)
          : Themes.DARK
    }
  }
})

// Extract the action creators object and the reducer
export const { setTheme, initializeTheme } = themeSlice.actions

// Define a selector for the theme
export const selectTheme = (state: RootState): ThemeType => state.theme.theme

// Export the reducer
export const themeReducer = themeSlice.reducer
