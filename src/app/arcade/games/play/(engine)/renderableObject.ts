import Engine from "engine/index";
import Layer from "engine/layer";

export default class RenderableObject<T extends RenderableObject<T>> {
    context?: CanvasRenderingContext2D;
    engine?: Engine;
    layer?: Layer;

    protected width: number = 50
    protected height: number = 50
    protected x: number = 0
    protected y: number = 0

    private tickListener?: (object: T) => void
    private renderListener?: (object: T) => void
    private mouseDownListener?: (object: T) => void

    setX(x: number): this {
        this.x = x
        this?.layer?.render()
        return this
    }

    getX(): number {
        return this.x
    }

    setY(y: number): this {
        this.y = y
        this?.layer?.render()
        return this
    }

    getY(): number {
        return this.y
    }

    setWidth(width: number): this {
        this.width = width
        this?.layer?.render()
        return this
    }

    setHeight(height: number): this {
        this.height = height
        this?.layer?.render()
        return this
    }

    getWidth(): number {
        return this.width
    }

    getHeight(): number {
        return this.height
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

    tick() {
        this.tickListener?.(this as any as T)
    }

    render() {
        this.renderListener?.(this as any as T)
        // @ts-ignore
        this.context.fillStyle = "#ff0000"
        this?.context?.fillRect?.(this.x, this.y, this.width, this.height)
    }
}
