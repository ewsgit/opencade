"use client"

import React, { useState } from "react"
import Header from "web/app/arcade/games/play/(components)/Header/Header";
import Icon from "web/app/(components)/Icon/Icon";

export interface ILayout {
  children: React.ReactNode,
}

const Layout: React.FC<ILayout> = ({ children }) => {
  const [ fullscreen, setFullscreen ] = useState(false)
  const [ isDevMode, setIsDevMode ] = useState(false)
  const [ devClicks, setDevClicks ] = useState(0)

  return <main
      className={`bg-slate-900 min-h-screen overflow-y-hidden grid-rows-[100vh,auto] ${!fullscreen && "pt-16"}`}>
    {
        !fullscreen && <Header/>
    }
    <section
        className={`ml-auto mr-auto h-screen max-w-full box-border grid grid-cols-1`}
        data-devmode={isDevMode}>
      {children}
    </section>
    <section className={"bg-slate-800"}>
      <div className={"flex p-2 items-center justify-center gap-2"}>
        <h1 className={"text-white text-4xl font-semibold"}>Game name</h1>
        <button
            onContextMenu={(e) => {
              e.preventDefault()
              if (devClicks === 2) {
                setDevClicks(0)
                setIsDevMode(!isDevMode)
              } else {
                setDevClicks(devClicks + 1)
              }
            }}
            onClick={() => setFullscreen(!fullscreen)}
            className={`p-2 h-10 flex items-center justify-center ml-auto aspect-square ${isDevMode ? "bg-orange-600 hover:bg-orange-500 active:bg-orange-400" : "bg-slate-700 hover:bg-slate-600 active:bg-slate-500"} border-2 border-slate-700 hover:border-slate-500 active:border-slate-400 rounded-xl text-white transition-all`}
        >
          <Icon color={"#ffffff"} name={"unfold-16"} className={"w-full h-full"}/>
        </button>
      </div>
    </section>
  </main>
}

export default Layout
