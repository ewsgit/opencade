"use client"

import React from "react"
import Header from "./(components)/Header/Header"
import { useRouter } from "next/navigation";
import IGame, { GAMES } from "web/types/global/game";
import Link from "next/link";

export interface IPage {
  children: React.ReactNode,
}

const Page: React.FC<IPage> = ({ children }) => {
  const games: IGame[] = [
    {
      background: require("./../../../assets/brand/background.svg").default.src,
      name: "Snek",
      slug: GAMES.SNEK
    },
    {
      background: require("./../../../assets/brand/background.svg").default.src,
      name: "Demo",
      slug: GAMES.DEMO
    },
    {
      background: require("./../../../assets/brand/background.svg").default.src,
      name: "Snek2",
      slug: GAMES.SNEK
    },
    {
      background: require("./../../../assets/brand/background.svg").default.src,
      name: "Snek3",
      slug: GAMES.SNEK
    }
  ]

  const router = useRouter()

  return <main className={"bg-slate-900 text-white min-h-screen"}>
    <Header/>
    <h1 className={"h-64 pl-4 pr-4 flex items-center justify-center font-bold drop-shadow-2xl text-7xl text-center bg-no-repeat bg-cover [background-image:url(../assets/brand/background.svg)]"}>Games</h1>
    <section
        className={"mr-auto ml-auto max-w-6xl p-4 grid grid-rows-2 lg:grid-rows-none lg:grid-cols-2 xl:grid-cols-4 gap-4"}>
      {
        games.map(game => {
          return <Link
              href={`/arcade/games/play/${game.slug}`}
              key={game.name}
              className={"group bg-center bg-cover cursor-pointer min-h-[20rem] rounded-xl relative overflow-hidden"}
              style={{
                background: `url(${game.background})`
              }}>
            <div className={"absolute bottom-0 left-0 flex items-center justify-center w-full"}>
              <button
                  className={"opacity-0 ml-2 mr-2 mb-2 w-full group-hover:opacity-100 pl-4 pr-4 pt-2 pb-2 bg-slate-700 hover:bg-slate-600 active:bg-slate-500 border-2 border-slate-700 hover:border-slate-500 active:border-slate-400 rounded-xl text-white transition-all"}
              >
                Play
              </button>
              <div
                  className={"font-semibold pointer-events-none text-3xl text-center w-full pt-2 pb-2 absolute bottom-0 left-0 bg-slate-700 transition-all group-hover:opacity-0"}>{game.name}</div>
            </div>
          </Link>
        })
      }
    </section>
  </main>
}


export default Page
