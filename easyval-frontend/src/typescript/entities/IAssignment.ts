// types/assignment.ts
export interface IAssignment {
  _id: string;
  classId: string;
  title: string;
  description?: string;
  dueDate?: string; // ISO format (e.g., 2025-06-01T12:00:00Z)
  filePath: string;
}
