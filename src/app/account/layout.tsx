import React from "react"
import Header from "web/app/account/(components)/Header/Header";

export interface ILayout {
  children: React.ReactNode,
}

const Layout: React.FC<ILayout> = ({ children }) => {
  return <>
    <Header/>
    {
      children
    }
  </>
}

export default Layout
