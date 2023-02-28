import Icon from "web/app/(components)/Icon/Icon";
import React from "react";
import Link from "next/link";

export default function Header() {
  return <section
      className={"w-full fixed top-0 h-16 flex items-center z-20 backdrop-blur-[0.25rem] bg-opacity-25 bg-slate-700"}>
    <Link
        href={"/arcade/games"}
        className={"p-2 ml-3 mr-1 h-10 flex items-center justify-center aspect-square bg-slate-700 hover:bg-slate-600 active:bg-slate-500 border-2 border-slate-700 hover:border-slate-500 active:border-slate-400 rounded-xl text-white transition-all"}
    >
      <Icon color={"#ffffff"} name={"arrow-left-16"} className={"w-full h-full"}/>
    </Link>
    <img src={require("../../../../../../assets/brand/opencade.png").default.src} alt="" className={"h-full p-1"}/>
    <span className={"text-3xl font-bold text-white"}>OpenCade</span>
  </section>
}
