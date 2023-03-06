"use client"

import React, {useEffect, useRef} from "react"
import Engine from "engine/index";
import RenderableObject from "engine/renderableObject";

const Page: React.FC = () => {
    const ref = useRef() as React.MutableRefObject<HTMLDivElement> | React.MutableRefObject<null>

    useEffect(() => {
        if (!ref?.current) return

        new Engine(
            {
                containerElement: ref.current,
                tps: 10,
                fps: 60,
            },
            engine => {
                let layer = engine.getLayer(0)

                let SnakeSegmentSize = 20
                let SnakeHeadX = 0
                let SnakeHeadY = 0
                let SnakeSegments: RenderableObject<RenderableObject<any>>[] = []

                enum SnakeDirection {
                    UP = 0,
                    DOWN = 1,
                    LEFT = 2,
                    RIGHT = 3
                }

                let SnakeHeadDirection: SnakeDirection = SnakeDirection.RIGHT

                function addSegment() {
                    console.log("adding segment to the snake")

                    let index = SnakeSegments.length
                    console.log(index)

                    console.log(SnakeSegments)

                    let object = new RenderableObject<RenderableObject<any>>()
                        .setHeight(25)
                        .setWidth(25)
                        .onTick((obj) => {
                            if ((obj.getX() + obj.getWidth()) >= engine.screen().width()) obj.setX(0)
                            if (index === 0) {
                                obj.setX(obj.getX() + SnakeSegmentSize)
                                obj.setY(obj.getY() + SnakeSegmentSize)

                                return
                            }

                            obj.setX(SnakeSegments[index - 1].getX())

                        })

                    SnakeSegments.push(object)

                    layer.addChild(
                        object
                    )
                }

                addSegment()
                addSegment()
            })

    }, [])

    return <div ref={ref}></div>
}

export default Page
