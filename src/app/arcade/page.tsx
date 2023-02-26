"use client"

import React, { useEffect, useState } from "react"
import Header from "./(components)/Header/Header"
import { useRouter } from "next/navigation";

export interface IPage {
  children: React.ReactNode,
}

const Page: React.FC<IPage> = ({ children }) => {
  const router = useRouter()
  const [ username, setUsername ] = useState("Unknown user")

  useEffect(() => {
    if (!sessionStorage.getItem("sessiontoken")) return router.push("/")
  }, [])

  return <main className={"bg-slate-900 text-white"}>
    <Header/>
    <h1 className={"pt-20 pl-4 p-4 font-bold text-7xl text-center"}>Hiya, {username}</h1>
    <button>
      Browse games
    </button>
    <button>
      View Friends
    </button>
  </main>
}


export default Page
