import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
  typography: {
    "fontFamily": `"Roboto", "Arial", "Helvetica", sans-serif`,
   },
  palette: {

  }
})

const CustomizedTheme = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}
 
export default CustomizedTheme
