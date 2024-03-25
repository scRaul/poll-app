"use client";
import { PollPrep } from "@/lib/models";
import { X, Trash } from "lucide-react";
import { useState, useRef, ChangeEvent, FormEvent } from "react";

interface PollFormProps {
  handleCancel: () => void;
  handleSubmit: (poll: PollPrep) => void;
}
export default function PollForm(props: PollFormProps) {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState<string[]>([""]);
  const [isOpen, setIsOpen] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [canSubmit, setCanSubmit] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  function handleOptionChange(index: number, value: string) {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setErrMessage("");
    setOptions(updatedOptions);
  }
  function handleBlur(index: number) {
    if (index != options.length - 1) return;
    if (options[index] == "") return;
    if (options.length > 1) setCanSubmit(true);
    setOptions([...options, ""]);
  }
  function removeOption(index: number) {
    const updatedOptions = [...options];
    updatedOptions.splice(index, 1);
    if (updatedOptions.length < 2) setCanSubmit(false);
    setOptions(updatedOptions);
  }

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) {
    if (event.key === "Enter") {
      event.currentTarget.blur(); // Unfocus the current input element
    }
  }
  function handleAreaChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setQuestion(event.currentTarget.value);
    adjustTextArea();
    setErrMessage("");
  }
  function adjustTextArea() {
    if (!textAreaRef.current) return;
    const textArea = textAreaRef.current;
    textArea.style.height = "auto";
    textArea.style.height = textArea.scrollHeight + "px";
  }
  function handleReset() {
    setQuestion("");
    setOptions([]);
    setIsOpen(false);
    setCanSubmit(false);
    adjustTextArea();
    setErrMessage("");
  }
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (question.trim() === "") {
      setErrMessage("Prompt can't be left blank");
      return;
    }
    const nonEmptyOptions = options.filter((option) => option.trim() !== "");
    if (nonEmptyOptions.length <= 1) {
      setErrMessage("Poll must have 2 or more options");
      return;
    }
    const poll = {
      question,
      options: nonEmptyOptions,
      isOpen: isOpen ? "true" : "false",
    };
    props.handleSubmit(poll);
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-80 mx-auto bg-emerald-800 font-bold rounded p-2 flex flex-col gap-1 my-4"
    >
      <X onClick={props.handleCancel} />
      <small className="text-red-500">{errMessage}</small>
      <textarea
        ref={textAreaRef}
        name="question"
        className="focus:outline-none p-2 w-full cursor-pointer bg-[#ffffff11] scrolly resize-none overflow-hidden"
        placeholder="Type in your prompt..."
        value={question}
        onBlur={() => setQuestion(question.trim())}
        onChange={handleAreaChange}
      />
      {options.map((opt, index) => (
        <div
          key={index}
          className="flex items-center bg-[#ffffff11] cursor-pointer px-2"
        >
          <input
            type="text"
            key={index}
            value={opt}
            className="bg-transparent focus:outline-none p-2 w-full cursor-pointer"
            onChange={(e) => handleOptionChange(index, e.target.value)}
            placeholder={`Option ${index + 1}`}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onBlur={() => handleBlur(index)}
          />
          {index > 0 && (
            <Trash
              className="hover:text-white text-gray-800"
              onClick={() => removeOption(index)}
            />
          )}
        </div>
      ))}
      <div className="flex items-center justify-end gap-3 px-5">
        <label htmlFor="isOpen">voting open?</label>
        <div className="w-5 h-5">
          <input
            id="isOpen"
            name="isOpen"
            type="checkbox"
            className="input h-full"
            checked={isOpen}
            onChange={(e) => setIsOpen(e.currentTarget.checked)}
          />
        </div>
      </div>
      <button
        type="submit"
        className={`w-full p-2 ${
          canSubmit ? "bg-red-600" : "bg-red-300"
        } rounded`}
        disabled={!canSubmit}
      >
        Create Poll
      </button>
      <button
        type="reset"
        className="w-full p-2 rounded hover:bg-[#ffffff33]"
        onClick={handleReset}
      >
        Reset
      </button>
    </form>
  );
}
