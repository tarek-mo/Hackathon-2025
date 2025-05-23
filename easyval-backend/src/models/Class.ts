// models/Class.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IClass extends Document {
  name: string;
  userId: mongoose.Types.ObjectId;
  enrolled_students: mongoose.Types.ObjectId[];
  joinCode: string;
  description: string;
}

const classSchema = new Schema<IClass>({
  name: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  enrolled_students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  joinCode: { type: String, required: true, unique: true },
  description: { type: String, required: true },
});

const ClassModel = mongoose.model<IClass>("Class", classSchema);
export default ClassModel;
