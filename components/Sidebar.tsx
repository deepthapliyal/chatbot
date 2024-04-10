"use client"
import { useState } from "react";
import { Button } from "./ui/button";

const chat = [
    "kya hai bhai", "aapka naam kya hai", "kya aap don hai", "good morning..",
    "kya hai bhai", "aapka naam kya hai", "kya aap don hai", "good morning..",
    "kya hai bhai", "aapka naam kya hai", "kya aap don hai", "good morning..",
    "kya hai bhai", "aapka naam kya hai", "kya aap don hai", "good morning.."
]


export const Sidebar = () => {
    const [sideBar, setSidebar] = useState(true);
    const closeSidebar = ()=>{
        setSidebar(!sideBar);
    
    }
    return (
        <>  
            <div className={`${sideBar? "w-1/3": "" } ease-in-out duration-300  h-screen  hidden md:block lg:block bg-[#1e1f20] justify-between  flex-col `}>
                <div className="p-2 mb-6 text-white h-[30vh] flex flex-col justify-between ">
                    <Button onClick={closeSidebar} variant={"ghost"} className="rounded-full hover:bg-[#2c2d2f] hover:text-white  w-14 h-14">

                        <svg  fill="currentColor"  xmlns="http://www.w3.org/2000/svg"  viewBox="0 -960 960 960" ><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" /></svg>
                    </Button>
                    <Button  className="rounded-full hover:bg-transparent bg-[#2c2d2f]  w-14 h-14">

                        <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" ><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" /></svg>
                    </Button>
                </div>
                <div className={`${!sideBar && "hidden"} p-4 overflow-auto text-white h-[50vh] `}>
                    <h1 className="text-xl mb-2">
                    recent
                    </h1>

                <ul className="  h-[80%]">
                    {chat.map((item, index)=>(
                        <li className="mb-1 cursor-pointer bg-zinc-800 p-1 rounded-full px-3 text-white" key={index}>{item}</li>
                        ))
                    }
                </ul>
              
                </div>
                <div className=" h-[20vh]">1st</div>
            </div>
        </>
    );
};