import React, { AnchorHTMLAttributes, forwardRef, ReactNode, Ref } from 'react'

const A = forwardRef(({ children, ...rest }, ref) => {
  return (
    <a
      ref={ref}
      {...rest}
      className="text-blue-700 focus:outline-none focus:ring"
    >
      {children}
    </a>
  )
})

A.displayName = 'A'

export default A
