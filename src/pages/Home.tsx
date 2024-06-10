import { Button, Grid, Table, Typography, Link, Container } from "@mui/joy"
import EmployeeFormModal from "../components/EmployeeFormModal"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { RELATIONSHIP, allEmployees } from "../app/store/employeesSlice"
import {
  isLoggedIn as isLoggedInSelector,
  logout,
} from "../app/store/sessionSlice"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const Home = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const employees = useAppSelector(allEmployees)
  const isLoggedIn = useAppSelector(isLoggedInSelector)

  const logoutSession = () => {
    dispatch(logout())
    navigate("/login")
  }

  useEffect(() => {
    if (!isLoggedIn || isLoggedIn === "0") {
      navigate("/login")
    }
  }, [])

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
            All Employees
          </Typography>
        </Grid>
        <Grid xs={4}>
          <Button variant="outlined" onClick={logoutSession}>
            Logout
          </Button>
        </Grid>
        <Grid
          xs={12}
          direction="column"
          justifyContent="center"
          justifyItems="center"
        >
          {employees?.length < 1 ? (
            <Typography
              component="h2"
              id="modal-title"
              level="h4"
              textColor="inherit"
              fontWeight="lg"
              justifyContent="center"
              mb={10}
            >
              No Employee Added
            </Typography>
          ) : (
            <Table>
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Relationship</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map(employee => (
                  <tr key={employee.id}>
                    <td>{employee.name}</td>
                    <td>{RELATIONSHIP[employee.relationship].toString()}</td>
                    <td>
                      <Link href={`/employees/${employee.id}`}>
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}

          <Grid justifyItems="center" sx={{ py: 4 }}>
            <EmployeeFormModal />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Home
