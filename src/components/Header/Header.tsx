import { useState } from "react"

import cls from "./Header.module.css"
import { GiTomato } from "react-icons/gi"
import { LuTimerReset } from "react-icons/lu"
import { Modal } from "antd"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { selectMode, resetTimer } from "../../app/slices/timerSlice"

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const dispatch = useAppDispatch()

  const mode = useAppSelector(selectMode)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
    dispatch(resetTimer())
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <header className={cls.header}>
      <div className={cls.header_logo}>
        <GiTomato />
        <span>Pomofocus</span>
      </div>
      <button
        type="button"
        className={`${cls.btn} ${mode === "settings" ? cls.disable : ""}`}
        onClick={showModal}
        disabled={mode === "settings"}
      >
        <LuTimerReset />
        <span>Reset</span>
      </button>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        bodyStyle={{
          fontSize: "25px",
          padding: "25px",
          textAlign: "center",
          fontFamily: "Roboto",
        }}
        width={400}
        footer={
          <div className={cls.modal_wrap}>
            <button
              className={cls.modal_cancel}
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button className={cls.modal_ok} type="button" onClick={handleOk}>
              OK
            </button>
          </div>
        }
      >
        <p>Do you really want to reset the timer ?</p>
      </Modal>
    </header>
  )
}

export default Header
