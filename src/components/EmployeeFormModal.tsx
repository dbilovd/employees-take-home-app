import * as React from "react"
import Modal from "@mui/joy/Modal"
import ModalClose from "@mui/joy/ModalClose"
import Typography from "@mui/joy/Typography"
import Sheet from "@mui/joy/Sheet"
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  Stack,
  Select,
  Option,
  Radio,
} from "@mui/joy"
import { Formik, Field, ErrorMessage, Form } from "formik"
import * as Yup from "yup"
import { useDispatch } from "react-redux"
import { add, update } from "../app/store/employeesSlice"
import type { Employee } from "../app/store/employeesSlice"
import { useEffect, useState } from "react"
import { useAppDispatch } from "../app/hooks"

type EmployeeFormModalProps = {
  title: string | null
  employee: Employee | null
}

export default function EmployeeFormModal({
  title,
  employee,
}: EmployeeFormModalProps) {
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)

  const handleSubmit = (values : Employee, { setSubmitting }) => {
    try {
      if (isEdit) {
        dispatch(update({
          id: employee?.id,
          ...values
        }))
      } else {
        dispatch(add(values))
      }
    } catch (e) {
      console.log({ e })
    } finally {
      setSubmitting(false)
      setOpen(false)
    }
  }

  const relationships = [
    {
      key: "FULL_TIME",
      label: "Full Time",
    },
    {
      key: "PART_TIME",
      label: "Part Time",
    },
    {
      key: "CONTRACTOR",
      label: "Contractor",
    },
  ]

  useEffect(() => {
    setIsEdit(!!employee?.id)
  }, [employee])

  return (
    <React.Fragment>
      <Button variant="solid" onClick={() => setOpen(true)}>
        {title || "Add Employee"}
      </Button>

      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            width: 500,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={3}
          >
            {title || `Add a new Employee`}
          </Typography>

          <Formik
            initialValues={{
              name: employee?.name || "",
              age: employee?.age || "",
              relationship: employee?.relationship || "",
              typeOfWork: employee?.typeOfWork || "",
            }}
            validationSchema={Yup.object({
              name: Yup.string()
                .min(2)
                .required("The employees names is required"),
              age: Yup.number()
                .min(18, "An employee must be at least 18 years old to work")
                .max(
                  60,
                  "An employee must NOT be older than 60 years old to work",
                )
                .required("The employees names is required"),
              relationship: Yup.string()
                .oneOf(
                  relationships.map(relationship => relationship.key),
                  "must be on of the following values",
                )
                .required("The Employee's relationship is required"),
              typeOfWork: Yup.string()
                .matches(
                  /^[a-zA-Z][a-zA-Z\d]+$/,
                  "Must start with a letter and only contain numbers and letters.",
                )
                .min(3, "Must contain at least 3 characters")
                .max(255, "Must not be longer then 255 characters")
                .required(
                  "Every employee must have a Type of work specified for them.",
                ),
            })}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({
              values,
              handleChange,
              errors,
              touched,
              isSubmitting,
            }) => (
              <Form>
                <Stack spacing={2}>
                  <FormControl
                    {...(touched.name && errors.name && { error: true })}
                  >
                    <FormLabel>Name</FormLabel>
                    <Field as={Input} type="text" name="name" />
                    <ErrorMessage name="name" />
                  </FormControl>

                  <FormControl
                    {...(touched.age && errors.age && { error: true })}
                  >
                    <FormLabel>Age</FormLabel>
                    <Field as={Input} type="number" name="age" min="0" />
                    <ErrorMessage name="age" />
                  </FormControl>

                  <FormControl
                    {...(touched.relationship &&
                      errors.relationship && { error: true })}
                  >
                    <FormLabel>Relationship</FormLabel>
                    {relationships.map((relationship: object) => (
                      <label key={relationship.key}>
                        <Field
                          type="radio"
                          name="relationship"
                          value={relationship.key}
                          onChange={handleChange}
                        />
                        <span>{relationship.label}</span>
                      </label>
                    ))}
                    <ErrorMessage name="relationship" />
                  </FormControl>

                  <FormControl
                    {...(touched.typeOfWork &&
                      errors.typeOfWork && { error: true })}
                  >
                    <FormLabel>Type of Work</FormLabel>
                    <Field as={Input} type="text" name="typeOfWork" />
                    <ErrorMessage name="typeOfWork" />
                  </FormControl>

                  <FormControl>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      loading={isSubmitting}
                    >
                      Save Employee
                    </Button>
                  </FormControl>
                </Stack>
              </Form>
            )}
          </Formik>
        </Sheet>
      </Modal>
    </React.Fragment>
  )
}
