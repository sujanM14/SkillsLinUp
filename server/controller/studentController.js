import student from "../models/student.js";
import Test from "../models/test.js";
import Student from "../models/student.js";
import Subject from "../models/subject.js";
import Marks from "../models/marks.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import survey from "../models/survey.js";
import ClubAssessment from "../models/clubAssesment.js"
import Club from "../models/club.js"
export const studentLogin = async (req, res) => {
  const { username, password } = req.body;
  const errors = { usernameError: String, passwordError: String };
  try {
    const existingStudent = await Student.findOne({ username });
    if (!existingStudent) {
      errors.usernameError = "Student doesn't exist.";
      return res.status(404).json(errors);
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingStudent.password
    );
    if (!isPasswordCorrect) {
      errors.passwordError = "Invalid Credentials";
      return res.status(404).json(errors);
    }

    const token = jwt.sign(
      {
        email: existingStudent.email,
        id: existingStudent._id,
      },
      "sEcReT",
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingStudent, token: token });
  } catch (error) {
    console.log(error);
  }
};

export const updatedPassword = async (req, res) => {
  try {
    const { newPassword, confirmPassword, email } = req.body;
    const errors = { mismatchError: String };
    if (newPassword !== confirmPassword) {
      errors.mismatchError =
        "Your password and confirmation password do not match";
      return res.status(400).json(errors);
    }

    const student = await Student.findOne({ email });
    let hashedPassword;
    hashedPassword = await bcrypt.hash(newPassword, 10);
    student.password = hashedPassword;
    await student.save();
    if (student.passwordUpdated === false) {
      student.passwordUpdated = true;
      await student.save();
    }

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
      response: student,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateStudent = async (req, res) => {
  try {
    const {

      name,
      department,
      avatar,
      email,
      batch,
      year,
    } = req.body;
    const updatedStudent = await Student.findOne({ email });
    if (name) {
      updatedStudent.name = name;
      await updatedStudent.save();
    }
    if (department) {
      updatedStudent.department = department;
      await updatedStudent.save();
    }
    if (batch) {
      updatedStudent.batch = batch;
      await updatedStudent.save();
    }
    if (year) {
      updatedStudent.year = year;
      await updatedStudent.save();
    }
    if (avatar) {
      updatedStudent.avatar = avatar;
      await updatedStudent.save();
    }
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const testResult = async (req, res) => {
  try {
    const { department, year  } = req.body;
    const errors = { notestError: String };
    const student = await Student.findOne({ department, year });
    const test = await Test.find({ department, year });
    if (test.length === 0) {
      errors.notestError = "No Test Found";
      return res.status(404).json(errors);
    }
    var result = [];
    for (var i = 0; i < test.length; i++) {
      var subjectCode = test[i].subjectCode;
      var subject = await Subject.findOne({ subjectCode });
      var marks = await Marks.findOne({
        student: student._id,
        exam: test[i]._id,
      });
      if (marks) {
        var temp = {
          marks: marks.marks,
          totalMarks: test[i].totalMarks,
          subjectName: subject.subjectName,
          subjectCode,
          test: test[i].test,
        };

        result.push(temp);
      }
    }

    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateassesment = async (req, res) => {
  try {
    const {
      communicationSkills,
      problemSolving,
      interpersonalSkills,
      selfAssessment,
      timeStressManagement,
      etiquette,
      technicalSkills,
    } = req.body;
  // console.log(req.body)
  // console.log("shbdsc");
    const studentId = req.body.studentId; // Use studentId instead of userId
    // console.log(studentId);
    // 65572210443d8ec04a96afa4
    const updatedSurvey = await survey.findOne({ _id: studentId }); // Use the 'student' field
    // console.log("updated survey is",updatedSurvey);
      // Validate that the survey is found
  if (!updatedSurvey) {
    return res.status(404).json({ error: 'Survey not found.' });
  }
    if (communicationSkills) {
      updatedSurvey.communicationSkills = communicationSkills;
    }

    if (problemSolving) {
      updatedSurvey.problemSolving = problemSolving;
    }

    if (interpersonalSkills) {
      updatedSurvey.interpersonalSkills = interpersonalSkills;
    }

    if (selfAssessment) {
      updatedSurvey.selfAssessment = selfAssessment;
    }

    if (timeStressManagement) {
      updatedSurvey.timeStressManagement = timeStressManagement;
    }

    if (etiquette) {
      updatedSurvey.etiquette = etiquette;
    }
    if (technicalSkills) {
      updatedSurvey.technicalSkills = technicalSkills;
    }
  // console.log("Updated survey is",updatedSurvey);
    await updatedSurvey.save();
    return res.status(200).json({
      success: true,
      message: "Survey submitted successfully",
      response: updatedSurvey,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
// export const surveyData= async (req, res) => {
//   try{
//   const surveyId = req.params.id;
//   console.log(surveyId);
//     const survey = await survey.findOne({ _id: surveyId });

//     if (!survey) {
//       return res.status(404).json({ error: 'Survey not found' });
//     }

//     res.status(200).json(survey);
//   } catch (error) {
//     console.error('Error fetching survey:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// }
export const surveyData = async (req, res) => {
  try {
    const { survey_id } = req.body;
    const errors = { notestError: String };
    const surveyData = await survey.findOne({ _id:survey_id });
    // console.log(surveyData);
    if (!surveyData) {
      errors.notestError = "No Survey Found";
      return res.status(404).json(errors);
    }

    res.status(200).json({ surveyData });
  } catch (error) {
    res.status(500).json(error);
  }
};
// createClubAssesment
// 
// Import necessary modules

export const createClubAssessment = async (req, res) => {
  try {
    const { studentId, club,email, eventName, year, participationType, isTechnicalEvent } = req.body;
    const errors = { assessmentError: String };

    // Check if a similar assessment already exists
    const existingAssessment = await ClubAssessment.findOne({
      student: studentId,
      club: club,
      eventName: eventName,
      email:email,
      year: year,
      participationType: participationType,
      isTechnicalEvent: isTechnicalEvent,
    });

    if (existingAssessment) {
      errors.assessmentError = "Similar assessment already exists.";
      return res.status(400).json(errors);
    }

    // Create a new club assessment
    const newAssessment = await new ClubAssessment({
      student: studentId,
      club: club,
      email:email,
      eventName: eventName,
      year: year,
      participationType: participationType,
      isTechnicalEvent: isTechnicalEvent,
    });

    // Save the new assessment to the database
    await newAssessment.save();

    return res.status(200).json({
      success: true,
      message: "Club assessment added successfully",
      response: newAssessment,
    });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
};
// getClub
export const getClub = async (req, res) => {
  try {
    const clubs = await Club.find();
    console.log(clubs);
    res.status(200).json(clubs);
  } catch (error) {
    console.log("Backend Error", error);
  }
};
// getClubAssesment

export const getClubAssessment = async (req, res) => {
  try {
    const { student_id,email } = req.body;
    const errors = { notestError: String };

    // Assuming you have a 'student' field in the ClubAssessment model that refers to the Student model
    const clubAssessments = await ClubAssessment.find({ email:email })
      .populate('club')  // If you want to populate the 'club' field with the full club document
      .exec();
    console.log("Hello World",clubAssessments);
    if (!clubAssessments) {
      errors.notestError = 'No Club Assessments Found';
      return res.status(404).json(errors);
    }

    res.status(200).json({ clubAssessments });
  } catch (error) {
    res.status(500).json(error);
  }
};
