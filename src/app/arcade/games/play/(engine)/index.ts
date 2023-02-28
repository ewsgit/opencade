export const ENGINE_LOG_PREFIX = "[OCE] "

export interface IEngineOptions {
  containerElement: HTMLDivElement
  frameRate: number,
  tickTime: number,
  aspectRatio: `${number}/${number}`
}

export default class Engine {
  protected DEV_MODE: boolean = false
  private options: IEngineOptions = {
    aspectRatio: "1/1",
    tickTime: 10,
    frameRate: 60,
    // @ts-ignore
    containerElement: null
  }
  private layers: HTMLCanvasElement[] = []

  constructor(options: IEngineOptions) {
    if (options?.containerElement) this.options.containerElement = options.containerElement
    if (options?.aspectRatio) this.options.aspectRatio = options.aspectRatio
    if (options?.frameRate) this.options.frameRate = options.frameRate
    if (options?.tickTime) this.options.tickTime = options.tickTime

    // Check if the containerElement is set, if not crash the engine and report it to the user.
    if (!this.options.containerElement)
      throw new Error(
          `${ENGINE_LOG_PREFIX} The engine option 'containerElement' must be assigned to a HTML 'div' element.`)

    console.log(`${ENGINE_LOG_PREFIX}starting up with the options: `, this.options)

    const container = this.options.containerElement

    container.style.position = "relative"

    this.layers = []
    container.childNodes.forEach(child => container.removeChild(child))

    this.createLayer()

    const backgroundContext = this.layers[0].getContext("2d")!

    backgroundContext.fillStyle = "#111111"
    backgroundContext.fillRect(0, 0, this.screen().width(), this.screen().height())

    new ResizeObserver(() => {
      this.layers.forEach(layer => {
        const containerRect = container.getBoundingClientRect()
        layer.width = containerRect.width
        layer.height = containerRect.height
      })
    }).observe(container)

    new MutationObserver(() => {
      this.DEV_MODE = container.parentElement!.getAttribute("data-devmode") === "true"

      console.log(`${ENGINE_LOG_PREFIX}Devmode: ${this.DEV_MODE ? "enabled" : "disabled"}`)
    }).observe(container.parentElement!, { attributes: true, childList: false })
  }

  screen() {
    return {
      width: () => this.options.containerElement.getBoundingClientRect().width,
      height: () => this.options.containerElement.getBoundingClientRect().height
    }
  }

  createLayer() {
    let canvas = document.createElement("canvas")

    canvas.style.position = "absolute"
    canvas.style.top = "0px"
    canvas.style.left = "0px"

    const containerRect = this.options.containerElement.getBoundingClientRect()

    canvas.width = containerRect.width
    canvas.height = containerRect.height

    this.options.containerElement.appendChild(canvas)
    this.layers.push(canvas)
  }
}

function drawLoadingScreen(context: CanvasRenderingContext2D, engine: Engine) {
  console.log(engine)
  context.fillStyle = "#0f172a"
  let containerMargin = 10
  context.fillRect(
      containerMargin,
      containerMargin,
      engine.screen().width() - (containerMargin * 2),
      engine.screen().height() - (containerMargin * 2)
  )
}
