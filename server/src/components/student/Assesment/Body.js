import React from "react";
import {useEffect, useState,useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import * as classes from "../../../utils/styles"
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {updateassesment} from "../../../redux/actions/studentActions";
import { SET_ERRORS,UPDATE_ASSESSMENT } from "../../../redux/actionTypes";
import Spinner from "../../../utils/Spinner";
const TechnicalSkillsForm = ({ technicalSkills, handleCheckboxChange }) => {
  return (
    <div>
    <div className='flex flex-wrap gap-6'>
        {Object.keys(technicalSkills).map((skill) => (
          <div key={skill} className='flex items-center space-x-2'>
            <input
              type='checkbox'
              id={skill}
              className='w-5'
              onChange={() => handleCheckboxChange(skill)}
              checked={technicalSkills[skill]}
            />
            <label htmlFor={skill} className="text-base bg-gray-700 shadow-xl text-white px-2 py-1 rounded-lg">
              {skill.charAt(0).toUpperCase() + skill.slice(1)}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
const Body = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const errorRef = useRef();
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  const res = useSelector((state) => state.student.survey.surveyData
  );
  // console.log(res);
  const initialSurveyState = {
    communicationSkills: {
      difficultyWithStrangers: "",
      expressInWriting: "",
      onlineCommunication: "",
      questioningOpinions: "",
      thinkingWhileListening: "",
    },
    problemSolving: {
      determineRealIssue: "",
      struggleWithComplexProblems: "",
      differentPerspective: "",
      determinedDecision: "",
      preferOwnDecisions: "",
    },
    interpersonalSkills: {
      confidentExpressingOpinions: "",
      attentiveToBodyLanguage: "",
      discomfortWithDisagreement: "",
      respondToFeedback: "",
      gaugeFeelings: "",
    },
    selfAssessment: {
      motivatedToLearn: "",
      useStrengths: "",
      confidentPerson: "",
    },
    timeStressManagement: {
      pressureExamsAssignments: "",
      anxietyUnderPressure: "",
      struggleToCompleteTasks: "",
      meetDeadlines: "",
      uncomfortableAskingForHelp: "",
    },
    etiquette: {
      avoidAskingQuestions: "",
      comfortableInMeeting: "",
      professionalAppearance: "",
      greetAndIntroduce: "",
      punctualAndDedicated: "",
    },
    technicalSkills: {
      c:false,
      python: false,
      java: false,
      cpp: false,
      ml: false,
      ai: false,
      git: false,
      os: false,
      db: false,
      cn: false,
      spring: false,
      IOT: false,
      blockchain: false,
      cybersecurity: false,
      react: false,
      html: false,
      css: false,
      javascript: false,
      nodejs: false,
      django: false,
      mongodb: false,
      sql: false,
    },
  };
  
  // console.log(user.result.survey[0]);
  const [value, setValue] = useState(initialSurveyState);
  useEffect(() => {
    setValue(res);
  }, [res]);
  // useEffect(() => {
  //   // Fetch survey data based on the survey ID when the component mounts
  //   const fetchSurveyData = async () => {
  //     try {
  //       const response = await fetch(`/api/student/survey/${user.result.survey[0]}`); // Replace with your actual API endpoint
  //       const data = await response.json();
  //       setValue(data); // Assuming data structure is similar to your initialSurveyState
  //     } catch (error) {
  //       console.error('Error fetching survey data:', error);
  //       // Handle error as needed
  //     }
  //   };

  //   fetchSurveyData();
  // }, [user.result.survey]);
  useEffect(() => {
    // Reset error and loading state when there are errors
    
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setLoading(false);
    }
  }, [store.errors]);
  
  useEffect(() => {
    // Handle success or failure after survey submission
    if (store.errors ||  store.student.updateassesment) {
      setLoading(false);

      if (store.student.updateassesment) {
        

        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: UPDATE_ASSESSMENT, payload: false });
      }
    } else {
      setLoading(true);
    }
  }, [store.errors, store.student.updateassesment]);

  useEffect(() => {
    // Reset errors on component mount
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    setLoading(true);
  
    // Assuming you have the studentId available (replace 'yourStudentId' with the actual variable)
    const studentId = user.result.survey[0];
  
    // Include studentId in the request
    dispatch(updateassesment({ ...value, studentId }));
  };
  const handleCheckboxChange = (skill) => {
    setValue((prevValue) => ({
      ...prevValue,
      technicalSkills: {
        ...prevValue.technicalSkills,
        [skill]: !prevValue.technicalSkills[skill],
      },
    }));
  };
  return (
    <div className="flex-[0.8] mt-3">
      <div className="space-y-5">
          <div className="flex space-x-2 text-gray-400">
           
            <h1>Assesment</h1>
          </div>
          </div>
          <div className=" mr-10 bg-white flex flex-col rounded-xl ">
          <form className={`${classes.adminForm0} scrollbar-thin scrollbar-track-white  scrollbar-thumb-black overflow-y-scroll h-[27rem]`}
            onSubmit={handleSubmit}>
          {/*  */}
          <div className={classes.adminForm1}>
            <div className={classes.adminForm2l}>
            <h1>Technical Skills</h1>
           
            <TechnicalSkillsForm
              technicalSkills={value.technicalSkills}
               handleCheckboxChange={handleCheckboxChange}
            />

             
            </div>
            </div>
          {/*  */}
          <div className={classes.adminForm1}>
          
            <div className={classes.adminForm2l}>
            <h1>Communication</h1>
            <div className={classes.adminForm3}>
            <h1 className={classes.adminLabel}>I am more comfortable with online communications rather than face to face conversation</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.communicationSkills.onlineCommunication}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        communicationSkills: {
                          ...value.communicationSkills,
                          onlineCommunication: e.target.value,
                        },
                      })
                    }>
                    <MenuItem value={"Never"}>Never</MenuItem>
                    <MenuItem value={"Seldom"}>Seldom</MenuItem>
                    <MenuItem value={"Sometimes"}>Sometimes</MenuItem>
                    <MenuItem value={"Frequently"}>Frequently</MenuItem>
                    <MenuItem value={"Always"}>Always</MenuItem>
                  </Select>
            
            </div>
            <div className={classes.adminForm3}>
            <h1 className={classes.adminLabel}>I am aware of the appropriate ways to questioning others opinion or suggestions for clarification without sounding rude or unaccepting</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.communicationSkills.questioningOpinions}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        communicationSkills: {
                          ...value.communicationSkills,
                          questioningOpinions: e.target.value,
                        },
                      })
                    }>
                    <MenuItem value={"Never"}>Never</MenuItem>
                    <MenuItem value={"Seldom"}>Seldom</MenuItem>
                    <MenuItem value={"Sometimes"}>Sometimes</MenuItem>
                    <MenuItem value={"Frequently"}>Frequently</MenuItem>
                    <MenuItem value={"Always"}>Always</MenuItem>
                  </Select>
            
            </div>
            <div className={classes.adminForm3}>
            <h1 className={classes.adminLabel}>While a speaker is talking, I find myself thinking about what I`m going to say next</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.communicationSkills.thinkingWhileListening}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        communicationSkills: {
                          ...value.communicationSkills,
                          thinkingWhileListening: e.target.value,
                        },
                      })
                    }>
                    <MenuItem value={"Never"}>Never</MenuItem>
                    <MenuItem value={"Seldom"}>Seldom</MenuItem>
                    <MenuItem value={"Sometimes"}>Sometimes</MenuItem>
                    <MenuItem value={"Frequently"}>Frequently</MenuItem>
                    <MenuItem value={"Always"}>Always</MenuItem>
                  </Select>
            
            </div>
            <div className={classes.adminForm3}>
            <h1 className={classes.adminLabel}>I am able to express myself or my opinions well in writing (such as assignments, presentation decks, reports etc)</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.communicationSkills.expressInWriting}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        communicationSkills: {
                          ...value.communicationSkills,
                          expressInWriting: e.target.value,
                        },
                      })
                    }>
                    <MenuItem value={"Never"}>Never</MenuItem>
                    <MenuItem value={"Seldom"}>Seldom</MenuItem>
                    <MenuItem value={"Sometimes"}>Sometimes</MenuItem>
                    <MenuItem value={"Frequently"}>Frequently</MenuItem>
                    <MenuItem value={"Always"}>Always</MenuItem>
                  </Select>
            
            </div>
            <div className={classes.adminForm3}>
            <h1 className={classes.adminLabel}>I have difficulty communicating my thoughts or initiating formal conversations with strangers</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.communicationSkills.difficultyWithStrangers}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        communicationSkills: {
                          ...value.communicationSkills,
                          difficultyWithStrangers: e.target.value,
                        },
                      })
                    }>
                    <MenuItem value={"Never"}>Never</MenuItem>
                    <MenuItem value={"Seldom"}>Seldom</MenuItem>
                    <MenuItem value={"Sometimes"}>Sometimes</MenuItem>
                    <MenuItem value={"Frequently"}>Frequently</MenuItem>
                    <MenuItem value={"Always"}>Always</MenuItem>
                  </Select>
            
            </div>
          </div>
          
          </div>
          {/* 2nd part */}
          <div className={classes.adminForm1}>
          
            <div className={classes.adminForm2l}>
            <h1>Problem Solving and Decision Making</h1>
            <div className={classes.adminForm3}>
            <h1 className={classes.adminLabel}>I try to determine the real issue before starting to solve a problem and make decision</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.problemSolving.determineRealIssue}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        problemSolving: {
                          ...value.problemSolving,
                          determineRealIssue: e.target.value,
                        },
                      })
                    }>
                    <MenuItem value={"Never"}>Never</MenuItem>
                    <MenuItem value={"Seldom"}>Seldom</MenuItem>
                    <MenuItem value={"Sometimes"}>Sometimes</MenuItem>
                    <MenuItem value={"Frequently"}>Frequently</MenuItem>
                    <MenuItem value={"Always"}>Always</MenuItem>
                  </Select>
            
            </div>
            <div className={classes.adminForm3}>
            <h1 className={classes.adminLabel}>I struggle to think through and find solutions to complex problems in life</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.problemSolving.struggleWithComplexProblems}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        problemSolving: {
                          ...value.problemSolving,
                          struggleWithComplexProblems: e.target.value,
                        },
                      })
                    }>
                    <MenuItem value={"Never"}>Never</MenuItem>
                    <MenuItem value={"Seldom"}>Seldom</MenuItem>
                    <MenuItem value={"Sometimes"}>Sometimes</MenuItem>
                    <MenuItem value={"Frequently"}>Frequently</MenuItem>
                    <MenuItem value={"Always"}>Always</MenuItem>
                  </Select>
            
            </div>
            <div className={classes.adminForm3}>
            <h1 className={classes.adminLabel}>I look at problems from different perspectives and generate multiple solutions to it.</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.problemSolving.differentPerspective}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        problemSolving: {
                          ...value.problemSolving,
                          differentPerspective: e.target.value,
                        },
                      })
                    }>
                    <MenuItem value={"Never"}>Never</MenuItem>
                    <MenuItem value={"Seldom"}>Seldom</MenuItem>
                    <MenuItem value={"Sometimes"}>Sometimes</MenuItem>
                    <MenuItem value={"Frequently"}>Frequently</MenuItem>
                    <MenuItem value={"Always"}>Always</MenuItem>
                  </Select>
            
            </div>
            <div className={classes.adminForm3}>
            <h1 className={classes.adminLabel}>When I decide on a solution, I try to make it happen, no matter what opposition I may face</h1>

                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.problemSolving.determinedDecision}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        problemSolving: {
                          ...value.problemSolving,
                          determinedDecision: e.target.value,
                        },
                      })
                    }>
                    <MenuItem value={"Never"}>Never</MenuItem>
                    <MenuItem value={"Seldom"}>Seldom</MenuItem>
                    <MenuItem value={"Sometimes"}>Sometimes</MenuItem>
                    <MenuItem value={"Frequently"}>Frequently</MenuItem>
                    <MenuItem value={"Always"}>Always</MenuItem>
                  </Select>
            
            </div>
            <div className={classes.adminForm3}>
            <h1 className={classes.adminLabel}>I prefer to make decisions on my own, and then let other people know what I`ve decided</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.problemSolving.preferOwnDecisions}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        problemSolving: {
                          ...value.problemSolving,
                          preferOwnDecisions: e.target.value,
                        },
                      })
                    }>
                    <MenuItem value={"Never"}>Never</MenuItem>
                    <MenuItem value={"Seldom"}>Seldom</MenuItem>
                    <MenuItem value={"Sometimes"}>Sometimes</MenuItem>
                    <MenuItem value={"Frequently"}>Frequently</MenuItem>
                    <MenuItem value={"Always"}>Always</MenuItem>
                  </Select>
            
            </div>
          </div>
          </div>
          {/* 3rd part */}
          <div className={classes.adminForm1}>
          
            <div className={classes.adminForm2l}>
            <h1>Interpersonal Skills</h1>
            <div className={classes.adminForm3}>
            <h1 className={classes.adminLabel}>I feel confident to express my opinions and put forth my point in front of a group or in meetings</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.interpersonalSkills.confidentExpressingOpinions}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        interpersonalSkills: {
                          ...value.interpersonalSkills,
                          confidentExpressingOpinions: e.target.value,
                        },
                      })
                    }>
                    <MenuItem value={"Never"}>Never</MenuItem>
                    <MenuItem value={"Seldom"}>Seldom</MenuItem>
                    <MenuItem value={"Sometimes"}>Sometimes</MenuItem>
                    <MenuItem value={"Frequently"}>Frequently</MenuItem>
                    <MenuItem value={"Always"}>Always</MenuItem>
                  </Select>
            
            </div>
            <div className={classes.adminForm3}>
            <h1 className={classes.adminLabel}>While communicating with others I pay attention to my body language, facial expressions and gestures.</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.interpersonalSkills.attentiveToBodyLanguage}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        interpersonalSkills: {
                          ...value.interpersonalSkills,
                          attentiveToBodyLanguage: e.target.value,
                        },
                      })
                    }>
                    <MenuItem value={"Never"}>Never</MenuItem>
                    <MenuItem value={"Seldom"}>Seldom</MenuItem>
                    <MenuItem value={"Sometimes"}>Sometimes</MenuItem>
                    <MenuItem value={"Frequently"}>Frequently</MenuItem>
                    <MenuItem value={"Always"}>Always</MenuItem>
                  </Select>
            
            </div>
            <div className={classes.adminForm3}>
            <h1 className={classes.adminLabel}>I feel uncomfortable when I experience disagreement with another person
