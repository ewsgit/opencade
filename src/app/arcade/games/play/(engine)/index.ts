import Layer from "engine/layer";

export const ENGINE_LOG_PREFIX = "[OCE] ";

export interface IEngineOptions {
  containerElement: HTMLDivElement;
  tps: number;
  aspectRatio: `${string}/${string}`;
}

export default class Engine {
  protected DEV_MODE: boolean = false;
  protected mouse: { x: number; y: number } = { x: 0, y: 0 };
  private options: IEngineOptions = {
    tps: 10, // @ts-ignore
    containerElement: null,
    aspectRatio: "16/9",
  };
  private layers: Layer[] = [];

  constructor(options: IEngineOptions, callback: (engine: Engine) => void) {
    // Reset global variables from previous engine instances if they exist

    // @ts-ignore
    if (window?.engineMutationObserver) {
      // @ts-ignore
      window.engineMutationObserver?.destruct?.();
    }
    // @ts-ignore
    if (window?.engineResizeObserver) window.engineResizeObserver?.destruct?.();
    // @ts-ignore
    if (window?.engineTicker) clearInterval(window.engineTicker);
    if (location.hash === "#dev") this.DEV_MODE = true;
    if (options?.containerElement)
      this.options.containerElement = options.containerElement;
    if (options?.tps) this.options.tps = options.tps;
    // Check if the containerElement is set, if not crash the engine and report it to the user.
    if (!this.options.containerElement)
      throw new Error(
        `${ENGINE_LOG_PREFIX} The engine option 'containerElement' must be assigned to a HTML 'div' element.`
      );

    console.log(
      `${ENGINE_LOG_PREFIX}starting up with the options: `,
      this.options
    );

    const container = this.options.containerElement;

    container.style.maxWidth = "100%";
    container.style.maxHeight = "100%";
    container.style.aspectRatio = "1 / 1";
    container.style.margin = "auto";
    container.style.backgroundColor = "#000000";

    this.layers = [];
    container.childNodes.forEach((child) => container.removeChild(child));

    this.createLayer();

    const backgroundContext = this.layers[0].canvas.getContext("2d")!;

    if (!this.DEV_MODE) {
      let loadingScreenLogo = new Image();
      loadingScreenLogo.src =
        require("./../../../../../assets/brand/opencade.png").default.src;
      loadingScreenLogo.onload = () =>
        drawLoadingScreen(backgroundContext, this, loadingScreenLogo);
    }

    let resizeObserverWaitTimeout: any;

    // @ts-ignore
    window.engineResizeObserver = new ResizeObserver(() => {
      clearTimeout(resizeObserverWaitTimeout);

      resizeObserverWaitTimeout = setTimeout(() => {
        this.layers.forEach((layer) => {
          const containerRect = container.getBoundingClientRect();

          if (
            layer.canvas.width !== containerRect.width ||
            layer.canvas.height !== containerRect.height
          ) {
            layer.canvas.width = containerRect.width;
            layer.canvas.height = containerRect.height;
          }
        });
      }, 500);
    });

    // @ts-ignore
    window.engineResizeObserver.observe(this.options.containerElement);

    // @ts-ignore
    window.engineMutationObserver = new MutationObserver(() => {
      if (
        (container.parentElement!.getAttribute("data-devmode") === "true") !==
        this.DEV_MODE
      )
        console.log(
          `${ENGINE_LOG_PREFIX}DevMode: ${
            !this.DEV_MODE ? "enabled" : "disabled"
          }`
        );

      this.DEV_MODE =
        container.parentElement!.getAttribute("data-devmode") === "true";
    });

    // @ts-ignore
    window.engineMutationObserver.observe(container.parentElement!, {
      attributes: true,
      childList: false,
    });

    // backgroundContext.clearRect(0, 0, this.screen().width(), this.screen().height())

    this.options.containerElement.addEventListener("mousemove", (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    this.options.containerElement.addEventListener("mousedown", () => {
      this.layers.forEach((layer) => {
        layer.children.forEach((child) => {
          if (
            this.mouse.x >= child.getX() &&
            this.mouse.x <= child.getX() + child.getWidth()
          ) {
            if (
              this.mouse.y >= child.getY() &&
              this.mouse.y <= child.getY() + child.getHeight()
            ) {
              child.mouseDown();
            }
          }
        });
      });
    });

    setTimeout(
      () => {
        // @ts-ignore
        window.engineTicker = setInterval(() => {
          this.tick();
        }, 1000 / this.options.tps);

        callback(this);
        this.layers.forEach((layer) => layer.render());
      },
      this.DEV_MODE ? 0 : 2000
    );
  }

  screen() {
    return {
      width: () => this.options.containerElement.getBoundingClientRect().width,
      height: () =>
        this.options.containerElement.getBoundingClientRect().height,
    };
  }

  createLayer(): this {
    let layer = new Layer(document.createElement("canvas"), this);
    let canvas = layer.canvas;

    canvas.style.backgroundColor = "#111111";
    canvas.style.width = "100%";
    canvas.style.height = "100%";

    const containerRect = this.options.containerElement.getBoundingClientRect();

    canvas.width = containerRect.width;
    canvas.height = containerRect.height;

    this.options.containerElement.appendChild(canvas);
    this.layers.push(layer);
    return this;
  }

  getLayer(index: number): Layer {
    return this.layers[index];
  }

  tick() {
    this.layers.forEach((layer) => {
      layer.tick();
    });
  }

  fullRender() {
    this.layers.forEach((layer) => {
      layer.render();
    });
  }
}

function drawLoadingScreen(
  context: CanvasRenderingContext2D,
  engine: Engine,
  logo: HTMLImageElement
) {
  let containerMargin = 50;

  context.fillStyle = "#0f172a";
  context.fillRect(
    containerMargin,
    containerMargin,
    engine.screen().width() - containerMargin * 2,
    engine.screen().height() - containerMargin * 2
  );

  context.textAlign = "center";
  context.textBaseline = "top";
  context.fillStyle = "white";
  context.font = "6rem __Inter_4b5723";

  let centerContainerHeight = engine.screen().height() / 4;

  context.drawImage(
    logo,
    engine.screen().width() / 2 - 256 / 2,
    centerContainerHeight,
    256,
    256
  );

  context.fillText(
    "OpenCade",
    engine.screen().width() / 2,
    centerContainerHeight + 256 + containerMargin
  );
}
