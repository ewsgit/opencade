import Layer from "engine/layer";

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
  private layers: Layer[] = []

  constructor(options: IEngineOptions) {
    // @ts-ignore
    if (window?.engineMutationObserver) window.engineMutationObserver?.destruct?.()
    // @ts-ignore
    if (window?.engineResizeObserver) window.engineResizeObserver?.destruct?.()
    // @ts-ignore
    if (window?.engineTicker) clearInterval(window.engineTicker)
    // @ts-ignore
    if (window?.engineRenderer) clearInterval(window.engineRenderer)

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

    const backgroundContext = this.layers[0].canvas.getContext("2d")!

    backgroundContext.fillStyle = "#111111"
    backgroundContext.fillRect(0, 0, this.screen().width(), this.screen().height())

    let loadingScreenLogo = new Image()
    loadingScreenLogo.src = require("./../../../../../assets/brand/opencade.png").default.src

    loadingScreenLogo.onload = () => drawLoadingScreen(backgroundContext, this, loadingScreenLogo)

    let resizeObserverWaitTimeout: any;

    // @ts-ignore
    window.engineResizeObserver = new ResizeObserver(() => {
      clearTimeout(resizeObserverWaitTimeout)

      resizeObserverWaitTimeout = setTimeout(() => {
        this.layers.forEach(layer => {
          const containerRect = container.getBoundingClientRect()
          layer.canvas.width = containerRect.width
          layer.canvas.height = containerRect.height
        })
      }, 500)
    })

    // @ts-ignore
    window.engineResizeObserver.observe(this.options.containerElement)

    // @ts-ignore
    window.engineMutationObserver = new MutationObserver(() => {
      if ((container.parentElement!.getAttribute("data-devmode") === "true") !== this.DEV_MODE)
        console.log(`${ENGINE_LOG_PREFIX}DevMode: ${!this.DEV_MODE ? "enabled" : "disabled"}`)

      this.DEV_MODE = container.parentElement!.getAttribute("data-devmode") === "true"
    })

    // @ts-ignore
    window.engineMutationObserver.observe(container.parentElement!, { attributes: true, childList: false })

    setTimeout(() => {
      backgroundContext.clearRect(0, 0, this.screen().width(), this.screen().height())

      // @ts-ignore
      window.engineTicker = setInterval(() => {
        this.tick()
      }, 1000 / this.options.frameRate)

      // @ts-ignore
      window.engineRenderer = setInterval(() => {
        this.render()
      }, this.options.tickTime)
    }, 1000)
  }

  screen() {
    return {
      width: () => this.options.containerElement.getBoundingClientRect().width,
      height: () => this.options.containerElement.getBoundingClientRect().height
    }
  }

  createLayer(): this {
    let layer = new Layer(document.createElement("canvas"), this)
    let canvas = layer.canvas

    canvas.style.position = "absolute"
    canvas.style.top = "0px"
    canvas.style.left = "0px"

    const containerRect = this.options.containerElement.getBoundingClientRect()

    canvas.width = containerRect.width
    canvas.height = containerRect.height

    this.options.containerElement.appendChild(canvas)
    this.layers.push(layer)
    return this
  }

  getLayer(index: number): Layer {
    return this.layers[index]
  }

  tick() {
    return
  }

  render() {
    this.layers.forEach(layer => {
      layer.context.clearRect(0, 0, this.screen().width(), this.screen().height())
      layer.render()
    })
  }
}

function drawLoadingScreen(context: CanvasRenderingContext2D, engine: Engine, logo: HTMLImageElement) {
  let containerMargin = 50

  context.fillStyle = "#0f172a"
  context.fillRect(
      containerMargin,
      containerMargin,
      engine.screen().width() - (containerMargin * 2),
      engine.screen().height() - (containerMargin * 2)
  )

  context.textAlign = "center"
  context.textBaseline = "top"
  context.fillStyle = "white"
  context.font = "6rem __Inter_4b5723"

  let centerContainerHeight = engine.screen().height() / 4

  context.drawImage(logo, (engine.screen().width() / 2) - (256 / 2), centerContainerHeight, 256, 256)

  context.fillText("OpenCade", engine.screen().width() / 2, (centerContainerHeight + 256) + containerMargin)
}
