import { useEffect } from "react"
import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux"
import { type RootState, type AppDispatch } from "./store"

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useLocaleStorage = (key: string, val: unknown): void => {
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(val))
  }, [val])
}
