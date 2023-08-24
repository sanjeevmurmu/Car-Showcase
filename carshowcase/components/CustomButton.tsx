
import { CustomButtonProps } from '@/types'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

const CustomButton = ({title,containerStyles,handleClick,btnType,textStyles,rightIcon,href}: CustomButtonProps) => {


  return (
    <>
      {href?.length > 0 ? (
        <Link href={`${href}`} className={`custom-btn ${containerStyles}`}>
          <span className={`flex-1 ${textStyles}`}>{title}</span>
        </Link>
      ) : (
        <button disabled={false} type={btnType|| 'button'} className={`custom-btn ${containerStyles}`} onClick={handleClick}>
          <span className={`flex-1 ${textStyles}`}>{title}</span>
          {rightIcon &&(<div className='relative w-6 h-6'><Image src={rightIcon} alt='right icon' fill className='object-contain'></Image></div>)}
        </button>
      )}
    </>
  )
}

export default CustomButton
