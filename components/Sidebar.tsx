"use client"
import React, { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";

const chat = [
    "What's up?", "What's your name?", "Are you a don?", "Good morning..",
    "What's up?", "What's your name?", "Are you a don?", "Good morning..",
    "What's up?", "What's your name?", "Are you a don?", "Good morning..",
    "What's up?", "What's your name?", "Are you a don?", "Good morning.."
];

export const Sidebar = () => {
    const [sideBar, setSidebar] = useState(true);
    const [MobileSideBar, setMobileSidebar] = useState(true);
    const sidebarRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            if (sidebarRef.current) {
                setSidebar(sidebarRef.current.clientWidth > 0);
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const closeSidebar = () => {
        setSidebar(!sideBar);
    };
    const closeMobileSidebar = () => {
        
        setMobileSidebar(!MobileSideBar);

    }

    return (
        <>
            <div className={`${sideBar ? "w-1/3" : "xl:w-[6vw] md:w-[11vw]"} ease-in-out duration-300 overflow-hidden h-full hidden  lg:block bg-[#1e1f20] justify-between flex-col`} ref={sidebarRef}>
                <div className={`p-2  mb-6 xl:w-[5vw] items-center md:w-[9vw] text-white h-[30vh] flex flex-col justify-between`}>
                    <Button onClick={closeSidebar} variant={"ghost"} className="rounded-full hover:bg-[rgb(44,45,47)] hover:text-white text-white w-14 h-14">
                        <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" ><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" /></svg>
                    </Button>
                    <Button className="rounded-full hover:bg-transparent bg-[#2c2d2f] w-14 h-14">
                        <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" ><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" /></svg>
                    </Button>
                </div>
                <div className={`${!sideBar && "hidden"} p-4 overflow-auto text-white h-[50vh]`}>
                    <h1 className="text-xl mb-2">Recent</h1>
                    <ul className="h-[80%]">
                        {chat.map((item, index) => (
                            <li className="mb-1 cursor-pointer bg-zinc-800 p-1 rounded-full px-3 text-white" key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
                <div className="h-[20vh]">1st</div>
            </div>
            <div className="fixed z-10 flex items-center sm:block lg:hidden top-2 left-2">
                <Button onClick={closeMobileSidebar} variant={"ghost"} className="rounded-full hover:bg-[rgb(44,45,47)] hover:text-white text-white w-14 h-14">
                    <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" ><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" /></svg>
                </Button>
           
            </div>

            <div className={`${MobileSideBar && "hidden"} w-screen fixed ease-in-out duration-300 overflow-hidden h-full  lg:hidden  bg-[#1e1f20] justify-between flex-col`} >
                <div className={`p-2 mt-[10vh] mb-6 h-[90vh] text-white  flex flex-col justify-around`}>
                    <div className={` p-4 overflow-auto text-white h-[50vh]`}>
                        <h1 className="text-xl mb-2">Recent</h1>
                        <ul className="h-[80%]">
                            {chat.map((item, index) => (
                                <li className="mb-1 cursor-pointer bg-zinc-800 p-1 rounded-full px-3 text-white" key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="h-[20vh]">1st</div>
                </div>
            </div>
        </>
    );
};
