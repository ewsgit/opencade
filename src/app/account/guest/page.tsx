import React from "react"

export interface IPage {
  children: React.ReactNode,
}

const Page: React.FC<IPage> = ({ children }) => {
  return <main className={`bg-gray-900 h-screen overflow-y-auto w-full flex items-center justify-center`}>
    <h1 className={"text-6xl text-white font-semibold"}>Generating temporary session...</h1>
  </main>
}

export default Page
