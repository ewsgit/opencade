import Engine from "engine/index";
import Layer from "engine/layer";

export default class RenderableObject<T extends RenderableObject<T>> {
    context?: CanvasRenderingContext2D;
    engine?: Engine;
    layer?: Layer;

    protected position: { x: number, y: number } = {x: 0, y: 0}
    protected size: { width: number, height: number } = {width: 50, height: 50}

    private tickListener?: (object: T) => void
    private renderListener?: (object: T) => void
    private mouseDownListener?: (object: T) => void
    private keyboardInputListener?: (object: T, key: string) => void

    setX(x: number): this {
        this.position.x = x
        this?.layer?.render()
        return this
    }

    getX(): number {
        return {...this.position}.x
    }

    setY(y: number): this {
        this.position.y = y
        this?.layer?.render()
        return this
    }

    getY(): number {
        return {...this.position}.y
    }

    setWidth(width: number): this {
        this.size.width = width
        this?.layer?.render()
        return this
    }

    setHeight(height: number): this {
        this.size.height = height
        this?.layer?.render()
        return this
    }

    getWidth(): number {
        return { ...this.size }.width
    }

    getHeight(): number {
        return { ...this.size }.height
    }

    onMouseDown(cb: (object: T) => void): this {
        this.mouseDownListener = cb
        return this
    }

    mouseDown() {
        this.mouseDownListener?.(this as any as T)
    }

    onTick(cb: (object: T) => void): this {
        this.tickListener = cb
        return this
    }

    onRender(cb: (object: T) => void): this {
        this.renderListener = cb
        return this
    }

    onKeyboardInput(cb: (object: T, key: string) => void): this {
        this.keyboardInputListener = cb
        return this
    }

    tick() {
        this.tickListener?.(this as any as T)
    }

    render() {
        this.renderListener?.(this as any as T)
        // @ts-ignore
        this.context.fillStyle = "#ff0000"
        this?.context?.fillRect?.(this.position.x, this.position.y, this.size.width, this.size.height)
    }

    keyboardInput(key: string) {
        this.keyboardInputListener?.(this as any as T, key)
    }
}
