import RenderableObject from "engine/renderableObject";
import Engine, { ENGINE_LOG_PREFIX } from "engine/index";

export default class Text extends RenderableObject {
  private baseline: "bottom" | "top" | "middle" = "bottom"
  private text: string = ""
  private size: number = 60
  private font: string = "Calibri"
  private alignment: "start" | "end" | "left" | "center" | "right" = "left"

  constructor(context: CanvasRenderingContext2D, engine: Engine) {
    super(context, engine);

    this.width = 10000
  }

  setText(text: string): this {
    this.text = text
    return this
  }

  getText(): string {
    return this.text
  }

  setBaseline(baseline: "bottom" | "top" | "middle"): this {
    this.baseline = baseline
    return this
  }

  getBaseline(): "bottom" | "top" | "middle" {
    return this.baseline
  }

  setAlignment(alignment: "start" | "end" | "left" | "center" | "right"): this {
    this.alignment = alignment
    return this
  }

  getAlignment(): "start" | "end" | "left" | "center" | "right" {
    return this.alignment
  }

  setFont(font: string): this {
    this.font = font
    return this
  }

  getFont(): string {
    return this.font
  }

  setSize(size: number): this {
    this.size = size
    return this
  }

  getSize(): number {
    return this.size
  }

  render() {
    if (this.text === "") return console.error(`${ENGINE_LOG_PREFIX}rendering text for string ""!`)

    this.context.fillStyle = "white"
    this.context.textAlign = this.alignment
    this.context.textBaseline = this.baseline
    this.context.font = `${this.size}px ${this.font}`
    this.context.fillText(this.text, this.x, this.y, this.width)
  }
}
