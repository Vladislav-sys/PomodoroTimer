import { useState } from "react"
import { useAppDispatch } from "../../app/hooks"
import { Select } from "antd"
import cls from "./TimerSettings.module.css"
import { IoSettingsSharp } from "react-icons/io5"
import TimerButton from "../TimerButton/TimerButton"
import { startStudying } from "../../app/slices/timerSlice"
import {
  sessionTimeSelectOptions,
  numOfSessionsSelectOptions,
  breakTimeSelectOptions,
} from "./config/main"

interface Props {
  className?: string
}

function TimerSettings({ className }: Props) {
  const [sessionTime, setSessionTime] = useState<number>(25)
  const [num, setNum] = useState<number>(2)
  const [breakTime, setBreakTime] = useState<number>(10)

  const dispatch = useAppDispatch()

  function handleSessionTime(val: number) {
    setSessionTime(val)
  }

  function handleNum(val: number) {
    setNum(val)
  }

  function handleBreakTime(val: number) {
    setBreakTime(val)
  }

  return (
    <div className={`${cls.wrap} ${className ?? ""}`}>
      <div className={cls.top}>
        <IoSettingsSharp />
        <span>Timer Settings</span>
      </div>
      <div className={cls.selects_wrap}>
        <div className={cls.select_wrap}>
          <div className={cls.select_label}>Pomodoro</div>
          <Select
            size="large"
            style={{ width: "100%", height: "50px" }}
            className={cls.select}
            value={sessionTime}
            onChange={handleSessionTime}
            listHeight={200}
            virtual={false}
            options={sessionTimeSelectOptions}
          />
        </div>
        <div className={cls.select_wrap}>
          <div className={cls.select_label}>Break</div>
          <Select
            size="large"
            value={breakTime}
            style={{ width: "100%", height: "50px" }}
            onChange={handleBreakTime}
            listHeight={200}
            virtual={false}
            options={breakTimeSelectOptions}
          />
        </div>
        <div className={cls.select_wrap}>
          <div className={cls.select_label}>Number of sessions</div>
          <Select
            size="large"
            value={num}
            style={{ width: "100%", height: "50px" }}
            onChange={handleNum}
            listHeight={200}
            virtual={false}
            options={numOfSessionsSelectOptions}
          />
        </div>
      </div>

      <TimerButton
        isPress={false}
        onClick={() =>
          dispatch(
            startStudying({ sessionTime, breakTime, numOfSessions: num }),
          )
        }
      >
        start studying
      </TimerButton>
    </div>
  )
}

export default TimerSettings
