// types/submission.ts
export interface ISubmission {
  _id: string;
  date: string; // ISO string
  assignmentId: string;
  userId: string;
  filePath: string;
  isSolution: boolean;
  isAIGenerated: boolean;
  cheatedFromSubmission?: string; // ID of the other submission
}
