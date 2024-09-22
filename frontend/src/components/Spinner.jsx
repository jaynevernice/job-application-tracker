import React from 'react' 
import HashLoader from 'react-spinners/HashLoader'

const Spinner = () => {
  return (
    <div className='flex items-center justify-center h-[400px]'>
        <HashLoader
            color="#124E66"
            size={50}
            aria-label='Spinner'
        />
    </div>
  )
}

export default Spinner