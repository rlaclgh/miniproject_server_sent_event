"use client";
import { useEffect, useState } from "react";
import ChatInputForm from "./chat_input_form";
import Chat from "./chat";

export interface IChat {
  id: string;
  message: string;
  isMine: boolean;
  createdAt: string;
}

const Questions = () => {
  const [questions, setQuestions] = useState<IChat[]>([]);
  useEffect(() => {
    const evtSource = new EventSource(
      `${
        process.env.NEXT_PUBLIC_SERVER_URL
      }sse/events?userId=${sessionStorage.getItem("userId")}`
    );
    evtSource.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setQuestions((prev) => {
        const idx = prev.findIndex((x) => x.id === data.id);

        return [
          ...prev.slice(0, idx),
          {
            ...prev[idx],
            message: prev[idx].message + " " + data.message,
          },
          ...prev.slice(idx + 1, prev.length),
        ];
      });
    };
    return () => {
      evtSource.close();
    };
  }, []);

  return (
    <>
      <div
        className="overflow-y-scroll z-10 flex-1 pl-4 pr-4"
        style={{ height: "calc(100vh - 105px)" }}
      >
        {questions.map((chat, index) => {
          return <Chat chat={chat} key={chat.id} />;
        })}
      </div>

      <ChatInputForm setQuestions={setQuestions} />
    </>
  );
};

export default Questions;
