"use client"

import React, {useEffect, useRef} from "react"
import Engine from "engine/index";
import RenderableObject from "engine/renderableObject";

const Page: React.FC = () => {
    const ref = useRef() as React.MutableRefObject<HTMLDivElement> | React.MutableRefObject<null>

    useEffect(() => {
        if (!ref?.current) return

        new Engine({
            containerElement: ref.current, tps: 10, aspectRatio: "1 / 1"
        }, engine => {
            let layer = engine.getLayer(0)

            let SnakeSegmentCountWidth = 30
            let SnakeSegmentSize = engine.screen()
                                         .width() / SnakeSegmentCountWidth
            let SnakeHeadX = 0
            let SnakeHeadY = 0
            let SnakeSegments: RenderableObject<RenderableObject<any>>[] = []

            enum SnakeDirection {
                UP = 0, DOWN = 1, LEFT = 2, RIGHT = 3
            }

            let SnakeHeadDirection: SnakeDirection = SnakeDirection.RIGHT

            SnakeSegments.push(new RenderableObject<RenderableObject<any>>()
                .setHeight(SnakeSegmentSize)
                .setWidth(SnakeSegmentSize)
                .onTick((obj) => {
                    SnakeSegments.map((seg, ind) => {
                        if (ind === 0) return

                        // @ts-ignore
                        seg.updatePosition(seg)
                    })

                    switch (SnakeHeadDirection) {
                        case SnakeDirection.RIGHT:
                            obj.setX(obj.getX() + SnakeSegmentSize)
                            if(obj.getX() + obj.getWidth() >= engine.screen().width()) obj.setX(0)
                            break;
                        case SnakeDirection.LEFT:
                            obj.setX(obj.getX() - SnakeSegmentSize)
                            if(obj.getX() + obj.getWidth() <= 0) obj.setX(0)
                            break;
                        case SnakeDirection.UP:
                            obj.setY(obj.getY() - SnakeSegmentSize)
                            if(obj.getY() + obj.getHeight() <= 0) obj.setX(0)
                            break;
                        case SnakeDirection.DOWN:
                            obj.setY(obj.getY() + SnakeSegmentSize)
                            if(obj.getY() + obj.getHeight() >= engine.screen().height()) obj.setX(0)
                            break;
                    }
                })
                .onKeyboardInput((obj, key) => {
                    switch (key) {
                        case "w":
                            SnakeHeadDirection = SnakeDirection.UP
                            break;
                        case "a":
                            SnakeHeadDirection = SnakeDirection.LEFT
                            break;
                        case "s":
                            SnakeHeadDirection = SnakeDirection.DOWN
                            break;
                        case "d":
                            SnakeHeadDirection = SnakeDirection.RIGHT
                            break;
                        case "=":
                            window.location.reload()
                            break;
                    }
                })
            )

            layer.addChild(SnakeSegments[0])

            function addSegment() {
                let segInd = SnakeSegments.length

                let elem = new RenderableObject<RenderableObject<any>>()

                // @ts-ignore
                elem.updatePosition = obj => {
                    obj.setY(SnakeSegments[segInd - 1].getY())
                    obj.setX(SnakeSegments[segInd - 1].getX())
                }

                elem.setHeight(SnakeSegmentSize)
                elem.setWidth(SnakeSegmentSize)

                elem.render = () => {
                    if (!elem.context) return

                    elem.context.fillStyle = "green"
                    elem.context.fillRect(elem.getX(), elem.getY(), elem.getWidth(), elem.getHeight())
                }

                SnakeSegments.push(elem)

                layer.addChild(SnakeSegments[segInd])
            }

            addSegment()
            addSegment()
            addSegment()
            addSegment()
        })

    }, [])

    return <div ref={ref}></div>
}

export default Page
