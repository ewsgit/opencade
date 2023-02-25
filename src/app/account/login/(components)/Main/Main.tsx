"use client"

import React from "react"

const Main: React.FC = () => {
  return <section className={"flex flex-col gap-2 bg-slate-800 p-4 rounded-3xl"}>
    <h1 className={"font-bold text-white text-3xl text-center pl-4 pr-4 pb-4"}>Login to your account</h1>
    <h2 className={"text-xl text-white"}>Username</h2>
    <input className={"text-white bg-slate-700 rounded-lg pt-2 pb-2 pl-4 pr-4 outline-none"} type="text"/>
    <h2 className={"text-xl text-white"}>Password</h2>
    <input className={"text-white bg-slate-700 rounded-lg pt-2 pb-2 pl-4 pr-4 outline-none"} type="password"/>
    <button
        className={"pl-4 pr-4 pt-2 pb-2 bg-slate-700 hover:bg-slate-600 active:bg-slate-500 border-2 border-slate-700 hover:border-slate-500 active:border-slate-400 rounded-xl text-white transition-colors"}>Login
    </button>
    <span className={"text-center w-full text-white"}>Or</span>
    <button
        className={"pl-4 pr-4 pt-2 pb-2 bg-slate-700 hover:bg-slate-600 active:bg-slate-500 border-2 border-slate-700 hover:border-slate-500 active:border-slate-400 rounded-xl text-white transition-colors"}>Sign
                                                                                                                                                                                                               up
    </button>
  </section>
}

export default Main
