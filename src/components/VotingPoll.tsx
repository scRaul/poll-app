"use client";
import { sendVote } from "@/actions/poll.actions";
import { Poll, PollOpt } from "@/lib/models";
import { CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface PollProps {
  poll: Poll;
}

export default function VotingPoll(props: PollProps) {
  const [voteOpen, setVoteOpen] = useState(props.poll.isOpen);
  const [hasVoted, setHasVoted] = useState(false);
  const [selected, setSelected] = useState(-1);
  const [counts, setCounts] = useState<number[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [renderedAnswers, setRenderdAnswers] = useState<PollOpt[] | null>(null);
  const poll = props.poll;
  useEffect(() => {
    setRenderdAnswers(poll.answers);
  }, []);
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
    if (!poll.isOpen) return;
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
    setRenderdAnswers(response.answers as PollOpt[]);
  }

  return (
    <div
      className={`relative border-2 mt-5 ${
        voteOpen ? "border-emerald-600" : "border-[#ffffff22]"
      } bg-inherit max-w-3xl mx-auto rounded`}
    >
      <header
        className={`${voteOpen ? "bg-emerald-600" : "bg-[#ffffff22]"} px-4`}
      >
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
        className={`${
          voteOpen ? "bg-emerald-600" : "bg-[#ffffff22]"
        } px-4 text-right`}
      >
        <h1 className="text-xl font-extrabold">
          {"total votes: "}
          {totalCount}
        </h1>
      </footer>
    </div>
  );
}
