import Engine from "engine/index";

export default class RenderableObject<T extends RenderableObject<T>> {
  // @ts-ignore
  context: CanvasRenderingContext2D;
  // @ts-ignore
  engine: Engine;
  protected width: number = 50
  protected height: number = 50
  protected x: number = 10
  protected y: number = 10
  private tickListener?: (object: T) => void
  private renderListener?: (object: T) => void

  setX(x: number): this {
    this.x = x
    return this
  }

  setY(y: number): this {
    this.y = y
    return this
  }

  getX(): number {
    return this.x
  }

  getY(): number {
    return this.y
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
    return this.tickListener?.(this as any as T)
  }

  render() {
    return this.renderListener?.(this as any as T)
  }

}
