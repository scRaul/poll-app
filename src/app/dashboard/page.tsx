import { getUsersPolls } from "@/actions/poll.actions";
import DashController from "@/components/DashController";
import { Poll } from "@/lib/models";

interface DashboardProps {
  className?: string;
}

export default async function Dashboard(props: DashboardProps) {
  const response = await getUsersPolls();
  const data = response.polls.data;
  var polls: Poll[];
  if (!data) {
    polls = [];
  } else {
    polls = Object.keys(data).map((pollId) => ({
      pollId,
      userId: data[pollId].userId,
      question: data[pollId].question,
      answers: data[pollId].answers,
      isOpen: data[pollId].isOpen === "true",
      createdAt: data[pollId].createdAt,
    }));
  }
  return (
    <div>
      <h1 className="text-2xl md:text-4xl text-blue-500 my-2"> Dashboard</h1>
      <DashController polls={polls} />
    </div>
  );
}
