"use client";
import { createPoll, deletePoll, updatePoll } from "@/actions/poll.actions";
import { Poll, PollOpt, PollPrep } from "@/lib/models";
import { Trash, X } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import UserPollElement from "./UserPollElement";
import PollForm from "./PollForm/PollForm";

interface DashControllerProps {
  className?: string;
  polls: Poll[];
  userId: string;
}
const api = "https://us-central1-poll-24d19.cloudfunctions.net/api/polls";
export default function DashController(props: DashControllerProps) {
  const [openPollForm, setOpenPollForm] = useState(false);
  const [renderPolls, setRenderPolls] = useState<Poll[]>(props.polls);
  const [eventSource, setEventSource] = useState<EventSource | null>(null);
  useEffect(() => {
    initializeEventSource();
    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, []);
  useEffect(() => {
    const handleWindowFocus = () => {
      if (!eventSource) {
        initializeEventSource();
      }
    };
    window.addEventListener("focus", handleWindowFocus);
    return () => {
      window.removeEventListener("focus", handleWindowFocus);
    };
  }, [eventSource]);
  function initializeEventSource() {
    const source = new EventSource(`${api}/${props.userId}`);
    source.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      const id = Object.keys(data)[0];
      // Handle real-time data updates
      const updatePolls = [...renderPolls];
      const pi = updatePolls.findIndex((pol) => {
        return pol.createdAt == data[id].createdAt;
      });
      if (pi == -1) return;
      updatePolls[pi].answers = data[id].answers as PollOpt[];
      setRenderPolls(updatePolls);
    });
    setEventSource(source);
  }
  async function trySubmitPoll(poll: PollPrep) {
    const response = await createPoll(poll);
    setOpenPollForm(false);
    if (!response.poll) {
      console.log(response.message);
      return;
    }
    const data = response.poll;
    const newPoll: Poll = {
      pollId: data.pollId,
      userId: data.userId,
      question: data.question,
      answers: data.answers,
      createdAt: data.createdAt,
      isOpen: data.isOpen === "true",
    };
    setRenderPolls([...renderPolls, newPoll]);
  }
  async function handleDelete(pollId: string) {
    const deleted = await deletePoll(pollId);
    if (deleted.message != "successfull") {
      console.error("unable to handle this req atm");
      return;
    }
    const newPolls = [...renderPolls];
    const updatedPolls = newPolls.filter((p) => p.pollId !== pollId);
    setRenderPolls(updatedPolls);
  }
  //only able to update if its open for voting
  async function handlePollUpdate(pollId: string, isOpen: boolean) {
    const update = await updatePoll(pollId, isOpen);
  }
  return (
    <div className="">
      <button
        type="button"
        className="rounded p-2 bg-emerald-600 font-bold"
        onClick={() => setOpenPollForm(true)}
      >
        Make a new Poll
      </button>

      {openPollForm && (
        <PollForm
          handleCancel={() => setOpenPollForm(false)}
          handleSubmit={trySubmitPoll}
        />
      )}
      <div className="mt-10">
        {renderPolls.map((poll, index) => (
          <UserPollElement
            poll={poll}
            key={index}
            onDelete={handleDelete}
            onUpdate={handlePollUpdate}
          />
        ))}
      </div>
    </div>
  );
}
