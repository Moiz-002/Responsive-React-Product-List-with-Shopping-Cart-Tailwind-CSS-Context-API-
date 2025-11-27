import React from 'react'

const EmptyCart = () => {
  return (
    <div 
      className='flex flex-col items-center justify-center gap-3 w-full sm:w-[350px]'
      role="status"
      aria-live="polite"
    >
      <img 
        src="src/assets/images/illustration-empty-cart.svg" 
        alt="" 
        aria-hidden="true" 
      />
      
      <p className='text-red-950 font-semibold text-sm text-center'>
        Your added items will appear here
      </p>
    </div>
  )
}

export default EmptyCart
