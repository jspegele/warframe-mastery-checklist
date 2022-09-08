import React, { useContext, useState } from "react"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"

import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import VisibilityIcon from "@mui/icons-material/Visibility"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"

import { AuthContext } from "../../contexts/AuthContext"

const LoginForm = () => {
  const auth = getAuth()
  const { setAuthState } = useContext(AuthContext)

  const [formValues, setFormValues] = useState({
    email: "",
    emailError: "",
    password: "",
    passwordError: "",
    showPassword: false,
  })

  const onFormChange = (prop) => (event) => {
    if (prop === "email") setFormValues((prevState) => ({ ...prevState, emailError: "" }))
    if (prop === "password") setFormValues((prevState) => ({ ...prevState, passwordError: "" }))
    setFormValues((prevState) => ({ ...prevState, [prop]: event.target.value }))
  }

  const handleShowPassword = () => {
    setFormValues({
      ...formValues,
      showPassword: !formValues.showPassword,
    })
  }

  const handleMouseDownPassword = (e) => e.preventDefault()

  const handleLogin = (e) => {
    e.preventDefault()
    setFormValues((prevState) => ({
      ...prevState,
      emailError: "",
      passwordError: "",
    }))

    if (!formValues.email) {
      setFormValues((prevState) => ({
        ...prevState,
        emailError: "Please enter a valid email",
      }))
    }

    if (!formValues.password) {
      setFormValues((prevState) => ({
        ...prevState,
        passwordError: "Please enter your password",
      }))
    }

    if (formValues.password && formValues.email) {
      signInWithEmailAndPassword(auth, formValues.email, formValues.password)
        .then((userCredential) => {
          setAuthState(userCredential.user)
        })
        .catch((error) => {
          if (error.code === "auth/invalid-email")
            setFormValues((prevState) => ({
              ...prevState,
              emailError: "Please enter a valid email",
            }))
          else if (error.code === "auth/user-not-found")
            setFormValues((prevState) => ({
              ...prevState,
              emailError: "Email address not found",
            }))
          else if (error.code === "auth/wrong-password")
            setFormValues((prevState) => ({
              ...prevState,
              passwordError: "Incorrect password",
            }))
          else
            setFormValues((prevState) => ({
              ...prevState,
              passwordError: "Error authenticating user" + error.code,
            }))
        })
    }
  }

  return (
    <Stack component="form" onSubmit={handleLogin} spacing={3} width="100%">
      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <CheckCircleIcon sx={{ color: "info.main", fontSize: "2rem" }} />
        <Typography component="h1" fontSize="1.5rem" fontWeight="500">
          Admin Login
        </Typography>
      </Stack>
      <TextField
        error={!!formValues.emailError}
        fullWidth
        helperText={formValues.emailError}
        label="Email"
        onChange={onFormChange("email")}
        type="email"
        value={formValues.email}
      />
      <FormControl
        error={!!formValues.passwordError}
        fullWidth
        variant="outlined"
      >
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          type={formValues.showPassword ? "text" : "password"}
          value={formValues.password}
          onChange={onFormChange("password")}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {formValues.showPassword ? (
                  <VisibilityOffIcon />
                ) : (
                  <VisibilityIcon />
                )}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
        <FormHelperText>{formValues.passwordError}</FormHelperText>
      </FormControl>
      <Button color="primary" type="submit" variant="contained">
        LOGIN
      </Button>
    </Stack>
  )
}

export default LoginForm
