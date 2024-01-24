import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useSelector } from "react-redux";

const Barchart = () => {
  const chartRef = useRef(null);
  const chartRef2 = useRef(null);

  const res = useSelector((state) => state.student.survey.surveyData);
  const it = res?.communicationSkills || {};
  const it1 = res?.problemSolving || {};
  const it2 = res?.interpersonalSkills || {};
  const it3 = res?.selfAssessment || {};
  const it4 = res?.timeStressManagement || {};
  const it5 = res?.etiquette || {};
  const it6 = res?.technicalSkills || {};

  let commval = 0;
  let probsol = 0;
  let intperval = 0;
  let selfval = 0;
  let timval = 0;
  let etqval = 0;

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

  valuesArray.push(processSkills(it, commval));
  valuesArray.push(processSkills(it1, probsol));
  valuesArray.push(processSkills(it2, intperval));
  valuesArray.push(processSkills(it3, selfval));
  valuesArray.push(processSkills(it4, timval));
  valuesArray.push(processSkills(it5, etqval));

  let techvallang = 0;
  let techvalcoresub = 0;
  let techvaldatabase = 0;
  let techvalweb = 0;
  let techvalextra = 0;

  const processtechSkills = (skillObject) => {
    for (let key in skillObject) {
      if (["java", "javascript", "python", "cpp"].includes(key) && skillObject[key]) {
        techvallang = techvallang + 1;
      }
      if (["os", "db", "cn", "ai", "IOT", "ml"].includes(key) && skillObject[key]) {
        techvalcoresub = techvalcoresub + 1;
      }
      if (["mongodb", "spring", "sql", "django"].includes(key) && skillObject[key]) {
        techvaldatabase = techvaldatabase + 1;
      }
      if (["react", "html", "css", "javascript", "nodejs"].includes(key) && skillObject[key]) {
        techvalweb = techvalweb + 1;
      }
      if (["git", "blockchain", "cybersecurity", "c", "c++"].includes(key) && skillObject[key]) {
        techvalextra = techvalextra + 1;
      }
    }
  };
  

  processtechSkills(it6);

  useEffect(() => {
    if (!chartRef.current || !chartRef2.current) return;
    const ctx = chartRef.current.getContext('2d');
    const ctx2 = chartRef2.current.getContext('2d');

    // Destroy existing charts before creating new ones
    if (window.myChart) {
      window.myChart.destroy();
    }
    if (window.myChart2) {
      window.myChart2.destroy();
    }

    // Create new charts
    window.myChart = new Chart(ctx, {
      type: 'doughnut',
      options: {
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          }
        },
      },
      data: {
        labels: ['CommunicationSkills', 'ProblemSolving', 'InterpersonalSkills', 'SelfAssessment', 'Etiquette', 'TimeStressMangement'],
        datasets: [{
          label: 'Soft Skill Data',
          data: valuesArray,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(255, 205, 86, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 3,
        }],
      },
    });

    window.myChart2 = new Chart(ctx2, {
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
        labels: ['Language', 'Core', 'Database', 'Web', 'Extra'],
        datasets: [
          {
            label: 'Technical skill',
            data: [techvallang, techvalcoresub, techvaldatabase, techvalweb, techvalextra],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(255, 205, 86, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(75, 205, 192, 1)',
            ],
            borderWidth: 3,
          },
        ],
      },
    });

  }, [res]);

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
