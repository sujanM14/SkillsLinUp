import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { useDispatch, useSelector } from 'react-redux';

const Barchart = () => {
  const chartRef = useRef(null);
  const chartRef2 = useRef(null);
  const dispatch = useDispatch();
  const surveyData = useSelector((state) => state.student.survey.surveyData);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  //console.log(user.result.marks);
  const varb = [];
 // varb = user.result.marks;
  const res = useSelector((state) => state.student.survey.surveyData);
  const [commval, probsol, intperval, selfval, timval, etqval] = Array(6).fill(0);
  const it = res || {};
  const it1 = it?.communicationSkills || {};
  const it2 = it?.problemSolving || {};
  const it3 = it?.interpersonalSkills || {};
  const it4 = it?.selfAssessment || {};
  const it5 = it?.timeStressManagement || {};
  const it6 = it?.etiquette || {};

  const processSkills = (skillObject, valueMultiplier) => {
    for (let key in skillObject) {
      switch (skillObject[key]) {
        case 'Seldom':
          valueMultiplier += 2;
          break;
        case 'Sometimes':
          valueMultiplier += 3;
          break;
        case 'Frequently':
          valueMultiplier += 4;
          break;
        case 'Always':
          valueMultiplier += 5;
          break;
        case 'Never':
          valueMultiplier += 1;
          break;
        default:
          valueMultiplier += 0;
      }
    }
    return valueMultiplier;
  };

  const valuesArray = [
    processSkills(it1, commval),
    processSkills(it2, probsol),
    processSkills(it3, intperval),
    processSkills(it4, selfval),
    processSkills(it5, timval),
    processSkills(it6, etqval),
  ];

  const techval = Object.values(it?.technicalSkills || {}).filter((value) => value).length;
  valuesArray.push(techval);

  function calculateSum(valuesArray) {
    return valuesArray.reduce((acc, currentValue) => acc + currentValue, 0);
  }

  const sum = calculateSum(valuesArray);

  useEffect(() => {
    if (!chartRef.current || !surveyData || !user) return;
    if (!chartRef2.current || !surveyData || !user) return;

    const ctx = chartRef.current.getContext('2d');
    const ctx2 = chartRef2.current.getContext('2d');
    Chart.getChart(ctx)?.destroy();
  Chart.getChart(ctx2)?.destroy();

    new Chart(ctx, {
      type: 'radar',
      options: {
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          },
        },
      },
      data: {
        labels: ['CommunicationSkills', 'ProblemSolving', 'InterpersonalSkills', 'SelfAssessment', 'Etiquette', 'TimeStressMangement', 'TechnicalSkills'],
        datasets: [
          {
            data: valuesArray,
            label: 'SoftSkill Data',
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 0, 255, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(255, 205, 86, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 0, 255, 1)',
            ],
            borderWidth: 3,
          },
        ],
      },
    });
    new Chart(ctx2, {
      type: 'line',
      options: {
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          },
        },
      },
      data: {
        labels: ['OS','DB','CN','DM'],
      
        datasets: [
          
          {
            label: 'Acdemic Data',
            data: user.result.marks.map((mark) => parseInt(mark)),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(255, 205, 86, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 159, 64, 1)',
             
            ],
            borderWidth: 3,
          },
          
        ],
        
      },
    });
  }, [surveyData, user]);

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1, marginRight: '10px' }}>
        <canvas ref={chartRef} width="400" height="200"></canvas>
      </div>
      <div style={{ flex: 1 }}>
        <canvas ref={chartRef2} width="400" height="200"></canvas>
      </div>
    </div>
  );
  
};

export default Barchart;
