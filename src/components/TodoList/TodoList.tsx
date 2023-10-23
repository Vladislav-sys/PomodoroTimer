import { useAppSelector, useAppDispatch } from "../../app/hooks"
import {
  selectTodos,
  makeActive,
  toggleCompleted,
  deleteTask,
  deleteAllTasks,
  addAsyncTask,
  reorderTasks,
} from "../../app/slices/todosSlice"
import cls from "./TodoList.module.css"
import { RiDeleteBin5Fill } from "react-icons/ri"
import { TiDelete } from "react-icons/ti"
import { FaCheckCircle } from "react-icons/fa"
import { BsFillPlusCircleFill } from "react-icons/bs"
import { useState, useEffect, useRef } from "react"
import { useLocaleStorage } from "../../app/hooks"

function TodoList() {
  const tasks = useAppSelector(selectTodos)
  const dispatch = useAppDispatch()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [taskText, setTaskText] = useState<string>("")

  const [isTaskAdding, setIsTaskAdding] = useState<boolean>(false)
  const refDrag = useRef<boolean>(false)

  useLocaleStorage("todos", tasks)

  useEffect(() => {
    if (!isOpen || isTaskAdding) return

    document.onmousedown = (e) => {
      if ((e.target as HTMLElement).closest(`.${cls.add_wrap}`) === null) {
        setIsOpen(false)
        setTaskText("")
      }
    }

    return () => {
      document.onmousedown = null
    }
  })

  return (
    <div className={cls.wrap}>
      <div className={cls.cur_task}>
        {tasks.length > 0
          ? tasks.find((task) => task.isActive)?.taskText ?? "No active tasks"
          : "No tasks"}
      </div>

      <div className={cls.list_top}>
        <span>Tasks</span>
        <button
          type="button"
          className={cls.top_btn}
          onClick={() => {
            dispatch(deleteAllTasks())
          }}
        >
          <RiDeleteBin5Fill /> Clear all
        </button>
      </div>

      <ul className={cls.list}>
        {tasks.map((task) => {
          return (
            <li
              key={task.id}
              className={cls.list_item_wrap}
              style={{
                height: "64px",
              }}
            >
              <div
                className={cls.list_item}
                style={{ borderColor: task.isActive ? "rgb(34, 34, 34)" : "" }}
                onClick={() => {
                  if (refDrag.current) {
                    refDrag.current = false
                    return
                  }

                  dispatch(makeActive(task.id))
                }}
                onDragStart={() => false}
                data-id={task.id}
                onMouseDown={(e) => {
                  refDrag.current = false
                  const coords = (
                    e.currentTarget as HTMLDivElement
                  ).getBoundingClientRect()

                  const shiftX = e.clientX - coords.left
                  const shiftY = e.clientY - coords.top
                  const item = e.currentTarget as HTMLDivElement

                  const startX = e.clientX
                  const startY = e.clientY

                  let flag: boolean = false

                  const moveHandler = (e: MouseEvent): void => {
                    if (
                      !refDrag.current &&
                      Math.abs(startX - e.clientX) < 10 &&
                      Math.abs(startY - e.clientY) < 10
                    ) {
                      return
                    } else {
                      flag = true
                    }

                    item.style.position = "fixed"
                    item.style.backgroundImage =
                      "linear-gradient(to right, rgba(255, 255, 255, 0.9) 20%, rgba(0, 0, 0, 0.2))"
                    item.style.backgroundColor = "transparent"
                    item.style.left = `${e.clientX - shiftX}px`
                    item.style.top = `${e.clientY - shiftY}px`

                    item.style.display = "none"
                    const elem = document.elementFromPoint(e.clientX, e.clientY)
                    item.style.display = "flex"

                    if (elem === null) return

                    const isItem = elem.closest(`.${cls.list_item}`)

                    if (isItem === null) return

                    const curId = (isItem as HTMLElement).dataset.id
                    const dragId = (item as HTMLElement).dataset.id

                    if (curId === undefined || dragId === undefined) return

                    dispatch(reorderTasks(curId, dragId))
                  }

                  document.addEventListener("mousemove", moveHandler)

                  function up() {
                    if (flag) refDrag.current = true
                    item.style.position = ""
                    item.style.backgroundImage = ""
                    item.style.backgroundColor = ""
                    item.style.left = ""
                    item.style.top = ""
                    document.removeEventListener("mousemove", moveHandler)
                    document.onmouseup = null
                  }

                  document.onmouseup = up
                }}
              >
                <span className={cls.task_left}>
                  <FaCheckCircle
                    style={{ color: task.isCompleted ? "#BA4949" : "" }}
                    onClick={(e) => {
                      e.stopPropagation()
                      dispatch(toggleCompleted(task.id))
                    }}
                    onMouseDown={(e) => e.stopPropagation()}
                  />
                  <span
                    style={
                      task.isCompleted
                        ? { textDecoration: "line-through", opacity: "0.6" }
                        : {}
                    }
                  >
                    {task.taskText}
                  </span>
                </span>

                <TiDelete
                  onClick={(e) => {
                    e.stopPropagation()
                    dispatch(deleteTask(task.id))
                  }}
                  onMouseDown={(e) => e.stopPropagation()}
                />
              </div>
            </li>
          )
        })}
      </ul>

      {isOpen ? (
        <div className={cls.add_wrap}>
          <div className={cls.add_input_wrap}>
            <input
              type="text"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              className={cls.add_input}
              placeholder="What are you working on?"
            />
          </div>

          <div className={cls.add_footer}>
            <button
              type="button"
              className={cls.add_cancel_btn}
              onClick={() => {
                setIsOpen(false)
                setTaskText("")
              }}
              disabled={isTaskAdding}
            >
              Cancel
            </button>
            <button
              type="button"
              className={`${cls.add_save_btn} ${
                isTaskAdding ? cls.add_save_active : ""
              }`}
              disabled={isTaskAdding}
              onClick={() => {
                if (taskText.length === 0) return
                setIsTaskAdding(true)
                dispatch(addAsyncTask(taskText))
                  .unwrap()
                  .then(() => {
                    setIsOpen(false)
                    setTaskText("")
                    setIsTaskAdding(false)
                  })
                  .catch((e) => console.log(e))
              }}
            >
              Add
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          className={cls.add_btn}
          onClick={() => setIsOpen(true)}
        >
          <BsFillPlusCircleFill />
          <span>add task</span>
        </button>
      )}
    </div>
  )
}

export default TodoList
