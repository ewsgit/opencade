import RenderableObject from "engine/renderableObject";

export default class ImageObj extends RenderableObject {
  private readonly image

  constructor() {
    super();
    this.image = new Image()
    this.image.src = require("./../../../../../../../assets/brand/opencade.png").default.src
  }

  setSrc(src: string): this {
    this.image.src = src
    return this
  }

  getSrc(): string {
    return this.image.src
  }

  render() {
    this.context.drawImage(this.image, this.x, this.y, this.width, this.height)
  }
}
