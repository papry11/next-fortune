import React from 'react'

const NewsletterBox = () => {

    const onSubmitHandler = (event) => {
        event.preventDefault();
    }
  return (
    <div className='text-center'>
          <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
          <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex flex-items-center gap-3 mx-auto my-6 pl-3 border' action="">
              <input className='w-full sm:flex-1 outline-none' type="email" placeholder='Enter your email' />
              <button type='submit' className='bg-black text-white text-xs px-10 py-4'>SUBSCRIBE</button>
          </form>
    </div>
  )
}

export default NewsletterBox
