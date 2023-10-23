import { configureStore, type ThunkAction, type Action } from "@reduxjs/toolkit"
import timerReducer from "./slices/timerSlice"
import todosReducer from "./slices/todosSlice"

export const store = configureStore({
  reducer: {
    timer: timerReducer,
    todos: todosReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export type ThunkApi = {
  dispatch: AppDispatch
  state: RootState
  rejectValue: string
}
