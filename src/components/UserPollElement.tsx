"use client";
import { Poll } from "@/lib/models";
import { MoreHorizontal, Trash, X } from "lucide-react";
import { useState } from "react";
import ConfirmationButton from "./ConfirmationButton";
import { getMyId } from "@/actions/auth.actions";

interface PollProps {
  poll: Poll;
  onDelete: (pollId: string) => void;
  onUpdate: (pollId: string, isOpen: boolean) => void;
}

export default function UserPollElement(props: PollProps) {
  const [openDetails, setOpenDetails] = useState(false);
  const [voteOpen, setVoteOpen] = useState(props.poll.isOpen);
  const [valueWhenOpen, setValueWhenOpen] = useState(props.poll.isOpen);

  const poll = props.poll;
  var totalVotes = 0;
  poll.answers.map((opt) => {
    totalVotes += opt.count;
  });

  function getPercent(count: number) {
    if (totalVotes == 0) return 0;
    const percent = Math.floor((count / totalVotes) * 100);
    // console.log(percent);
    return percent;
  }
  function handleDelete() {
    props.onDelete(poll.pollId);
  }
  function toggleDetails() {
    if (!openDetails) {
      //about to be open
      setValueWhenOpen(voteOpen);
    } else {
      //about to be closed
      if (valueWhenOpen != voteOpen) {
        //this was changed since last time before closing
        props.onUpdate(poll.pollId, voteOpen);
      }
    }
    setOpenDetails(!openDetails);
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
        <div className="flex justify-end">
          <MoreHorizontal onClick={toggleDetails} className="" />
        </div>
        <h1 className="text-xl font-extrabold">{poll.question}</h1>
      </header>
      {openDetails && (
        <MoreDetail
          pollId={poll.pollId}
          votesOpen={voteOpen}
          setVoteOpen={setVoteOpen}
          onDelete={handleDelete}
        />
      )}
      <div className="p-2">
        {poll.answers.map((opt, index) => (
          <div
            key={index}
            className="relative flex rounded border mt-2 font-semibold p-2"
          >
            <div
              className={` absolute top-0 left-0 h-full ${
                voteOpen ? "bg-emerald-500" : "bg-[#ffffff22]"
              }`}
              style={{ width: `${getPercent(opt.count)}%` }}
            ></div>
            <p className="flex-grow text-nowrap" style={{ zIndex: 50 }}>
              {opt.text}
            </p>
            <p className="">{opt.count}</p>
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
          {totalVotes}
        </h1>
      </footer>
    </div>
  );
}

interface MoreDetailProps {
  pollId: string;
  votesOpen: boolean;
  setVoteOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onDelete: () => void;
}
function MoreDetail(props: MoreDetailProps) {
  return (
    <div
      className="absolute top-5 w-full font-light flex justify-end"
      style={{ zIndex: 99 }}
    >
      <div className="flex flex-col w-fit items-start rounded shadow-xl shadow-black  bg-gray-800 text-white py-2 ">
        <div className="flex gap-1 p-2">
          <label htmlFor="isOpen" className="text-nowrap tex-start">
            Votes Allowed
          </label>
          <div className="w-5 h-5">
            <input
              id="isOpen"
              name="isOpen"
              type="checkbox"
              className="input h-full"
              checked={props.votesOpen}
              onChange={(e) => props.setVoteOpen(e.currentTarget.checked)}
            />
          </div>
        </div>
        <a
          href={`/vote/${props.pollId}`}
          target="_blank"
          className="text-nowrap hover:bg-[#ffffff33] w-full p-2 text-start text-blue-500"
        >
          Voting Link
        </a>
        <ConfirmationButton
          buttonLabel={"Delete"}
          prompt={"Confirm to Delete"}
          onConfirm={props.onDelete}
          className="text-nowrap hover:bg-[#ffffff33] w-full p-1 text-star [&>dialog]:bg-gray-800 [&>dialog]:border [&>dialog]:text-white"
        />
      </div>
    </div>
  );
}
