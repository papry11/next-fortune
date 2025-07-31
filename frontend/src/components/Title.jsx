import React from 'react'

const Title = ({ text1, text2 }) => {
  return (
    <div className='inline-flex gap-2 items-center mb-3'>
      <p className='text-red-400'>
        {text1} <span className='text-gray-200 font-medium'>{text2}</span>
      </p>
      <p className='w-8 sm:w-12 h-[1px] sm:h-[2px] bg-red-400'></p>
    </div>
  )
}

export default Title
