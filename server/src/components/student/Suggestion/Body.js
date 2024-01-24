import React, { useState } from "react";
import { useSelector } from "react-redux";
import * as classes from "../../../utils/styles";

const Body = () => {
  const testResult = useSelector((state) => state.student.testResult.result);
  const survey = useSelector((state) => state.student.survey.surveyData);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const Clubs_data = useSelector((state) => state.student.club_data);
  const user = JSON.parse(localStorage.getItem("user"));
console.log(user,testResult,survey,Clubs_data);
// 
const res = useSelector((state) => state.student.survey.surveyData);
  const it = res?.communicationSkills || {};
  const it1 = res?.problemSolving || {};
  const it2 = res?.interpersonalSkills || {};
  const it3 = res?.selfAssessment || {};
  const it4 = res?.timeStressManagement || {};
  const it5 = res?.etiquette || {};


  let commval = 0;
  let probsol = 0;
  let intperval = 0;
  let selfval = 0;
  let timval = 0;
  let etqval = 0;
  //let techval = 0;

  const processSkills = (skillObject, valueMultiplier) => {
    for (let key in skillObject) {
      switch (skillObject[key]) {
        case "Seldom":
          valueMultiplier = valueMultiplier + 2;
          break;
        case "Sometimes":
          valueMultiplier = valueMultiplier + 3;
          break;
        case "Frequently":
          valueMultiplier = valueMultiplier + 4;
          break;
        case "Always":
          valueMultiplier = valueMultiplier + 5;
          break;
        case "Never":
          valueMultiplier = valueMultiplier + 1;
          break;
        default:
          valueMultiplier = valueMultiplier + 0;
      }
    }
    return valueMultiplier;
  };

  const valuesArray = [];

  // Process each skill and push its value to the array
  valuesArray.push(processSkills(it, commval));
  valuesArray.push(processSkills(it1, probsol));
  valuesArray.push(processSkills(it2, intperval));
  valuesArray.push(processSkills(it3, selfval));
  valuesArray.push(processSkills(it4, timval));
  valuesArray.push(processSkills(it5, etqval));

console.log(valuesArray)

//
// club
var itx = Clubs_data?.clubAssessments || {};
  console.log("IT",it);
  console.log("club",it[0]);
  let varb = 0;
  var wlug=0;
  var gdsc=0;
  var rotract=0;
  var acm=0;
  var acses=0;
  var art_circle=0;
  var codechef=0;


const processSkills2 = (skillObject, valueMultiplier) => {
  for (let key = 0; key < skillObject.length; key++) {
    console.log(skillObject[key]);
    if(skillObject[key].club=="WLUG"){

    switch (skillObject[key].participationType) {
      case "volunteer":
         wlug = wlug + 2;
       continue;
      case "Winner":
        wlug = wlug + 3;
        continue;
      case "participate":
        wlug = wlug + 4;
        continue;
      case "firRunnnerUp":
        wlug = wlug + 5;
        continue;
      case "secRunnerUp":
        wlug = wlug + 1;
        continue;
      default:
        wlug = wlug + 0;
    }

  }
  if(skillObject[key].club=="GDSC"){
    //console.log(gdsc);
    switch (skillObject[key].participationType) {
      case "volunteer":
        gdsc = gdsc + 2;
        continue;
      case "Winner":
        gdsc = gdsc + 3;
        continue;
      case "participate":
        gdsc = gdsc + 4;
        continue;
      case "firRunnnerUp":
        gdsc = gdsc + 5;
        continue;
      case "secRunnerUp":
        gdsc = gdsc + 1;
        continue;
      default:
        gdsc = gdsc + 0;
    }
    
  }
  if(skillObject[key].club=="ACM"){

    switch (skillObject[key].participationType) {
      case "volunteer":
         acm = acm + 2;
        break;
      case "Winner":
        acm = acm + 3;
        break;
      case "participate":
        acm = acm + 4;
        break;
      case "firRunnnerUp":
        acm = acm + 5;
        break;
      case "secRunnerUp":
        acm = acm + 1;
        break;
      default:
        acm = acm + 0;
    }
    
  }
  if(skillObject[key].club=="Rotract"){

    switch (skillObject[key].participationType) {
      case "volunteer":
        rotract = rotract + 2;
        break;
      case "Winner":
        rotract = rotract + 3;
        break;
      case "participate":
        rotract = rotract + 4;
        break;
      case "firRunnnerUp":
        rotract = rotract + 5;
        break;
      case "secRunnerUp":
        rotract = rotract + 1;
        break;
      default:
        rotract = rotract + 0;
    }
    
  }
//    var acses=0;
//   var art_circle=0;
//   var codechef=0;
  if(skillObject[key].club=="ACSES"){
    //console.log(gdsc);
    switch (skillObject[key].participationType) {
      case "volunteer":
        acses = acses + 2;
        continue;
      case "Winner":
        acses = acses + 3;
        continue;
      case "participate":
        acses = acses + 4;
        continue;
      case "firRunnnerUp":
        acses = acses + 5;
        continue;
      case "secRunnerUp":
        acses = acses + 1;
        continue;
      default:
        acses = acses + 0;
    }
    
  }
  if(skillObject[key].club=="Art Circle"){
    //console.log(gdsc);
    switch (skillObject[key].participationType) {
      case "volunteer":
        art_circle = art_circle + 2;
        continue;
      case "Winner":
        art_circle = art_circle + 3;
        continue;
      case "participate":
        art_circle = art_circle + 4;
        continue;
      case "firRunnnerUp":
        art_circle = art_circle + 5;
        continue;
      case "secRunnerUp":
        art_circle = art_circle + 1;
        continue;
      default:
        art_circle = art_circle + 0;
    }
    
  }
  if(skillObject[key].club=="CodeChef"){
    //console.log(gdsc);
    switch (skillObject[key].participationType) {
      case "volunteer":
        codechef = codechef + 2;
        continue;
      case "Winner":
        codechef = codechef + 3;
        continue;
      case "participate":
        codechef = codechef + 4;
        continue;
      case "firRunnnerUp":
        codechef = codechef + 5;
        continue;
      case "secRunnerUp":
        codechef = codechef + 1;
        continue;
      default:
        codechef = codechef + 0;
    }
    
  }

  return valueMultiplier;
};
}
const valuestore =[]
valuestore.push(processSkills2(itx, varb));

console.log(gdsc);
console.log(acm);
console.log(wlug);
console.log(rotract);
// 
  const handleSuggestionClick = () => {
    const newSuggestions = [];

   if(user.result.year==1){
   if(survey.technicalSkills.c){
        newSuggestions.push("Start pracing concepts in c");
        if(survey.technicalSkills.html ){
            if(survey.technicalSkills.css){
                if(survey.technicalSkills.javscipt){
                    newSuggestions.push("Start improving you javascript concepts and try to make few clones of websites from youtube tutorials");

                }else{
                    newSuggestions.push("As you have completed html and css start practising it and start learning some basic concept of javascipt");
                }
            }else{
                newSuggestions.push("Start working on css along practicing html");
            }
        }else{
            newSuggestions.push("Start leaning concepts of html and css");
        }
    }else{
        newSuggestions.push("If you haven't learned any programming language yet, consider starting with C for a solid foundation. If you aspire to pursue a career in data science, data analysis, or machine learning, Python is an excellent choice. For those aiming for positions in product-based companies, learning C++ or Java, with Java being the preferable option, would be highly beneficial.");
    }
   }else if(user.result.year==2 || user.result.year==3 || user.result.year==4){
    if(survey.technicalSkills.c || survey.technicalSkills.cpp || survey.technicalSkills.java || survey.technicalSkills.python ){
        newSuggestions.push("Keep practicing DSA questions and starting coding on websites like codechef,hackerrank,etc All the best Buddy !!! with your preferable language");
        if(survey.technicalSkills.html ){
            if(survey.technicalSkills.css){
                if(survey.technicalSkills.javscipt){
                    newSuggestions.push("Start improving you javascript concepts and try making own websites or portfolio from youtube tutorials");
                    if(survey.technicalSkills.react){
                        if(survey.technicalSkills.nodejs || survey.technicalSkills.django){
                            newSuggestions.push("Keep practicing !! You are on right track keep practicing and makeing new website ");  
                            newSuggestions.push("Dont forget to update linkedin"); 
                        if(survey.technicalSkills.mongodb || survey.technicalSkills.sql ){
                            newSuggestions.push("Practice database !!");
                            if(survey.technicalSkills.ai){
                                if(survey.technicalSkills.blockchain){
                                    newSuggestions.push("Just practice all the concepts you have learned so far and dont forget to update your resume and linkedin!! Best Luck!!");
                                }else{
                                    newSuggestions.push("Given your strong grasp of technical concepts so far, it would be beneficial to start putting that knowledge into practice through coding exercises or projects. Additionally, if you're looking for a new and exciting challenge, consider delving into blockchain technology—it's a fascinating field with great potential for learning and innovation.");
                                    
                                }
                            }else{
                                newSuggestions.push("With your solid understanding of technical concepts, it's an excellent time to put your knowledge into practice through coding exercises or real-world projects. Moreover, if you're interested in pushing the boundaries of technology and exploring the realms of artificial intelligence (AI), it could be a rewarding and intellectually stimulating path to consider. AI opens up exciting opportunities for problem-solving and innovation in various domains.");
                                
                            } 
                        } else{
                            newSuggestions.push("Start leaning one of the database ");
                        }
                        }else{
                            newSuggestions.push("Good going!! Practice and practice buddy!! And if you feel confident go for any backend framework like node.js or django");  

                        }
                    }

                }else{
                    newSuggestions.push("As you have completed html and css start practising it and start learning some basic concept of javascipt");
                }
            }else{
                newSuggestions.push("Start working on css along practicing html");
            }
        }else{
            newSuggestions.push("Start leaning concepts of html and css");
        }
        newSuggestions.push("Practice all the core concepts like OS,DBMS,CN and working of internet");
    }
   }else{
    newSuggestions.push("If you haven't learned any programming language yet, consider starting with C for a solid foundation. If you aspire to pursue a career in data science, data analysis, or machine learning, Python is an excellent choice. For those aiming for positions in product-based companies, learning C++ or Java, with Java being the preferable option, would be highly beneficial.");
}

// softskills
if(valuesArray[0] < 15){
    newSuggestions.push("Improve your Commmunciation skills!!Engage in regular conversations with diverse individuals to enhance your verbal communication and listening skills. Practice written communication through activities like journaling or blogging to refine your clarity and articulation in written expression.");
}
if(valuesArray[1]<15){
    newSuggestions.push("Improve your Problem Solving Skills.hallenge yourself with puzzles and logical games to develop critical thinking and problem-solving abilities.Break down complex problems into smaller components, systematically analyzing and solving each part to enhance overall problem-solving skills!!");
}
if(valuesArray[2]<15){
    newSuggestions.push(" Improve your Interpersonal Skills.Actively listen and respond empathetically to others, fostering stronger connections and understanding in interpersonal interactions.Seek opportunities for collaboration, teamwork, and effective communication to enhance interpersonal skills in diverse social settings.");
}
if(valuesArray[3]>=15){
    newSuggestions.push("Improve time and Stress Management.Prioritize tasks and create a daily schedule to allocate time efficiently, reducing overwhelm and promoting better time management.Practice mindfulness techniques, such as deep breathing or short breaks, to maintain focus and alleviate stress, fostering a more balanced approach to time management.");
}
if(valuesArray[4]<15){
    newSuggestions.push("Improve your etiquette  Skills.Practice active listening by giving your full attention to others and responding thoughtfully, showing genuine interest in their perspectives.Cultivate empathy and politeness by considering the feelings and needs of others, expressing gratitude, and using courteous language in your interactions.")
}

// clubs participation
//  newSuggestions.push("");
if(art_circle==0 && rotract==0 && gdsc==0 && codechef==0 && acm==0 && acses==0 && wlug==0){
    newSuggestions.push("Clubs are more important.Particpate in different clubs or participate in other events as much as you can to improve your technical and skills!!");
}
   else if(art_circle==0 && rotract==0){
    newSuggestions.push("Participate in non-technical events more!!");
   }
   else if(gdsc==0 && codechef==0 && acm==0 && acses==0 && wlug==0){
    newSuggestions.push("Participate in non-technical events more!!");
   }
   

    setSuggestions(newSuggestions);
    setShowSuggestions(true);
    setSuggestionIndex(0);
  };

  const handleMoreClick = () => {
    // Increment the suggestion index to display the next suggestion
    setSuggestionIndex((prevIndex) => (prevIndex + 1) % suggestions.length);
};


  const handleClearClick = () => {
    setSuggestions([]);
    setShowSuggestions(false);
    setSuggestionIndex(0); // Reset the suggestion index on clear
  };
  return (
    <div className="flex-[0.8] mt-3">
      <div className="space-y-5">
        <div className="flex text-gray-400 items-center space-x-2">
          <h1>Get some suggestion here</h1>
        </div>
        <div className="w-[98%] bg-white relative rounded-xl  ">
          <div className="overflow-y-scroll h-[27rem]">
            <div className="flex py-10 ml-10 space-x-40 ">
              <div className="flex flex-col space-y-10">
                <div className={classes.adminFormButton}>
                  <button
                    className={classes.adminFormSubmitButton}
                    type="button"
                    onClick={handleSuggestionClick}
                  >
                    Suggest
                  </button>
                  <button
                    className={classes.adminFormClearButton}
                    type="button"
                    onClick={handleClearClick}
                  >
                    Clear
                  </button>
                </div>

                <div >
                  {showSuggestions &&
                    suggestions.map((suggestion, index) => (
                      <p key={index} style={{ display: index === suggestionIndex ? "block" : "none" }
                      }
                      className={"text-base font-semibold bg-gray-600 shadow-xl text-white px-2 py-1 rounded-sm mb-4"}>
                        {suggestion}
                      </p>
                    ))}
                  {suggestions.length > 1 && suggestionIndex < suggestions.length - 1 && (
                    <button
                      className={classes.adminFormClearButton}
                      type="button"
                      onClick={handleMoreClick}
                    >
                      More
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
