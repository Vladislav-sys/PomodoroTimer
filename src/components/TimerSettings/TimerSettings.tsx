import { useEffect, useState } from "react"
import { useAppDispatch } from "../../app/hooks"
import { Select } from "antd"
import cls from "./TimerSettings.module.css"
import { IoSettingsSharp } from "react-icons/io5"
import TimerButton from "../TimerButton/TimerButton"
import { startStudying } from "../../app/slices/timerSlice"

interface Props {
  className?: string
}

function TimerSettings({ className }: Props) {
  const [sessionTime, setSessionTime] = useState<number>(25)
  const [num, setNum] = useState<number>(2)
  const [breakTime, setBreakTime] = useState<number>(10)

  useEffect(() => {
    localStorage.removeItem("timer")
  }, [])

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
            options={[
              { value: 25, label: "25 min" },
              { value: 30, label: "30 min" },
              { value: 35, label: "35 min" },
              { value: 40, label: "40 min" },
              { value: 45, label: "45 min" },
              { value: 50, label: "50 min" },
              { value: 55, label: "55 min" },
              { value: 60, label: "60 min" },
            ]}
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
            options={[
              { value: 10, label: "10 min" },
              { value: 15, label: "15 min" },
              { value: 20, label: "20 min" },
              { value: 25, label: "25 min" },
              { value: 30, label: "30 min" },
            ]}
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
            options={[
              { value: 2, label: "2 sessions" },
              { value: 3, label: "3 sessions" },
              { value: 4, label: "4 sessions" },
              { value: 5, label: "5 sessions" },
              { value: 6, label: "6 sessions" },
              { value: 7, label: "7 sessions" },
              { value: 8, label: "8 sessions" },
              { value: 9, label: "9 sessions" },
              { value: 10, label: "10 sessions" },
            ]}
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
