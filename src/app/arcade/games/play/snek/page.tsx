"use client"

import React, { useEffect, useRef } from "react"
import Engine from "engine/index";
import TextObj from "engine/objects/ui/textObj"
import ImageObj from "engine/objects/ui/imageObj";

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
                              aspectRatio: "16/9"
                            })

    let layer = engine.getLayer(0)
    let textObj = new TextObj().setText("this is some text")

    textObj.setX(100)
    textObj.setY(100)
    textObj.setAlignment("left")
    textObj.setBaseline("top")

    layer.addChild(textObj)

    layer.addChild(new ImageObj())
    layer.addChild(new ImageObj().setX(100))
    layer.addChild(new ImageObj().setX(200))
    layer.addChild(new ImageObj().setX(300))
  }, [])

  return <div ref={ref}></div>
}

export default Page
