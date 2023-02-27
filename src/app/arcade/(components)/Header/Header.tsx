export default function Header() {
  return <section className={"w-full fixed top-0 h-16 flex items-center z-20 backdrop-blur-[0.25rem]"}>
    <img src={require("./../../../../assets/brand/opencade.png").default.src} alt="" className={"h-full p-1"}/>
    <span className={"text-3xl font-bold text-white"}>OpenCade</span>
  </section>
}
