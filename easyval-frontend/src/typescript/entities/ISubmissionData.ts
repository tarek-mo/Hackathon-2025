export interface ISubmissionData {
  _id: string;
  date: string; // ISO string
  aiGeneratedProbability: number;
  cheated: boolean;
  userId: {
    name: string;
    email: string;
  };
  cheatFromFriendProbability: number;
  cheatedFromSubmission?: {
    userId: {
      name: string;
    };
  } | null;
}
