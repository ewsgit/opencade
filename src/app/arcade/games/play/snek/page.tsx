"use client"

import React, { useEffect, useRef } from "react"
import Engine from "engine/index";
import Text from "engine/objects/ui/text"

export interface IPage {
  children: React.ReactNode,
}

const Page: React.FC<IPage> = ({ children }) => {
  const ref = useRef() as React.MutableRefObject<HTMLDivElement> | React.MutableRefObject<null>

  useEffect(() => {
    if (!ref?.current) return

    let engine = new Engine({
                              containerElement: ref.current,
                              tickTime: 20,
                              frameRate: 60,
                              aspectRatio: "1/2"
                            })

    let layer = engine.getLayer(0)
    let textObj = new Text(layer.context, engine).setText("this is some text")

    textObj.setX(100)
    textObj.setY(100)
    textObj.setAlignment("left")
    textObj.setBaseline("top")

    layer.addChild(textObj)
  }, [])

  return <div ref={ref}></div>
}

export default Page
