import { ErrorMessage, Field, Form, Formik } from "formik"
import {
  Container,
  Grid,
  Typography,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from "@mui/joy"
import { useEffect } from "react"
import { redirect, useSearchParams, useNavigate } from "react-router-dom"
import {
  update,
  isLoggedIn,
  adminUsername,
  adminPassword,
} from "../app/store/sessionSlice"
import { useAppDispatch, useAppSelector } from "../app/hooks"

type AdminFormValues = {
  adminUsername: string
  adminPassword: string
}

const Login = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isLoggedInValue = useAppSelector(isLoggedIn)
  const adminUsernameValue = useAppSelector(adminUsername)
  const adminPasswordValue = useAppSelector(adminPassword)
  const [searchParams, setSearchParams] = useSearchParams()

  const authenticateAdmin = ({
    adminUsername,
    adminPassword,
  }: AdminFormValues) => {
    if (
      adminUsername === adminUsernameValue &&
      adminPassword === adminPasswordValue
    ) {
      dispatch(update({ field: "loggedIn", value: "1" }))
      navigate("/")
      return
    }

    alert("Invalid credentials")
  }

  useEffect(() => {
    if (isLoggedInValue && isLoggedInValue === "1") {
      navigate("/")
    }
    debugger
  }, [navigate, isLoggedInValue])

  useEffect(() => {
    const initialAdminUsername = searchParams.get("initialAdminUsername")
    const initialAdminPassword = searchParams.get("initialAdminPassword")

    if (initialAdminUsername && initialAdminPassword) {
      dispatch(update({ field: "adminUsername", value: initialAdminUsername }))
      dispatch(update({ field: "adminPassword", value: initialAdminPassword }))
      setSearchParams({})
      redirect("/login")
    }

    return () => {}
  }, [])

  return (
    <Container maxWidth="xs" sx={{ my: 5 }}>
      <Grid container spacing={4} sx={{ flexGrow: 1 }}>
        <Typography
          component="h1"
          id="modal-title"
          level="h1"
          textColor="inherit"
          fontWeight="lg"
          justifyContent="center"
          mb={3}
        >
          Login
        </Typography>

        <Grid
          container
          xs={12}
          direction="column"
          justifyContent="center"
          justifyItems="center"
        >
          <Formik
            initialValues={{ adminUsername: "", adminPassword: "" }}
            onSubmit={authenticateAdmin}
          >
            {({ touched, errors, isSubmitting }) => (
              <Form>
                <Stack spacing={2}>
                  <FormControl
                    {...(touched.adminUsername &&
                      errors.adminUsername && { error: true })}
                  >
                    <FormLabel>Username</FormLabel>
                    <Field as={Input} type="text" name="adminUsername" />
                    <ErrorMessage name="adminUsername" />
                  </FormControl>

                  <FormControl
                    {...(touched.adminPassword &&
                      errors.adminPassword && { error: true })}
                  >
                    <FormLabel>Password</FormLabel>
                    <Field as={Input} type="password" name="adminPassword" />
                    <ErrorMessage name="adminPassword" />
                  </FormControl>

                  <FormControl>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      loading={isSubmitting}
                    >
                      Login
                    </Button>
                  </FormControl>
                </Stack>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Login
