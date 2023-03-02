"use client"

import React, {useEffect, useRef} from "react"
import Engine from "engine/index";
import Text from "engine/objects/ui/textObj"

const Page: React.FC = () => {
    const ref = useRef() as React.MutableRefObject<HTMLDivElement> | React.MutableRefObject<null>

    useEffect(() => {
        if (!ref?.current) return

        let engine = new Engine({
            containerElement: ref.current,
            tickTime: 20,
            frameRate: 60,
        })

        let layer = engine.getLayer(0)
        layer.addChild(
            new Text()
                .setText("this is some text")
                .setX(100)
                .setY(100)
                .setAlignment("left")
                .setBaseline("top")
                .onTick(
                    (obj) => {
                        obj.setY(obj.getY() + 10)
                        obj.setSize(obj.getSize() - 0.5)
                    })
        )
    }, [])

    return <div ref={ref}></div>
}

export default Page
