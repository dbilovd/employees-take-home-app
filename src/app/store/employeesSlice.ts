import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../createAppSlice"
import { createSelector } from "@reduxjs/toolkit"

export enum RELATIONSHIP {
  FULL_TIME = "Full Time",
  PART_TIME = "Part Time",
  CONTRACTOR = "Contractor",
}

export interface Employee {
  id: string
  name: string
  age: number
  relationship: RELATIONSHIP
  typeOfWork: string
}

const initialState: Employee[] = []

const generateRandomId = (): string => {
  return (Math.random() + 1).toString(36).substring(10)
}

export const employeeSlice = createAppSlice({
  name: "employees",

  initialState,

  reducers: create => ({
    add: create.reducer((state, action: PayloadAction) => {
      let id: string
      let idExists: boolean
      do {
        id = generateRandomId()
        idExists = state.findIndex(employee => employee.id === id) > -1
      } while (!id || idExists)

      state.push({
        id,
        ...action.payload,
      })
    }),

    update: create.reducer((state, action: PayloadAction) => {
      let indexOfId = state.findIndex(
        employee => employee.id === action.payload?.id,
      )
      if (indexOfId >= 0) {
        state[indexOfId] = action.payload
      }
    }),
  }),

  selectors: {
    allEmployees: employees => employees,
    employeeById: (employees, id) =>
      employees.find((employee: Employee) => employee.id === id),
  },
})

export const { add, update } = employeeSlice.actions

export const { allEmployees, employeeById } = employeeSlice.selectors
