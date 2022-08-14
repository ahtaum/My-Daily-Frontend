import { DailyContext } from "../context/DailyContext"
import { useContext } from "react"

export const useDailyContext = () => {
  const context = useContext(DailyContext)

  if(!context) {
    throw Error('useDailyContext must be used inside a DailyContextProvider')
  }

  return context
}