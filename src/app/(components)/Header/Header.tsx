export default function Header() {
  return <section className={"w-full sticky top-0 h-16 bg-slate-800 flex items-center"}>
    <img src={require("./../../../assets/brand/opencade.png").default.src} alt="" className={"h-full p-1"}/>
    <span className={"text-3xl font-bold text-white"}>OpenCade</span>
  </section>
}
