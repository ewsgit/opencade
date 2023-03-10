"use client"

import React, {useEffect, useRef} from "react"
import Engine from "engine/index";
import TextObj from "engine/objects/ui/textObj"
import ImageObj from "engine/objects/ui/imageObj";

const Page: React.FC = () => {
  const ref = useRef() as React.MutableRefObject<HTMLDivElement> | React.MutableRefObject<null>

  useEffect(() => {
    if (!ref?.current) return

    new Engine(
        {
          containerElement: ref.current,
          tps: 20,
          aspectRatio: "16/9"
        },
        (engine) => {
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

        }
    )

  }, [])

  return <div ref={ref}></div>
}

export default Page
