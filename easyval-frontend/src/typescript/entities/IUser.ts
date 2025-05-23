// types/user.ts
export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: "student" | "professor";
  enrolled_in: string[]; // Array of Class IDs
}
