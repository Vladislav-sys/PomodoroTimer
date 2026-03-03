import { type SelectProps } from "antd"

export const sessionTimeSelectOptions: SelectProps["options"] = [
  { value: 25, label: "25 min" },
  { value: 30, label: "30 min" },
  { value: 35, label: "35 min" },
  { value: 40, label: "40 min" },
  { value: 45, label: "45 min" },
  { value: 50, label: "50 min" },
  { value: 55, label: "55 min" },
  { value: 60, label: "60 min" },
]

export const breakTimeSelectOptions: SelectProps["options"] = [
  { value: 10, label: "10 min" },
  { value: 15, label: "15 min" },
  { value: 20, label: "20 min" },
  { value: 25, label: "25 min" },
  { value: 30, label: "30 min" },
]

export const numOfSessionsSelectOptions: SelectProps["options"] = [
  { value: 2, label: "2 sessions" },
  { value: 3, label: "3 sessions" },
  { value: 4, label: "4 sessions" },
  { value: 5, label: "5 sessions" },
  { value: 6, label: "6 sessions" },
  { value: 7, label: "7 sessions" },
  { value: 8, label: "8 sessions" },
  { value: 9, label: "9 sessions" },
  { value: 10, label: "10 sessions" },
]
