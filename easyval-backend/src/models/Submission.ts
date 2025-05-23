import mongoose, { Schema, Document } from "mongoose";

export interface ISubmission extends Document {
  date: Date;
  assignmentId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  filePath: string;
  isSolution: boolean;
  aiGeneratedProbability: { type: Number; default: 0 };
  cheatFromFriendProbability: { type: Number; default: 0 };
  cheated: boolean;
  cheatedFromSubmission?: mongoose.Types.ObjectId;
}

const SubmissionSchema: Schema = new Schema({
  date: { type: Date, default: Date.now },
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assignment",
    required: true,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  filePath: { type: String, required: true },
  isSolution: { type: Boolean, default: false },
  aiGeneratedProbability: {
    type: Number,
    default: 0,
    min: 0,
    max: 100, // Change this if you're storing as a percentage
  }, // Replace boolean with probability
  cheatFromFriendProbability: {
    type: Number,
    default: 0,
    min: 0,
    max: 100, // Change this if you're storing as a percentage
  }, // Replace boolean with probability
  cheated: { type: Boolean, default: false },
  cheatedFromSubmission: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Submission",
  },
});

export default mongoose.model<ISubmission>("Submission", SubmissionSchema);
