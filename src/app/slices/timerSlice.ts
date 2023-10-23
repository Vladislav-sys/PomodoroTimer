import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { secondsToTime, timeToSeconds } from "../utils"

interface State {
  currentMode: "study" | "break" | "settings"
  curSession: number
  numOfSessions: number
  sessionTime: number
  breakTime: number
  remTime: string
  isTimer: boolean
  isMessage: boolean
}

const defaultState: State = {
  currentMode: "settings",
  curSession: -1,
  numOfSessions: -1,
  remTime: "",
  isTimer: false,
  sessionTime: -1,
  breakTime: -1,
  isMessage: false,
}

let initialState: State = defaultState

if (localStorage.getItem("timer") !== null) {
  initialState = JSON.parse(localStorage.getItem("timer")!)

  if (initialState.currentMode === "study") {
    initialState.isTimer = false
    initialState.isMessage = false
    initialState.remTime = secondsToTime(initialState.sessionTime)
  } else if (initialState.currentMode === "break") {
    initialState.isTimer = false
    initialState.isMessage = false
    initialState.remTime = secondsToTime(initialState.breakTime)
  }
}

const slice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    startStudying(
      state,
      action: PayloadAction<{
        sessionTime: number
        breakTime: number
        numOfSessions: number
      }>,
    ) {
      state.currentMode = "study"
      state.curSession = 1
      state.numOfSessions = action.payload.numOfSessions
      state.breakTime = action.payload.breakTime * 60
      state.sessionTime = action.payload.sessionTime * 60
      state.remTime = secondsToTime(action.payload.sessionTime * 60)
      state.isTimer = false
      state.isMessage = false
    },

    resetTimer() {
      return defaultState
    },

    hideMessage(state) {
      state.isMessage = false
    },

    pressTimerBtn(state) {
      state.isTimer = !state.isTimer
    },

    nextSecond(state) {
      const remSeconds: number = timeToSeconds(state.remTime) - 1

      if (state.currentMode === "study") {
        if (remSeconds <= 0) {
          state.remTime = secondsToTime(state.breakTime)
          state.currentMode = "break"
          state.isTimer = false
          state.isMessage = true

          if (state.curSession === state.numOfSessions) {
            state.curSession++
            state.currentMode = "study"
            state.isMessage = false
          }
        } else {
          state.remTime = secondsToTime(remSeconds)
        }
      } else {
        if (remSeconds <= 0) {
          state.curSession++
          state.remTime = secondsToTime(state.sessionTime)
          state.currentMode = "study"
          state.isTimer = false
          state.isMessage = true
        } else {
          state.remTime = secondsToTime(remSeconds)
        }
      }
    },
  },
})

export const {
  startStudying,
  resetTimer,
  nextSecond,
  pressTimerBtn,
  hideMessage,
} = slice.actions
export default slice.reducer

export const selectMode = (s: RootState) => s.timer.currentMode
export const selectMessage = (s: RootState) => s.timer.isMessage
export const selectTimer = (s: RootState) => s.timer
