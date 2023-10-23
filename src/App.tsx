import cls from "./App.module.css"
import Header from "./components/Header/Header"
import { useAppSelector } from "./app/hooks"
import { selectMode } from "./app/slices/timerSlice"
import TimerSettings from "./components/TimerSettings/TimerSettings"
import Timer from "./components/Timer/Timer"
import Message from "./components/Message/Message"
import TodoList from "./components/TodoList/TodoList"

function App() {
  const mode = useAppSelector(selectMode)

  return (
    <div
      className={cls.wrap}
      style={{ backgroundColor: mode === "break" ? "#397097" : "#ba4949" }}
    >
      <div className={cls.container}>
        <Header />
        {mode !== "settings" ? (
          <Timer className={cls.timer} />
        ) : (
          <TimerSettings className={cls.timer} />
        )}
      </div>
      <TodoList />
      <Message />
    </div>
  )
}

export default App
