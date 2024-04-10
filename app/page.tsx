import { ChatBox } from "@/components/Chat";
import { Sidebar } from "@/components/Sidebar";


export default function Home() {
  return (
    <>
    <div className="flex w-screen h-screen">
      <Sidebar/>
      <ChatBox/>
    </div>

    </>
  );
}
