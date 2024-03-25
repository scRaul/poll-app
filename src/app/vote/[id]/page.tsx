import { getPollById } from "@/actions/poll.actions";
import { getUserName } from "@/actions/user.actions";
import VotingPoll from "@/components/VotingPoll";
import { Poll } from "@/lib/models";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const poll = (await getPollById(params.id)) as Poll;

  return {
    title: poll.question.split(" ")[0],
    description: poll.question,
  };
}
export default async function VotePollPage({
  params,
}: {
  params: { id: string };
}) {
  const pollData = await getPollById(params.id);
  const poll: Poll = {
    pollId: pollData.pollId,
    userId: pollData.userId,
    question: pollData.question,
    answers: pollData.answers,
    createdAt: pollData.createdAt,
    isOpen: pollData.isOpen === "true",
  };
  const userData = await getUserName(poll.userId);
  const username = userData.username;
  return (
    <div>
      <h1 className="text-2xl md:text-4xl text-blue-500 my-2">
        {username}
        {" wants to know:"}
      </h1>
      <VotingPoll poll={poll} />
    </div>
  );
}
