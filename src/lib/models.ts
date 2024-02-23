
// export interface User {
//   userId: string|null;  // pk
//   username: string;
//   password: string;
//   email: string;
//   ip: string;
// }
export interface PollOpt {
  text: string;
  count: number;
}

export interface Poll {
  pollId: string;
  userId: string;
  question: string;
  answers: PollOpt[];
  isOpen: boolean;
  createdAt: number;
}
export interface PollPrep {
  question: string;
  options: string[];
  isOpen: string;
}
export interface Vote {
  userPollId: string
  selection: number;
}
