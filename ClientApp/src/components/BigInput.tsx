import React from 'react'

export default function BigInput({body, setBody, style}: {body: string, setBody:React.Dispatch<React.SetStateAction<string>>, style?: "string"}) {
  return (
    <div
    suppressContentEditableWarning={true}
    onBlur={(e) => {
        setBody(e.target.innerText)
    }}
    placeholder="Your thoughts go here..."
    className={`h-full bg-white break-words p-4 text-xl before:block before:text-gray-500 empty:before:content-[attr(placeholder)] ${style}`}
    contentEditable
  >
    {body}
  </div>
  )
}
