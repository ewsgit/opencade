"use client"

import React, { useEffect, useState } from "react"
import Header from "./(components)/Header/Header"
import { useRouter } from "next/navigation";
import SERVER_URL from "web/app/SERVER_URL";
import Link from "next/link";

const Page: React.FC = () => {
  const router = useRouter()
  const [ username, setUsername ] = useState("Unknown user")

  useEffect(() => {
    if (!sessionStorage.getItem("sessiontoken")) return router.push("/")

    fetch(`${SERVER_URL()}/auth/username`, { headers: { sessiontoken: sessionStorage.getItem("sessiontoken")! } }).then(
        res => res.json()).then(res => {
      if (res.error) return

      setUsername(res.username)
    })
  }, [])

  return <main className={"bg-slate-900 text-white min-h-screen"}>
    <Header/>
    <h1 className={"h-96 pt-16 pl-4 pr-4 flex items-center justify-center font-bold drop-shadow-2xl text-7xl text-center bg-no-repeat bg-cover [background-image:url(../assets/brand/background.svg)]"}>Hiya, {username}</h1>
    <section className={"mr-auto ml-auto max-w-6xl p-4 grid grid-rows-2 lg:grid-rows-none lg:grid-cols-2 gap-4"}>
      <Link
          href={"/arcade/games"}
          className={"relative flex flex-col items-center justify-center w-full pl-4 pr-4 pt-2 pb-2 bg-slate-700 hover:bg-slate-600 active:bg-slate-500 border-2 border-slate-700 hover:border-slate-500 active:border-slate-400 rounded-xl text-white transition-colors"}>
        <img
            loading={"lazy"}
            alt={""}
            src={require("./../../assets/general/VideoGame.png").default.src}
            className={"m-auto flex"}
        ></img>
        <p className={"mt-8 z-20 font-semibold text-white text-4xl"}>Browse games</p>
      </Link>
      <Link
          href={"/arcade/friends"}
          className={"relative flex flex-col items-center justify-center w-full pl-4 pr-4 pt-2 pb-2 bg-slate-700 hover:bg-slate-600 active:bg-slate-500 border-2 border-slate-700 hover:border-slate-500 active:border-slate-400 rounded-xl text-white transition-colors"}>
        <img
            loading={"lazy"}
            alt={""}
            src={require("./../../assets/general/GrinningCat.png").default.src}
            className={"m-auto flex"}
        ></img>
        <p className={"mt-8 z-20 font-semibold text-white text-4xl"}>View Friends</p>
      </Link>
    </section>
  </main>
}


export default Page
