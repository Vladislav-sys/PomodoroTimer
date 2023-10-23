import cls from "./TimerButton.module.css"
import { useAppSelector } from "../../app/hooks"
import { selectMode } from "../../app/slices/timerSlice"

interface Props {
  className?: string
  onClick?: () => void
  isPress: boolean
  children: string
}

function TimerButton({ className, onClick, isPress, children }: Props) {
  const mode = useAppSelector(selectMode)

  return (
    <button
      type="button"
      onClick={onClick}
      style={{ color: mode === "break" ? "#397097" : "#ba4949" }}
      className={`${className ?? ""} ${cls.btn} ${
        isPress ? cls.btn_active : ""
      }`}
    >
      {children}
    </button>
  )
}

export default TimerButton
