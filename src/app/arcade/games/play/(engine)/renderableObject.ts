import Engine from "engine/index";

export default class RenderableObject<T extends RenderableObject<T>> {
  // @ts-ignore
  context: CanvasRenderingContext2D;
  // @ts-ignore
  engine: Engine;

  protected width: number = 50
  protected height: number = 50
  protected x: number = 0
  protected y: number = 0

  private tickListener?: (object: T) => void
  private renderListener?: (object: T) => void

  private previousX: number = 0
  private previousY: number = 0
  private previousWidth: number = 0
  private previousHeight: number = 0
  private renderNextFrame: boolean = true

  setX(x: number): this {
    this.previousX = this.x
    this.x = x
    this.renderNextFrame = true
    return this
  }

  setY(y: number): this {
    this.previousY = this.y
    this.y = y
    this.renderNextFrame = true
    return this
  }

  getX(): number {
    return this.x
  }

  getY(): number {
    return this.y
  }

  setWidth(width: number): this {
    this.previousWidth = this.width
    this.width = width
    this.renderNextFrame = true
    return this
  }

  setHeight(height: number): this {
    this.previousHeight = this.height
    this.height = height
    this.renderNextFrame = true
    return this
  }

  getWidth(): number {
    return this.width
  }

  getHeight(): number {
    return this.height
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
    if (!this.renderNextFrame) return
    this.renderNextFrame = false
    this.renderListener?.(this as any as T)

    this.context.clearRect(this.previousX, this.previousY, this.previousWidth, this.previousHeight)
    this.context.fillStyle = "#ff0000"
    this.context.fillRect(this.x, this.y, this.width, this.height)
  }
}
