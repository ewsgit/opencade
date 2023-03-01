"use client"

import React, { useState } from "react";

const Page: React.FC = () => {
  const [ gameState, setGameState ] = useState<"MENU" | "GAME" | "ABOUT" | "GAME_MODE_SELECTOR">("MENU")

  return <div className={"aspect-video"}>
    {
        gameState === "MENU" && <main>
            <h1>Snek</h1>
            <p>An OpenCade game</p>

            <button>Play</button>
            <button>About</button>
        </main>
    }
  </div>
}

export default Page
