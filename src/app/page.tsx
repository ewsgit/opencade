import Header from "web/app/(components)/Header/Header";
import Link from "next/link";

export default function Home() {
  return (
      <main className={`w-full h-screen overflow-y-auto bg-slate-900`}>
        <Header/>
        <section
            className={"xl:pt-56 xl:pb-40 lg:pt-40 lg:pb-32 pt-32 pb-24 flex items-center justify-center bg-blue-500 transition-all relative flex-col overflow-hidden bg-no-repeat bg-cover [background-image:url(../assets/brand/background.svg)]"}>
          <h1 className={"font-black text-white w-full text-center text-8xl drop-shadow-[2rem]"}>OpenCade</h1>
          <p className={"text-white font-semibold text-3xl -mt-2"}>Free online games</p>
          <div className={"absolute bottom-4 gap-8 grid grid-cols-2 min-w-[30%]"}>
            <Link
                href={"/account/login"}
                className={"text-center text-lg pl-6 pt-2 pb-2 pr-6 bg-slate-700 hover:bg-slate-600 active:bg-slate-500 border-2 border-slate-700 hover:border-slate-500 active:border-slate-400 rounded-xl text-white transition-colors"}>
              Login / Sign up
            </Link>
            <Link
                href={"/account/guest"}
                className={"text-center text-lg pl-6 pt-2 pb-2 pr-6 bg-slate-700 hover:bg-slate-600 active:bg-slate-500 border-2 border-slate-700 hover:border-slate-500 active:border-slate-400 rounded-xl text-white transition-colors"}>
              Play as guest
            </Link>
          </div>
        </section>
        <section
            className={"pt-10 pb-10 pl-5 pr-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 max-w-7xl ml-auto mr-auto gap-4"}>
          <button
              className={"group p-4 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 border-2 border-slate-800 hover:border-slate-600 active:border-slate-500 rounded-xl transition-colors"}>
            <p className={"text-white font-semibold text-2xl text-center pb-2"}>0+ games</p>
            <div
                className={"h-1 w-3/4 ml-auto mr-auto flex rounded-full bg-slate-700 group-hover:bg-slate-600 group-active:bg-slate-500 transition-colors"}></div>
            <p className={"text-center text-slate-300 font-xl pt-2"}>Description Text</p>
          </button>
          <button
              className={"group p-4 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 border-2 border-slate-800 hover:border-slate-600 active:border-slate-500 rounded-xl transition-colors"}>
            <p className={"text-white font-semibold text-2xl text-center pb-2"}>0 concurrent players</p>
            <div
                className={"h-1 w-3/4 ml-auto mr-auto flex rounded-full bg-slate-700 group-hover:bg-slate-600 group-active:bg-slate-500 transition-colors"}></div>
            <p className={"text-center text-slate-300 font-xl pt-2"}>Description Text</p>
          </button>
          <button
              className={"col-span-1 md:col-span-2 xl:col-span-1 group p-4 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 border-2 border-slate-800 hover:border-slate-600 active:border-slate-500 rounded-xl transition-colors"}>
            <p className={"text-white font-semibold text-2xl text-center pb-2"}>Play with friends</p>
            <div
                className={"h-1 w-3/4 ml-auto mr-auto flex rounded-full bg-slate-700 group-hover:bg-slate-600 group-active:bg-slate-500 transition-colors"}></div>
            <p className={"text-center text-slate-300 font-xl pt-2"}>Friend other players and join games together</p>
          </button>
        </section>
      </main>
  )
}
