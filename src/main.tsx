import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from './styles/GlobalStyle.ts'
import { darkTheme } from './styles/theme.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <ThemeProvider theme={darkTheme}>
      <GlobalStyle theme={darkTheme} />
      <App />
    </ThemeProvider>
  </StrictMode>
)

