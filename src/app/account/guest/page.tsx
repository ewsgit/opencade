"use client"

import React, { useEffect } from "react"
import SERVER_URL from "web/app/SERVER_URL";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Page: React.FC = () => {
  const router = useRouter()
  useEffect(() => {
    fetch(`${SERVER_URL()}/auth/guest`).then(res => res.ok ? res.json() : window.location.reload()).then(res => {
      sessionStorage.setItem("sessiontoken", res.sessiontoken)
      router.push(`/arcade`)
    })
  }, [])

  return <main
      className={`bg-slate-900 h-screen overflow-y-auto w-full flex items-center justify-center flex-col gap-4`}>
    <h1 className={"text-6xl text-white font-semibold"}>Generating temporary session...</h1>
    <Link
        href={"/arcade"}
        className={"text-center text-lg pl-6 pt-2 pb-2 pr-6 bg-slate-700 hover:bg-slate-600 active:bg-slate-500 border-2 border-slate-700 hover:border-slate-500 active:border-slate-400 rounded-xl text-white transition-colors"}>
      Continue offline
    </Link>
  </main>
}

export default Page
