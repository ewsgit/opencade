"use client"

import React, { useEffect } from "react"
import SERVER_URL from "web/app/SERVER_URL";
import { useRouter } from "next/navigation";

export interface IPage {
  children: React.ReactNode,
}

const Page: React.FC<IPage> = ({ children }) => {
  const router = useRouter()
  useEffect(() => {
    fetch(`${SERVER_URL()}/auth/guest`)
        .then(res => res.ok ? res.json() : window.location.reload())
        .then(res => {
          sessionStorage.setItem("sessiontoken", res.sessiontoken)
          setTimeout(() => {
            router.push(`/arcade`)
          }, 2000)
        })
  }, [])

  return <main className={`bg-gray-900 h-screen overflow-y-auto w-full flex items-center justify-center`}>
    <h1 className={"text-6xl text-white font-semibold"}>Generating temporary session...</h1>
  </main>
}

export default Page
