import Engine from "engine/index";

export default class RenderableObject {
  protected context: CanvasRenderingContext2D;
  protected engine: Engine;
  protected width: number = 50
  protected height: number = 50
  protected x: number = 10
  protected y: number = 10

  constructor(context: CanvasRenderingContext2D, engine: Engine) {
    this.context = context
    this.engine = engine
  }

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

  render() {
    return console.log("child render")
  }
}
