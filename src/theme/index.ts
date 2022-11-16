import { createGlobalStyle } from 'styled-components'

interface DefaultTheme {
  colors: {
    primary: string
    secondary: string
    text: string
    textInverted: string
    textSecondary: string
    white: string
    background: {
      body: string
      cardDark: string
      cardLight: string
    }
  }
}

const theme: DefaultTheme = {
  colors: {
    primary: '#d91e18',
    secondary: '#90c695',
    text: '#E7E7E7',
    textInverted: '#1F1F1F',
    textSecondary: '#B3B3B3',
    white: '#FFFFFF',
    background: {
      body: '#212121',
      cardDark: '#121212',
      cardLight: '#2E2E2E',
    },
  },
}

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    background-color: ${theme.colors.background.body};
    color: ${theme.colors.text};
    font-family: "Poppins", sans-serif;
    margin: 0;
  }
  img {
    max-width: 100%;
    display: block;
  }
  strong {
    font-weight: 700;
  }
`

export const alpha = (color: string, alpha: number) => {
  const hex = color.replace('#', '')
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export default theme
export type { DefaultTheme }