</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.interpersonalSkills.discomfortWithDisagreement}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        interpersonalSkills: {
                          ...value.interpersonalSkills,
                          discomfortWithDisagreement: e.target.value,
                        },
                      })
                    }>
                    <MenuItem value={"Never"}>Never</MenuItem>
                    <MenuItem value={"Seldom"}>Seldom</MenuItem>
                    <MenuItem value={"Sometimes"}>Sometimes</MenuItem>
                    <MenuItem value={"Frequently"}>Frequently</MenuItem>
                    <MenuItem value={"Always"}>Always</MenuItem>
                  </Select>
            
            </div>
            <div className={classes.adminForm3}>
            <h1 className={classes.adminLabel}>Regardless of whether feedback is positive or negative, I do not know how to respond to it</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.interpersonalSkills.respondToFeedback}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        interpersonalSkills: {
                          ...value.interpersonalSkills,
                          respondToFeedback: e.target.value,
                        },
                      })
                    }>
                    <MenuItem value={"Never"}>Never</MenuItem>
                    <MenuItem value={"Seldom"}>Seldom</MenuItem>
                    <MenuItem value={"Sometimes"}>Sometimes</MenuItem>
                    <MenuItem value={"Frequently"}>Frequently</MenuItem>
                    <MenuItem value={"Always"}>Always</MenuItem>
                  </Select>
            
            </div>
            <div className={classes.adminForm3}>
            <h1 className={classes.adminLabel}>I am able to gauge people`s feelings through their body language and gestures</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.interpersonalSkills.gaugeFeelings}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        interpersonalSkills: {
                          ...value.interpersonalSkills,
                          gaugeFeelings: e.target.value,
                        },
                      })
                    }>
                    <MenuItem value={"Never"}>Never</MenuItem>
                    <MenuItem value={"Seldom"}>Seldom</MenuItem>
                    <MenuItem value={"Sometimes"}>Sometimes</MenuItem>
                    <MenuItem value={"Frequently"}>Frequently</MenuItem>
                    <MenuItem value={"Always"}>Always</MenuItem>
                  </Select>
            
            </div>
          </div>
          
          </div>
          {/* 4the part */}
          <div className={classes.adminForm1}>
          
            <div className={classes.adminForm2l}>
            <h1>Self Assessment</h1>
            <div className={classes.adminForm3}>
            <h1 className={classes.adminLabel}>I am always motivated to learn and grow in my career</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.selfAssessment.motivatedToLearn}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        selfAssessment: {
                          ...value.selfAssessment,
                          motivatedToLearn: e.target.value,
                        },
                      })
                    }>
                    <MenuItem value={"Never"}>Never</MenuItem>
                    <MenuItem value={"Seldom"}>Seldom</MenuItem>
                    <MenuItem value={"Sometimes"}>Sometimes</MenuItem>
                    <MenuItem value={"Frequently"}>Frequently</MenuItem>
                    <MenuItem value={"Always"}>Always</MenuItem>
                  </Select>
            
            </div>
            <div className={classes.adminForm3}>
            <h1 className={classes.adminLabel}>I use my strengths to the best of my ability</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.selfAssessment.useStrengths}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        selfAssessment: {
                          ...value.selfAssessment,
                          useStrengths: e.target.value,
                        },
                      })
                    }>
                    <MenuItem value={"Never"}>Never</MenuItem>
                    <MenuItem value={"Seldom"}>Seldom</MenuItem>
                    <MenuItem value={"Sometimes"}>Sometimes</MenuItem>
                    <MenuItem value={"Frequently"}>Frequently</MenuItem>
                    <MenuItem value={"Always"}>Always</MenuItem>
                  </Select>
            
            </div>
            <div className={classes.adminForm3}>
            <h1 className={classes.adminLabel}>I am a confident person</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.selfAssessment.confidentPerson}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        selfAssessment: {
                          ...value.selfAssessment,
                          confidentPerson: e.target.value,
                        },
                      })
                    }>
                    <MenuItem value={"Never"}>Never</MenuItem>
                    <MenuItem value={"Seldom"}>Seldom</MenuItem>
                    <MenuItem value={"Sometimes"}>Sometimes</MenuItem>
                    <MenuItem value={"Frequently"}>Frequently</MenuItem>
                    <MenuItem value={"Always"}>Always</MenuItem>
                  </Select>
            
            </div>
           
          </div>
          
          </div>
          {/* 5th part */}
          <div className={classes.adminForm1}>
          
            <div className={classes.adminForm2l}>
            <h1>Time and Stress Management</h1>
            <div className={classes.adminForm3}>
            <h1 className={classes.adminLabel}>I put too much pressure on myself because of exams and assignments</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.timeStressManagement.pressureExamsAssignments}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        timeStressManagement: {
                          ...value.timeStressManagement,
                          pressureExamsAssignments: e.target.value,
                        },
                      })
                    }>
                    <MenuItem value={"Never"}>Never</MenuItem>
                    <MenuItem value={"Seldom"}>Seldom</MenuItem>
                    <MenuItem value={"Sometimes"}>Sometimes</MenuItem>
                    <MenuItem value={"Frequently"}>Frequently</MenuItem>
                    <MenuItem value={"Always"}>Always</MenuItem>
                  </Select>
            
            </div>
            <div className={classes.adminForm3}>
            <h1 className={classes.adminLabel}>I feel anxious when working under pressure</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.timeStressManagement.anxietyUnderPressure}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        timeStressManagement: {
                          ...value.timeStressManagement,
                          anxietyUnderPressure: e.target.value,
                        },
                      })
                    }>
                    <MenuItem value={"Never"}>Never</MenuItem>
                    <MenuItem value={"Seldom"}>Seldom</MenuItem>
                    <MenuItem value={"Sometimes"}>Sometimes</MenuItem>
                    <MenuItem value={"Frequently"}>Frequently</MenuItem>
                    <MenuItem value={"Always"}>Always</MenuItem>
                  </Select>
            
            </div>
            <div className={classes.adminForm3}>
            <h1 className={classes.adminLabel}>I struggle to complete my to-do tasks and priorities for a day</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.timeStressManagement.struggleToCompleteTasks}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        timeStressManagement: {
                          ...value.timeStressManagement,
                          struggleToCompleteTasks: e.target.value,
                        },
                      })
                    }>
                    <MenuItem value={"Never"}>Never</MenuItem>
                    <MenuItem value={"Seldom"}>Seldom</MenuItem>
                    <MenuItem value={"Sometimes"}>Sometimes</MenuItem>
                    <MenuItem value={"Frequently"}>Frequently</MenuItem>
                    <MenuItem value={"Always"}>Always</MenuItem>
                  </Select>
            
            </div>
            <div className={classes.adminForm3}>
            <h1 className={classes.adminLabel}>I can complete tasks and meet deadlines on time</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.timeStressManagement.meetDeadlines}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        timeStressManagement: {
                          ...value.timeStressManagement,
                          meetDeadlines: e.target.value,
                        },
                      })
                    }>
                    <MenuItem value={"Never"}>Never</MenuItem>
                    <MenuItem value={"Seldom"}>Seldom</MenuItem>
                    <MenuItem value={"Sometimes"}>Sometimes</MenuItem>
                    <MenuItem value={"Frequently"}>Frequently</MenuItem>
                    <MenuItem value={"Always"}>Always</MenuItem>
                  </Select>
            
            </div>
            <div className={classes.adminForm3}>
            <h1 className={classes.adminLabel}>I feel uncomfortable asking for help when I am overworked or stressed
</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.timeStressManagement.uncomfortableAskingForHelp}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        timeStressManagement: {
                          ...value.timeStressManagement,
                          uncomfortableAskingForHelp: e.target.value,
                        },
                      })
                    }>
                    <MenuItem value={"Never"}>Never</MenuItem>
                    <MenuItem value={"Seldom"}>Seldom</MenuItem>
                    <MenuItem value={"Sometimes"}>Sometimes</MenuItem>
                    <MenuItem value={"Frequently"}>Frequently</MenuItem>
                    <MenuItem value={"Always"}>Always</MenuItem>
                  </Select>
            
            </div>
          </div>
          {/* 6th [part] */}
          </div>
          <div className={classes.adminForm1}>
          
            <div className={classes.adminForm2l}>
            <h1>Etiquette</h1>
            <div className={classes.adminForm3}>
            <h1 className={classes.adminLabel}>I avoid asking questions in a discussion, even if I have any in my mind, as it may sound inappropriate.</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.etiquette.avoidAskingQuestions}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        etiquette: {
                          ...value.etiquette,
                          avoidAskingQuestions: e.target.value,
                        },
                      })
                    }>
                    <MenuItem value={"Never"}>Never</MenuItem>
                    <MenuItem value={"Seldom"}>Seldom</MenuItem>
                    <MenuItem value={"Sometimes"}>Sometimes</MenuItem>
                    <MenuItem value={"Frequently"}>Frequently</MenuItem>
                    <MenuItem value={"Always"}>Always</MenuItem>
                  </Select>
            
            </div>
            <div className={classes.adminForm3}>
            <h1 className={classes.adminLabel}>I feel comfortable in a meeting if I have read related documents and agenda of the discussion</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.etiquette.comfortableInMeeting}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        etiquette: {
                          ...value.etiquette,
                          comfortableInMeeting: e.target.value,
                        },
                      })
                    }>
                    <MenuItem value={"Never"}>Never</MenuItem>
                    <MenuItem value={"Seldom"}>Seldom</MenuItem>
                    <MenuItem value={"Sometimes"}>Sometimes</MenuItem>
                    <MenuItem value={"Frequently"}>Frequently</MenuItem>
                    <MenuItem value={"Always"}>Always</MenuItem>
                  </Select>
            
            </div>
            <div className={classes.adminForm3}>
            <h1 className={classes.adminLabel}>I pay attention to look and present myself professionally in a formal setup</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.etiquette.professionalAppearance}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        etiquette: {
                          ...value.etiquette,
                          professionalAppearance: e.target.value,
                        },
                      })
                    }>
                    <MenuItem value={"Never"}>Never</MenuItem>
                    <MenuItem value={"Seldom"}>Seldom</MenuItem>
                    <MenuItem value={"Sometimes"}>Sometimes</MenuItem>
                    <MenuItem value={"Frequently"}>Frequently</MenuItem>
                    <MenuItem value={"Always"}>Always</MenuItem>
                  </Select>
            
            </div>
            <div className={classes.adminForm3}>
            <h1 className={classes.adminLabel}>I make sure to greet and introduce myself to people I meet for the first time</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.etiquette.greetAndIntroduce}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        etiquette: {
                          ...value.etiquette,
                          greetAndIntroduce: e.target.value,
                        },
                      })
                    }>
                    <MenuItem value={"Never"}>Never</MenuItem>
                    <MenuItem value={"Seldom"}>Seldom</MenuItem>
                    <MenuItem value={"Sometimes"}>Sometimes</MenuItem>
                    <MenuItem value={"Frequently"}>Frequently</MenuItem>
                    <MenuItem value={"Always"}>Always</MenuItem>
                  </Select>
            
            </div>
            <div className={classes.adminForm3}>
            <h1 className={classes.adminLabel}>I am punctual and dedicated when it comes to professional or academic tasks such as assignments, projects etc.</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.etiquette.punctualAndDedicated}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        etiquette: {
                          ...value.etiquette,
                          punctualAndDedicated: e.target.value,
                        },
                      })
                    }>
                    <MenuItem value={"Never"}>Never</MenuItem>
                    <MenuItem value={"Seldom"}>Seldom</MenuItem>
                    <MenuItem value={"Sometimes"}>Sometimes</MenuItem>
                    <MenuItem value={"Frequently"}>Frequently</MenuItem>
                    <MenuItem value={"Always"}>Always</MenuItem>
                  </Select>
            
            </div>
          </div>
          
          </div>
          <div className={classes.adminFormButton}>
              <button className={classes.adminFormSubmitButton} type="submit">
                Submit
              </button>
              <button
                onClick={() => {
                  setValue({
                    communicationSkills: {
                      onlineCommunication: "",
                      questioningOpinions: "",
                      thinkingWhileListening: "",
                      expressInWriting: "",
                      difficultyWithStrangers: "",
                    },
                    problemSolving: {
                      determineRealIssue: "",
                      struggleWithComplexProblems: "",
                      differentPerspective: "",
                      determinedDecision: "",
                      preferOwnDecisions: "",
                    },
                    interpersonalSkills: {
                      confidentExpressingOpinions: "",
                      attentiveToBodyLanguage: "",
                      discomfortWithDisagreement: "",
                      respondToFeedback: "",
                      gaugeFeelings: "",
                    },
                    selfAssessment: {
                      motivatedToLearn: "",
                      useStrengths: "",
                      confidentPerson: "",
                    },
                    timeStressManagement: {
                      pressureExamsAssignments: "",
                      anxietyUnderPressure: "",
                      struggleToCompleteTasks: "",
                      meetDeadlines: "",
                      uncomfortableAskingForHelp: "",
                    },
                    etiquette: {
                      avoidAskingQuestions: "",
                      comfortableInMeeting: "",
                      professionalAppearance: "",
                      greetAndIntroduce: "",
                      punctualAndDedicated: "",
                    },
                  });
                  setError({});
                }}
                className={classes.adminFormClearButton}
                type="button">
                Clear
              </button>
            </div>
            <div ref={errorRef} className={classes.loadingAndError}>
              {loading && (
                <Spinner
                  message="Survey Submitted"
                  height={30}
                  width={150}
                  color="#111111"
                  messageColor="blue"
                />
              )}
              {(error.emailError || error.backendError) && (
                <p className="text-red-500">
                  {error.emailError || error.backendError}
                </p>
              )}
            </div>
          </form>
        </div>
        
      </div>

  );
};

export default Body;
