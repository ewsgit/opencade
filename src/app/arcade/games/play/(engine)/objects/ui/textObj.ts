import RenderableObject from "engine/renderableObject";
import {ENGINE_LOG_PREFIX} from "engine/index";

export default class TextObj extends RenderableObject<TextObj> {
  private baseline: "bottom" | "top" | "middle" = "bottom";
  private text: string = "";
  private textSize: number = 60;
  private font: string = "Calibri";
  private alignment: "start" | "end" | "left" | "center" | "right" = "left";

  constructor() {
    super();
  }

  setText(text: string): this {
    this.text = text;
    return this;
  }

  getText(): string {
    return this.text;
  }

  setBaseline(baseline: "bottom" | "top" | "middle"): this {
    this.baseline = baseline;
    return this;
  }

  getBaseline(): "bottom" | "top" | "middle" {
    return this.baseline;
  }

  setAlignment(alignment: "start" | "end" | "left" | "center" | "right"): this {
    this.alignment = alignment;
    return this;
  }

  getAlignment(): "start" | "end" | "left" | "center" | "right" {
    return this.alignment;
  }

  setFont(font: string): this {
    this.font = font;
    return this;
  }

  getFont(): string {
    return this.font;
  }

  setSize(size: number): this {
    this.textSize = size;
    return this;
  }

  getSize(): number {
    return this.textSize;
  }

  render() {
    if (this.text === "")
      return console.error(`${ENGINE_LOG_PREFIX}rendering text for string ""!`);

    if (!this.context) return;

    this.context.fillStyle = "white";
    this.context.textAlign = this.alignment;
    this.context.textBaseline = this.baseline;
    this.context.font = `${this.textSize}px ${this.font}`;
    this.context.fillText(this.text, this.position.x, this.position.y);
  }
}
