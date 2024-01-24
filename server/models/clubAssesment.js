import mongoose from "mongoose";
const { Schema } = mongoose;

const clubAssessmentSchema = new Schema({
    student: {
        type: Schema.Types.ObjectId,
        ref: "student",
      },
      email:{
        type: String,
       required: true,
      },
  club: {
    type: String,
    required: true,
  },
  eventName: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  participationType: {
    type: String,
    enum: ["volunteer", "Winner", "participate","firRunnnerUp","secRunnerUp"],
    required: true,
  },
  isTechnicalEvent: {
    type: Boolean,
    required: true,
  },
});

export default mongoose.model("clubAssessment", clubAssessmentSchema);
