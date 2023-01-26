import React from 'react'

// Gradients from https://uigradients.com/
const gradients = [
    ['#DA4453', '#89216B'],
    ['#636363', '#a2ab58'],
    ['#ad5389', '#3c1053'],
    ['#a8c0ff', '#3f2b96'],
    ['#333333', '#dd1818'],
    ['#12c2e9', '#c471ed'],
    ['#355C7D', '#C06C84'],
    ['#bc4e9c', '#f80759'],
    ['#40E0D0', '#FF8C00'],
    ['#3E5151', '#DECBA4'],
    ['#11998e', '#38ef7d'],
]
const getRandomGradient = () => {
    return gradients[Math.floor(Math.random()*gradients.length)];
}

const prettyDate = (date) => {
    let prettyDate = new Date(date.replace(/\s/g, "T")).toLocaleDateString();
    return prettyDate
}

export default function PostCard({postData}) {
    const randomGradient = getRandomGradient()

  return (
    <div className="cursor-pointer p-4 font-karla text-white flex flex-col gap-y-4 rounded-xl" style={{"background": `linear-gradient(90deg, ${randomGradient[0]}, ${randomGradient[1]})`}}>
        <h1 className='font-bold text-2xl'>{postData.title}</h1>
        <div className='flex flex-row justify-between text-sm'>
            <div className="flex flex-row gap-x-8">
                <div className='flex flex-row gap-x-2 items-center'>
                    <span className="material-symbols-outlined text-xl">
                        calendar_month
                    </span>
                    <p>{prettyDate(postData.createdAt)}</p>
                </div>
                <div className='flex flex-row gap-x-2 items-center'>
                    <span className="material-symbols-outlined text-xl">
                        thumb_up
                    </span>
                    <p>{postData.likes}</p>
                </div>
            </div>
            <div className='flex flex-row items-center bg-gray-800 rounded-md px-2'>
                <span className="material-symbols-outlined text-xl">
                    person
                </span>
                <p className='bg-gray-800 rounded-md w-fit px-2'>{postData.userNickname}</p>
            </div>
        </div>
    </div>
  )
}