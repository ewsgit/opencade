import Link from "next/link";
import React from "react"
import Header from "web/app/arcade/(components)/Header/Header";

export interface IPage {
  children: React.ReactNode,
}

const Page: React.FC<IPage> = ({ children }) => {
  return <div className={"min-h-screen bg-slate-900 text-white flex flex-col"}>
    <Header/>
    <section className={"rounded-2xl bg-slate-800 p-6 pl-8 pr-8 m-auto flex flex-col gap-6"}>
      <h1 className={"text-5xl font-semibold"}>Friends Coming soon...</h1>
      <Link
          href={"/arcade"}
          className={"text-center pl-4 pr-4 pt-2 pb-2 bg-slate-700 hover:bg-slate-600 active:bg-slate-500 border-2 border-slate-700 hover:border-slate-500 active:border-slate-400 rounded-xl text-white transition-all"}
      >
        Go back
      </Link>
    </section>
  </div>
}

export default Page
