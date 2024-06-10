import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { RELATIONSHIP, employeeById } from "../app/store/employeesSlice"
import { Container, Grid, Typography, Button } from "@mui/joy"
import EmployeeFormModal from "../components/EmployeeFormModal"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { logout } from "../app/store/sessionSlice"

const EmployeeDetails = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const employee = useAppSelector(state => employeeById(state, id))

  const logoutHandler = () => {
    dispatch(logout())
    navigate("/login")
  }

  const goHome = () => {
    navigate("/")
  }

  useEffect(() => {}, [id])

  if (!employee) {
    return (
      <Container maxWidth="md" sx={{ my: 5 }}>
        <Grid container spacing={4} sx={{ flexGrow: 1 }}>
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            justifyContent="center"
            mb={10}
          >
            Employee With ID {id} Not Found!
          </Typography>
        </Grid>
      </Container>
    )
  }

  return (
    <Container maxWidth="md" sx={{ my: 5 }}>
      <Grid container spacing={4} sx={{ flexGrow: 1 }}>
        <Grid xs={8}>
          <Typography
            component="h1"
            id="modal-title"
            level="h1"
            textColor="inherit"
            fontWeight="lg"
            justifyContent="center"
            mb={3}
          >
            {employee?.name}
          </Typography>
        </Grid>
        <Grid xs={4} spacing={4}>
          <Button variant="solid" onClick={goHome}>
            Home
          </Button>

          <Button variant="outlined" onClick={logoutHandler}>
            Logout
          </Button>
        </Grid>
        <Grid
          xs={12}
          direction="column"
          justifyContent="center"
          justifyItems="center"
        >
          <Typography
            component="p"
            textColor="inherit"
            fontWeight="md"
            justifyContent="center"
            mb={2}
          >
            <b>Age:</b> {employee?.age} years
          </Typography>
          <Typography
            component="p"
            textColor="inherit"
            fontWeight="md"
            justifyContent="center"
            mb={2}
          >
            <b>Relationship:</b>{" "}
            {RELATIONSHIP[employee?.relationship].toString()}
          </Typography>
          <Typography
            component="p"
            textColor="inherit"
            fontWeight="md"
            justifyContent="center"
            mb={2}
          >
            <b>Type of Work:</b> {employee?.typeOfWork}
          </Typography>
        </Grid>

        <Grid xs={12}>
          <EmployeeFormModal
            title={`Edit ${employee?.name}`}
            employee={employee}
          />
        </Grid>
      </Grid>
    </Container>
  )
}

export default EmployeeDetails
