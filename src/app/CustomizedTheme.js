import { createTheme, ThemeProvider } from '@mui/material/styles'

const darkTheme = createTheme({
  typography: {
    "fontFamily": `"Roboto", "Arial", "Helvetica", sans-serif`,
   },
  palette: {
    mode: 'dark',
  },
});

// const lightTheme = createTheme({
//   typography: {
//     "fontFamily": `"Roboto", "Arial", "Helvetica", sans-serif`,
//    },
//   palette: {

//   }
// })

const CustomizedTheme = ({ children }) => {
  return (
    <ThemeProvider theme={darkTheme}>
      {children}
    </ThemeProvider>
  )
}
 
export default CustomizedTheme
