import React from 'react'

type Props = {
  label: string;
  value: boolean;
}

export const Switch = (props: Props) => {
  return (
    <label className="relative inline-flex items-center mb-4 cursor-pointer">
      <input type="checkbox" checked={props.value} className="sr-only peer" />
        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        <span className="ml-3 text-base font-bold">{props.label}</span>
    </label>
  )
}