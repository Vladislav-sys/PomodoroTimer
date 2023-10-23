import { useEffect, useRef } from "react"
import {
  hideMessage,
  selectMessage,
  selectMode,
} from "../../app/slices/timerSlice"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import cls from "./Message.module.css"
import { GiCancel } from "react-icons/gi"

function Message() {
  const dispatch = useAppDispatch()

  const mode = useAppSelector(selectMode)
  const isMessage = useAppSelector(selectMessage)

  const refContainer = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isMessage) return

    refContainer.current?.classList.add(cls.active)
    const timerId = setTimeout(() => {
      dispatch(hideMessage())
    }, 4000)

    return () => {
      clearTimeout(timerId)
      refContainer.current?.classList.remove(cls.active)
    }
  }, [isMessage])

  return (
    <div className={cls.wrap} ref={refContainer}>
      Time to {mode === "study" ? "focus" : "take a break"}!
      <button
        type="button"
        className={cls.btn}
        onClick={() => dispatch(hideMessage())}
      >
        <GiCancel />
      </button>
    </div>
  )
}

export default Message
