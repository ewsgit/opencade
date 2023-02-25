import React from "react"
import Main from "web/app/account/login/(components)/Main/Main";

export interface IPage {
  children: React.ReactNode,
}

const Page: React.FC<IPage> = ({ children }) => {
  return <main className={`bg-gray-900 h-screen overflow-y-auto w-full flex items-center justify-center`}>
    <Main/>
  </main>
}

export default Page
