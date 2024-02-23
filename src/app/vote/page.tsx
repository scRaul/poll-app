interface VoteProps {
  className?: string;
}

export default function Vote(props: VoteProps) {
  return (
    <div>
      <h1 className="text-2xl md:text-4xl text-blue-500 my-2"> Vote</h1>
    </div>
  );
}
