import React from 'react'

export default function Likes({likes}: {likes: number}) {
  return (
    <div className="flex flex-row gap-x-2 items-center">
      <span className="material-symbols-outlined text-xl">thumb_up</span>
      <p>{likes}</p>
    </div>
  )
}
