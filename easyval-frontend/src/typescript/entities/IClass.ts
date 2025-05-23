// types/class.ts
export interface IClass {
  _id: string;
  name: string;
  userId: string; // ID of the professor who created it
  joinCode: string;
  description: string;
  enrolled_students: string[];
}
