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
                tps: 20,
                fps: 60,
            },
            engine => {
                let layer = engine.getLayer(0)

                let SnakeSegmentSize = 20
                let SnakeHeadX = 0
                let SnakeHeadY = 0

                enum SnakeDirection {
                    UP = 0,
                    DOWN = 1,
                    LEFT = 2,
                    RIGHT = 3
                }

                let SnakeHeadDirection: SnakeDirection = SnakeDirection.RIGHT

                layer.addChild(
                    new RenderableObject<RenderableObject<any>>()
                        .setHeight(100)
                        .setWidth(2)
                        .onTick((obj) => {
                            if (SnakeHeadDirection === SnakeDirection.LEFT) {
                                obj.setX(obj.getX() - SnakeSegmentSize)
                            }
                            if (SnakeHeadDirection === SnakeDirection.RIGHT) {
                                obj.setX(obj.getX() + SnakeSegmentSize)
                            }
                            if (SnakeHeadDirection === SnakeDirection.UP) {
                                obj.setY(obj.getY() - SnakeSegmentSize)
                            }
                            if (SnakeHeadDirection === SnakeDirection.DOWN) {
                                obj.setY(obj.getY() + SnakeSegmentSize)
                            }
                        }))
            })

    }, [])

    return <div ref={ref}></div>
}

export default Page
