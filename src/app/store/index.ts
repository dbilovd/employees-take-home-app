import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { combineSlices, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { employeeSlice } from "./employeesSlice"
import {
  listenerMiddleware,
  logoutMiddlewareListener,
  sessionSlice,
} from "./sessionSlice"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"

const rootReducer = combineSlices(employeeSlice, sessionSlice)

const persistConfig = {
  key: "app",
  storage,
  blacklist: ["session"],
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

export type RootState = ReturnType<typeof rootReducer>

export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: persistedReducer,
    preloadedState,
    middleware: getDefaultMiddleware => [
      ...getDefaultMiddleware(),
      listenerMiddleware.middleware,
      logoutMiddlewareListener.middleware,
    ],
  })
  setupListeners(store.dispatch)
  return store
}

export const store = makeStore()

export const persistor = persistStore(store)

export type AppStore = typeof store

export type AppDispatch = AppStore["dispatch"]

export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
