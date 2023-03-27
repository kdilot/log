'use client'

import React from 'react'

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="w-full h-[100vh] bg-red-200 px-8 sm:px-[20%] lg:px-[30%] overflow-auto">{children}</div>
}

export default Wrapper
