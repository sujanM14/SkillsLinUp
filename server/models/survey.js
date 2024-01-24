import mongoose from "mongoose";
const { Schema } = mongoose;
const surveySchema = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: "student",
  },
  communicationSkills: {
    onlineCommunication: {
      type: String,
      default: "", // Assign your desired default value
    },
    questioningOpinions: {
      type: String,
      default: "",
    },
    thinkingWhileListening: {
      type: String,
      default: "",
    },
    expressInWriting: {
      type: String,
      default: "",
    },
    difficultyWithStrangers: {
      type: String,
      default: "",
    },
  },
  problemSolving: {
    determineRealIssue: {
      type: String,
      default: "", // Assign your desired default value
    },

    struggleWithComplexProblems: {
      type: String,
      default: "",
    },
    differentPerspective: {
      type: String,
      default: "",
    },
   
    determinedDecision:{
      type: String,
      default: "",
    },
    preferOwnDecisions:  {
      type: String,
      default: "",
    },
  },
  interpersonalSkills: {
    confidentExpressingOpinions: {
      type: String,
      default: "",
    },
    attentiveToBodyLanguage: {
      type: String,
      default: "",
    },
    discomfortWithDisagreement: {
      type: String,
      default: "",
    },
    respondToFeedback: {
      type: String,
      default: "",
    },
    gaugeFeelings: {
      type: String,
      default: "",
    },
  },
  selfAssessment: {
    motivatedToLearn: {
      type: String,
      default: "",
    },
    useStrengths: {
      type: String,
      default: "",
    },
    confidentPerson: {
      type: String,
      default: "",
    },
  },
  timeStressManagement: {
    pressureExamsAssignments: {
      type: String,
      default: "",
    },
    anxietyUnderPressure: {
      type: String,
      default: "",
    },
    struggleToCompleteTasks: {
      type: String,
      default: "",
    },
    meetDeadlines: {
      type: String,
      default: "",
    },
    uncomfortableAskingForHelp: {
      type: String,
      default: "",
    },
  
  },
  etiquette: {
    avoidAskingQuestions: {
      type: String,
      default: "",
    },
    comfortableInMeeting: {
      type: String,
      default: "",
    },
    professionalAppearance: {
      type: String,
      default: "",
    },
    greetAndIntroduce: {
      type: String,
      default: "",
    },
    punctualAndDedicated: {
      type: String,
      default: "",
    },
  },
  technicalSkills: {
    c:{
      type: Boolean,
      default: false,
    },
    python: {
      type: Boolean,
      default: false,
    },
    java: {
      type: Boolean,
      default: false,
    },
    cpp: {
      type: Boolean,
      default: false,
    },
   
    ml: {
      type: Boolean,
      default: false,
    },
    ai: {
      type: Boolean,
      default: false,
    },
    git: {
      type: Boolean,
      default: false,
    },
    os: {
      type: Boolean,
      default: false,
    },
    db: {
      type: Boolean,
      default: false,
    },
    cn: {
      type: Boolean,
      default: false,
    },
    spring: {
      type: Boolean,
      default: false,
    },
    IOT: {
      type: Boolean,
      default: false,
    },
    blockchain: {
      type: Boolean,
      default: false,
    },
    cybersecurity: {
      type: Boolean,
      default: false,
    },
    react: {
      type: Boolean,
      default: false,
    },
    html: {
      type: Boolean,
      default: false,
    },
    css: {
      type: Boolean,
      default: false,
    },
    javascript: {
      type: Boolean,
      default: false,
    },
    nodejs: {
      type: Boolean,
      default: false,
    },
    django: {
      type: Boolean,
      default: false,
    },
    mongodb: {
      type: Boolean,
      default: false,
    },
    sql: {
      type: Boolean,
      default: false,
    },
  },
});

export default mongoose.model("Survey", surveySchema);

