import {
  createSlice,
  type PayloadAction,
  nanoid,
  createAsyncThunk,
} from "@reduxjs/toolkit"
import { type RootState, type AppThunk, type ThunkApi } from "../store"
import { wait } from "../utils"

interface Item {
  id: string
  taskText: string
  isActive: boolean
  isCompleted: boolean
}

let initialState: Item[] = [
  {
    id: "1",
    taskText: "Buy milk",
    isActive: true,
    isCompleted: false,
  },
  {
    id: "2",
    taskText: "pick up the package",
    isActive: false,
    isCompleted: false,
  },
]

if (localStorage.getItem("todos") !== null) {
  initialState = JSON.parse(localStorage.getItem("todos")!)
}

const slice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    makeActive(state, action: PayloadAction<string>) {
      state.forEach((task) => {
        if (task.id === action.payload) {
          task.isActive = true
        } else {
          task.isActive = false
        }
      })
    },
    toggleCompleted(state, action: PayloadAction<string>) {
      state.forEach((task) => {
        if (task.id === action.payload) {
          task.isCompleted = !task.isCompleted
        }
      })
    },
    deleteTask(state, action: PayloadAction<string>) {
      return state.filter((task) => task.id !== action.payload)
    },
    deleteAllTasks() {
      return []
    },

    addTask: {
      reducer(state, action: PayloadAction<{ id: string; text: string }>) {
        state.push({
          id: action.payload.id,
          taskText: action.payload.text,
          isActive: false,
          isCompleted: false,
        })
      },

      prepare(taskText: string) {
        return { payload: { id: nanoid(), text: taskText } }
      },
    },

    move(state, action: PayloadAction<{ dragInd: number; curInd: number }>) {
      const { curInd, dragInd } = action.payload

      if (curInd < dragInd) {
        const drag = state[action.payload.dragInd]

        for (let i = dragInd - 1; i >= curInd; i--) {
          state[i + 1] = state[i]
        }

        state[curInd] = drag
      } else {
        const drag = state[action.payload.dragInd]

        for (let i = dragInd; i < curInd; i++) {
          state[i] = state[i + 1]
        }

        state[curInd] = drag
      }
    },
  },
})

export default slice.reducer

export const {
  makeActive,
  toggleCompleted,
  deleteTask,
  deleteAllTasks,
  addTask,
  move,
} = slice.actions

export const selectTodos = (state: RootState) => state.todos

export const reorderTasks =
  (curId: string, dragId: string): AppThunk =>
  (dispatch, getState) => {
    const tasks = selectTodos(getState())

    const dragInd = tasks.findIndex((task) => task.id === dragId)
    const curInd = tasks.findIndex((task) => task.id === curId)

    dispatch(move({ dragInd, curInd }))
  }

export const addAsyncTask = createAsyncThunk<void, string, ThunkApi>(
  "todos/addAsyncTask",
  async (taskText, { dispatch, rejectWithValue }) => {
    try {
      await wait(700)
      dispatch(addTask(taskText))
    } catch (e) {
      throw rejectWithValue("Error while adding task!")
    }
  },
)
