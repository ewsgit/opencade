import Header from "web/app/(components)/Header/Header";

export default function Home() {
  return (
      <main className={`w-full h-screen overflow-y-auto`}>
        <Header/>
        <section className={"pt-40 pb-40 flex items-center justify-center bg-blue-500 relative flex-col"}>
          <h1 className={"font-black text-white w-full text-center text-8xl"}>OpenCade</h1>
          <p className={"text-white font-semibold text-2xl"}>Free online games</p>
          <div className={"absolute bottom-2 gap-2 flex"}>
            <button
                className={"pl-4 pt-2 pb-2 pr-4 bg-slate-700 hover:bg-slate-600 active:bg-slate-500 rounded-xl text-white transition-colors"}>
              Signup
            </button>
            <button
                className={"pl-4 pt-2 pb-2 pr-4 bg-slate-700 hover:bg-slate-600 active:bg-slate-500 rounded-xl text-white transition-colors"}>
              Play as guest
            </button>
          </div>
        </section>
      </main>
  )
}
