"use client";
import { sendVote } from "@/actions/poll.actions";
import { Poll, PollOpt } from "@/lib/models";
import { CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface PollProps {
  poll: Poll;
}
const api = "https://us-central1-poll-24d19.cloudfunctions.net/api/polls";
export default function VotingPoll(props: PollProps) {
  const openColor = "#249669";
  const closedColor = "#ffffff22";
  const [voteOpen, setVoteOpen] = useState(props.poll.isOpen);
  const [borderColor, setBorderColor] = useState(openColor);
  const [hasVoted, setHasVoted] = useState(false);
  const [selected, setSelected] = useState(-1);
  const [counts, setCounts] = useState<number[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [renderedAnswers, setRenderdAnswers] = useState<PollOpt[] | null>(null);
  const [eventSource, setEventSource] = useState<EventSource | null>(null);
  const poll = props.poll;
  useEffect(() => {
    setRenderdAnswers(poll.answers);
  }, []);
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
    const source = new EventSource(`${api}/${props.poll.pollId}`);
    source.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      // Handle real-time data updates
      const open = data.isOpen === "true";
      if (!open) setBorderColor(closedColor);
      else setBorderColor(openColor);
      setVoteOpen(open);
      setRenderdAnswers(data.answers as PollOpt[]);
    });
    setEventSource(source);
  }
  useEffect(() => {
    var newCount: number[] = [];
    var totalVotes = 0;
    if (renderedAnswers) {
      renderedAnswers.map((opt) => {
        totalVotes += opt.count;
        newCount.push(opt.count);
      });
      setCounts(newCount);
      setTotalCount(totalVotes);
    }
  }, [renderedAnswers]);

  function getPercent(index: number) {
    if (!hasVoted) return 0;
    if (totalCount == 0) return 0;
    const percent = Math.floor((counts[index] / totalCount) * 100);
    return percent;
  }

  function handleClick(index: number) {
    if (!voteOpen) return;
    if (selected == index) return;
    if (!hasVoted) {
      setTotalCount(totalCount + 1);
    }
    const newCount = [...counts];
    if (hasVoted) {
      newCount[selected] -= 1;
    }
    newCount[index] += 1;
    setCounts(newCount);
    setHasVoted(true);
    setSelected(index);
    castVote(index);
  }
  async function castVote(selection: number) {
    const response = await sendVote(poll.pollId, selection);
    if (!response.answers) {
      return;
    }
    const updatedAnswers: PollOpt[] = response.answers;
    setRenderdAnswers(updatedAnswers);
  }

  return (
    <div
      className="relative border-2 mt-5 bg-inherit max-w-3xl mx-auto rounded"
      style={{ borderColor: borderColor }}
    >
      <header className={`px-4`} style={{ backgroundColor: borderColor }}>
        <h1 className="text-xl font-extrabold">{poll.question}</h1>
      </header>

      <div className="p-2">
        {renderedAnswers &&
          renderedAnswers.map((opt, index) => (
            <div
              key={index}
              className="relative rounded border mt-2 font-semibold p-2 cursor-pointer"
              onClick={() => handleClick(index)}
            >
              <div
                className={` absolute top-0 left-0 h-full ${
                  voteOpen ? "bg-emerald-500" : "bg-[#ffffff22]"
                }`}
                style={{ width: `${getPercent(index)}%` }}
              ></div>
              <div className="flex">
                <p className="flex-grow text-nowrap" style={{ zIndex: 48 }}>
                  {opt.text}
                </p>
                {index == selected && (
                  <CheckCircle className="" style={{ zIndex: 50 }} />
                )}
              </div>
            </div>
          ))}
      </div>
      <footer
        className={`px-4 text-right`}
        style={{ backgroundColor: borderColor }}
      >
        <h1 className="text-xl font-extrabold">
          {"total votes: "}
          {totalCount}
        </h1>
      </footer>
      {!voteOpen && (
        <small className="text-red-600">
          {"creator has stopped allowing votes"}
        </small>
      )}
    </div>
  );
}
