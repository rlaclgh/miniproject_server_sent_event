import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { IChat } from "./quetions";
import { Dispatch, SetStateAction } from "react";

interface FormProps {
  message: string;
  imageUrl: string;
}

interface ChatInputFormProps {
  setQuestions: Dispatch<SetStateAction<IChat[]>>;
}

const ChatInputForm = (props: ChatInputFormProps) => {
  const { setQuestions } = props;
  const { control, getValues, setValue } = useForm<FormProps>({
    defaultValues: {
      message: "",
      imageUrl: "",
    },

    mode: "onChange",
    reValidateMode: "onChange",
  });

  return (
    <>
      <div className="flex border-t border-gray-light border-solid pt-2 pb-2">
        <Controller
          name="message"
          control={control}
          render={({ field }) => {
            return (
              <TextareaAutosize
                maxRows={1}
                className="flex-1 outline-none resize-none h-10 text-base bg-gray-light mr-2 ml-2 pr-2 pl-2 rounded-lg p-2"
                placeholder="메시지를 입력해주세요."
                {...field}
              />
            );
          }}
        />
        <div
          className="justify-end items-end flex pb-2 pr-2"
          onClick={() => {
            const newId = (Math.random() + 1).toString(36).substring(2, 10);
            const responseId = newId + "_response";
            const userId = sessionStorage.getItem("userId");

            setQuestions((prev) => [
              ...prev,
              {
                id: newId,
                isMine: true,
                message: getValues("message"),
                createdAt: new Date().toString(),
              },
              {
                id: responseId,
                isMine: false,
                message: "답변: ",
                createdAt: new Date().toString(),
              },
            ]);

            axios.post(
              `http://127.0.0.1:8080/sse/events?userId=${userId}&questionId=${responseId}`
            );
            setValue("message", "");
          }}
        >
          전송
        </div>
      </div>
    </>
  );
};

export default ChatInputForm;
