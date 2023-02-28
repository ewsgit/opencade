import RenderableObject from "engine/renderableObject";
import Engine from "engine/index";

export default class Layer {
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  children: RenderableObject[] = []

  constructor(canvas: HTMLCanvasElement, engine: Engine) {
    this.canvas = canvas
    this.context = canvas.getContext("2d")!
  }

  addChild(child: RenderableObject): this {
    this.children.push(child)
    return this
  }

  render() {
    this.children.forEach(child => {
      child.render()
    })
  }
}
