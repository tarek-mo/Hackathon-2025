import mongoose, { Schema, Document } from "mongoose";

export interface IAssignment extends Document {
  deadline: Date;
  description?: string;
  title: string;
  classId: mongoose.Types.ObjectId;
  correctionId?: mongoose.Types.ObjectId;
  filePath?: string;
  createdAt?: Date; // optional if you're using Mongoose's timestamps
  cheatingCeil: number; // add this line
}

const AssignmentSchema: Schema = new Schema(
  {
    deadline: { type: Date, required: true },
    description: { type: String },
    title: { type: String, required: true },
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
    correctionId: { type: mongoose.Schema.Types.ObjectId, ref: "Submission" },
    filePath: { type: String },
    cheatingCeil: { type: Number, default: 0 }, // add this line
  },
  {
    timestamps: { createdAt: true, updatedAt: false }, // enable only createdAt
  }
);

export default mongoose.model<IAssignment>("Assignment", AssignmentSchema);
