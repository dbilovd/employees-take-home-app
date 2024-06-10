import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { createBrowserRouter, RouterProvider} from "react-router-dom"
import App from "./App"
import { store } from "./app/store"
import "./index.css"
import Login from "./pages/Login"
import Home from "./pages/Home"
import AddEmployee from "./pages/AddEmployee"
import EmployeeDetails from "./pages/Employee"

import '@fontsource/inter';


const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/employees/:id',
      element: <EmployeeDetails />
    }
  ]);

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
