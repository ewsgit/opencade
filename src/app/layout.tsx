import './globals.css'
import { Inter } from "next/font/google";
import React from "react";

const inter = Inter({ subsets: [ 'latin' ] })

export const metadata = {
  title: 'OpenCade',
  description: 'A free and open-sourced online arcade.'
}

interface IRootLayout {
  children: React.ReactNode
}

const RootLayout: React.FC<IRootLayout> = ({ children }) => {
  return (
      <html lang="en">
      <body className={`${inter.className} min-h-screen`}>{children}</body>
      </html>
  )
}

export default RootLayout
