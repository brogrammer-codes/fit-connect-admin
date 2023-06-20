import React from 'react'

type PillProps = {
    displayText: string;
    onClose?: () => void
}
const style = {
    wrapper: "flex flex-row px-4 py-1 rounded-full bg-blue-800 w-fit justify-between",
    pillText: "font-semibold text-base",
    closeButton: "pl-5 text-lg hover:text-xl"
}
export const Pill = (props: PillProps) => {
  return (
    <div className={style.wrapper}><span className={style.pillText}>{props.displayText}</span> {props.onClose && <button className={style.closeButton}>X</button>}</div>
  )
}
