"use client"

import React, { useEffect, useRef } from "react"
import Engine from "engine/index";

export interface IPage {
  children: React.ReactNode,
}

const Page: React.FC<IPage> = ({ children }) => {
  const ref = useRef() as React.MutableRefObject<HTMLDivElement> | React.MutableRefObject<null>

  useEffect(() => {
    if (!ref?.current) return

    new Engine({
                 containerElement: ref.current,
                 tickTime: 20,
                 frameRate: 60,
                 aspectRatio: "1/2"
               })
  }, [])

  return <div ref={ref}></div>
}

export default Page
