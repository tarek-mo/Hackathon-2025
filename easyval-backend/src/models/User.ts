import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  role: "student" | "professor";
  password: string;
  enrolled_in: mongoose.Types.ObjectId[];
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ["student", "professor"], required: true },
  password: { type: String, required: true, minlength: 8 },
  enrolled_in: [{ type: mongoose.Schema.Types.ObjectId, ref: "Class" }],
});

export default mongoose.model<IUser>("User", UserSchema);
