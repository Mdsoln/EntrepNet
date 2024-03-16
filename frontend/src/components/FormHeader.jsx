import React from 'react'

export default function FormHeader({text, style}) {
  return (
    <div className={`font-bold text-white ${style}`}>{text}</div>
  )
}
