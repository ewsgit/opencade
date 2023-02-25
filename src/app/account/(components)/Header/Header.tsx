import Icon from "web/app/(components)/Icon/Icon";

export default function Header() {
  return <section className={"w-full fixed top-0 h-16 flex items-center z-20 bg-gray-800"}>
    <img src={require("./../../../../assets/brand/opencade.png").default.src} alt="" className={"h-full p-1"}/>
    <span className={"text-3xl font-bold text-white"}>OpenCade</span>
    <div className={"flex ml-auto p-2 pr-4"}>
      <a href={"https://github.com/ewsgit/opencade"}>
        <Icon className={"h-8"} color={"#ffffff"} name={"mark-github-16"}/>
      </a>
    </div>
  </section>
}
