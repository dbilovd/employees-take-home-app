import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../createAppSlice"
import { createListenerMiddleware } from "@reduxjs/toolkit"

export type Session = {
  adminUsername: string | null
  adminPassword: string | null
  loggedIn: number | string | null
}

const initialState = (): Session => {
  return {
    adminUsername: localStorage.getItem("adminUsername"),
    adminPassword: localStorage.getItem("adminPassword"),
    loggedIn: localStorage.getItem("loggedIn"),
  }
}

export const sessionSlice = createAppSlice({
  name: "session",

  initialState: initialState(),

  reducers: create => ({
    update: create.reducer((state, action: PayloadAction) => {
      if (action.value !== undefined) {
        state[action.field] = action.value
      } else {
        delete state[action]
      }
    }),

    logout: create.reducer((state, action: PayloadAction) => {
      return initialState()
    }),
  }),

  selectors: {
    isLoggedIn: session => session.loggedIn ?? "0",
    adminUsername: session => session.adminUsername,
    adminPassword: session => session.adminPassword,
  },
})

export const { update, logout } = sessionSlice.actions
export const { isLoggedIn, adminUsername, adminPassword } =
  sessionSlice.selectors

export const listenerMiddleware = createListenerMiddleware()
listenerMiddleware.startListening({
  actionCreator: update,
  effect: (action, { getState }) => {
    const payload = action.payload
    if (payload?.value !== undefined) {
      localStorage.setItem(payload?.field, payload?.value)
    } else {
      localStorage.removeItem(payload?.field)
    }
  },
})

export const logoutMiddlewareListener = createListenerMiddleware()
logoutMiddlewareListener.startListening({
  actionCreator: logout,
  effect: action => {
    localStorage.removeItem("adminUsername")
    localStorage.removeItem("adminPassword")
    localStorage.setItem("loggedIn", "0")
  },
})
