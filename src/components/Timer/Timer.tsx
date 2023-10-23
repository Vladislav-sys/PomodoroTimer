import { useEffect } from "react"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import {
  selectTimer,
  nextSecond,
  pressTimerBtn,
  resetTimer,
} from "../../app/slices/timerSlice"
import cls from "./Timer.module.css"
import TimerButton from "../TimerButton/TimerButton"
import cupImage from "../../app/assets/cup.svg"
import { useLocaleStorage } from "../../app/hooks"

interface Props {
  className?: string
}

function Timer({ className }: Props) {
  const timerInfo = useAppSelector(selectTimer)
  const dispatch = useAppDispatch()

  useLocaleStorage("timer", timerInfo)

  useEffect(() => {
    if (timerInfo.curSession > timerInfo.numOfSessions || !timerInfo.isTimer)
      return

    const timerId = setTimeout(() => {
      dispatch(nextSecond())
    }, 1000)

    return () => clearTimeout(timerId)
  }, [timerInfo.isTimer, timerInfo.remTime])

  useEffect(() => {
    if (timerInfo.curSession > timerInfo.numOfSessions) {
      document.title = `PomodoroTimer`
    } else {
      document.title = `${timerInfo.remTime} - PomodoroTimer`
    }

    return () => {
      document.title = "PomodoroTimer"
    }
  }, [timerInfo.remTime])

  if (timerInfo.curSession > timerInfo.numOfSessions) {
    return (
      <div className={`${cls.wrap} ${className ?? ""}`}>
        <div className={cls.end_title}>Congratulations!</div>
        <img src={cupImage} alt="cup" className={cls.end_img} />

        <p className={cls.end_text}>
          You have finished your studies and have been very productive. In
          total, you studied:
        </p>

        <div className={cls.end_count}>
          <span className={cls.end_hours}>
            {Math.floor(
              (timerInfo.numOfSessions * timerInfo.sessionTime) / 60 / 60,
            )}
            :<span>hours</span>
          </span>
          <span className={cls.end_minutes}>
            {Math.floor(
              (timerInfo.numOfSessions * timerInfo.sessionTime) / 60,
            ) % 60}
            :<span>minutes</span>
          </span>
        </div>
        <TimerButton isPress={false} onClick={() => dispatch(resetTimer())}>
          back
        </TimerButton>
      </div>
    )
  }

  return (
    <div className={`${cls.wrap} ${className ?? ""}`}>
      <div className={cls.progress}>
        Session {timerInfo.curSession} / {timerInfo.numOfSessions}
      </div>

      <div className={cls.top}>
        <span
          className={`${cls.top_item} ${
            timerInfo.currentMode === "break" ? "" : cls.active
          }`}
        >
          Pomodoro
        </span>
        <span
          className={`${cls.top_item} ${
            timerInfo.currentMode === "break" ? cls.active : ""
          }`}
        >
          Break
        </span>
      </div>

      <div className={cls.time}>{timerInfo.remTime}</div>

      <TimerButton
        isPress={timerInfo.isTimer}
        onClick={() => dispatch(pressTimerBtn())}
      >
        {timerInfo.isTimer ? "pause" : "start"}
      </TimerButton>
    </div>
  )
}

export default Timer
