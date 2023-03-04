import RenderableObject from "engine/renderableObject";
import Engine from "engine/index";

export default class Layer {
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  children: RenderableObject<RenderableObject<any>>[] = []
  private readonly engine: Engine

  constructor(canvas: HTMLCanvasElement, engine: Engine) {
    this.canvas = canvas
    this.context = canvas.getContext("2d")!
    this.engine = engine
  }

  addChild(child: RenderableObject<RenderableObject<any>>): this {
    child.engine = this.engine
    child.context = this.context

    this.children.push(child)
    return this
  }

  render() {
    this.children.forEach(child => {
      child.render()
    })
  }

  tick() {
    this.children.forEach(child => {
      child.tick()
    })
  }
}
