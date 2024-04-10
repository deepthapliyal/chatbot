"use client"
import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import ReactMarkdown from 'react-markdown'



interface Message {
    userMessage: string;
    chatbotMessage: string;
}

export const ChatBox: React.FC = () => {
    const [message, setMessage] = useState<string>("");
    const [conversation, setConversation] = useState<Message[]>([]);
    const [sending, setSending] = useState<boolean>(false);
    const chatWindowRef = useRef<HTMLDivElement>(null); // Ref for chat window element

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    const handleSubmit = async () => {
        // Add user message to conversation
        const newUserMessage: Message = {
            userMessage: message,
            chatbotMessage: "Generating...",
        };
        setConversation([...conversation, newUserMessage]);
        setSending(true);
        setMessage("");
        let response = await fetch("/api/get", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prompt: message
            })

        });

        let data = await response.json();
        // Simulate delay before receiving bot response

        // Replace "Typing..." with actual bot response
        const newBotMessage: Message = {
            userMessage: message,
            chatbotMessage: data.data // Replace this with the actual bot response
        };
        setConversation([...conversation, newBotMessage]); // Replace the last message with bot response
        setSending(false);

        // Clear input field after submission
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (sending) return;
        if (e.key === "Enter") {
            handleSubmit();
        }
    };

    useEffect(() => {
        // Scroll to bottom when conversation changes
        if (chatWindowRef.current) {
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
            chatWindowRef.current.classList.add("scroll-animation");

            // Remove the animation class after a brief delay
            setTimeout(() => {
                chatWindowRef.current?.classList.remove("scroll-animation");
            }, 200);
        }
    }, [conversation]);

    return (
        <div className="bg-zinc-800 h-screen flex flex-col w-full">
            <div className="h-16 p-4 flex items-center justify-between text-white">
                <div>Model Name</div>
                <div>
                    <Avatar>
                        <AvatarImage src="https://lh3.googleusercontent.com/a/ACg8ocIh6V7Ab3ItQMGMC0n8rm8TEFIbvDAUNoUiA18leQ6EfijCQmT2=s192-c-rg-br100" />
                        <AvatarFallback>DT</AvatarFallback>
                    </Avatar>
                </div>
            </div>

            <main ref={chatWindowRef} className="flex-1  overflow-y-auto bg-zinc-800 p-4 text-white">
                <div className="max-w-2xl mx-auto">
                    <ul className="space-y-4">
                        {conversation.map((item, index) => (
                            <li key={index}>
                                <div className="flex flex-row mb-6 gap-2">
                                    <Avatar className="mt-2">
                                        <AvatarImage src="https://lh3.googleusercontent.com/a/ACg8ocIh6V7Ab3ItQMGMC0n8rm8TEFIbvDAUNoUiA18leQ6EfijCQmT2=s192-c-rg-br100" />
                                        <AvatarFallback>DT</AvatarFallback>
                                    </Avatar>
                                    <div className="rounded-br-3xl p-4 rounded-md bg-zinc-900">{item.userMessage}</div>
                                </div>
                                <div className="flex flex-row gap-2">
                                    <Avatar className="mt-2">
                                        <AvatarImage src="https://www.messagely.com/wp-content/uploads/2019/09/automated-hand-offs.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <div className="rounded-br-3xl p-4 rounded-md bg-zinc-900">
                                            <ReactMarkdown className='reactMarkdownBox'>{item.chatbotMessage}</ReactMarkdown>
                                        

                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>

            <div className="bg-black gap-4 text-white flex justify-center items-center h-24 px-10">
                <Input onKeyDown={handleKeyPress} onChange={handleInputChange} value={message} className="bg-[#1e1f20] focus:outline-none focus:bg-[#2c2d2f] flex-1" placeholder="Type a message..." />
                <button disabled={sending} onClick={handleSubmit}>
                    <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" /></svg>
                </button>
            </div>
        </div>
    );
};
