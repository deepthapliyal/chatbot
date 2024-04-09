import { ChatBox } from "@/components/Chat";
import { Sidebar } from "@/components/Sidebar";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <div className="flex h-screen">
      <Sidebar/>
      <ChatBox/>
    </div>

    </>
  );
}
