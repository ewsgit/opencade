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
                tps: 10
            },
            engine => {
                let layer = engine.getLayer(0)

                let SnakeSegmentCountWidth = 30
                let SnakeSegmentSize = engine.screen().width() / SnakeSegmentCountWidth
                let SnakeHeadX = 0
                let SnakeHeadY = 0
                let SnakeSegments: {x: number, y:number}[] = [{x: 2, y: 5}, {x: 3, y:5}]

                enum SnakeDirection {
                    UP = 0,
                    DOWN = 1,
                    LEFT = 2,
                    RIGHT = 3
                }

                let SnakeHeadDirection: SnakeDirection = SnakeDirection.RIGHT

                layer.addChild(
                    new RenderableObject<RenderableObject<any>>()
                        .onRender((obj) => {
                            console.log("render")

                            SnakeSegments.forEach(segment => {
                                // @ts-ignore
                                obj.context.fillStyle = "green"
                                obj.context?.fillRect?.(segment.x * SnakeSegmentSize, segment.y * SnakeSegmentSize, (segment.x * SnakeSegmentSize) + SnakeSegmentSize, (segment.y * SnakeSegmentSize) + SnakeSegmentSize)
                            })
                        })
                )
            })

    }, [])

    return <div ref={ref}></div>
}

export default Page
