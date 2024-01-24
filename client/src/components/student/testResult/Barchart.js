import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { useSelector } from "react-redux";

const Barchart = ({ chartData }) => {
  const chartRef = useRef(null);
  const chartRef1 = useRef(null);
  const chartRef2 = useRef(null);
  const chartRef3 = useRef(null);

  const testResult = useSelector((state) => state.student.testResult.result);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext('2d');

    const barColors = ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(255, 205, 86, 0.6)', 'rgba(54, 162, 235, 0.6)'];
    const labelColors = ['#FF5733', '#33FF57', '#5733FF', '#FF5733'];

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Computer & Networking Essential', 'Communication & Generic Skills', 'Engineering Skills-1', 'Engineering Mathematics-1'],
        datasets: [{
          label: 'Academic Data 1st Year',
          data: user.result.marks4.map((mark) => parseInt(mark)),
          backgroundColor: barColors,
          borderColor: barColors.map(color => color.replace('0.6', '1')),
          borderWidth: 1,
        }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, [chartData]);

  useEffect(() => {
    if (!chartRef1.current) return;

    const ctx1 = chartRef1.current.getContext('2d');

    const hardcodedBarColors = ['rgba(255, 99, 132, 0.6)', 'rgba(75, 192, 192, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 205, 86, 0.6)'];
    const labelColors1 = ['#33FF57', '#5733FF', '#FF5733', '#33FF57'];

    new Chart(ctx1, {
      type: 'bar',
      data: {
        labels: ['Data Structure and Algorithm', 'Formal Language and Automata Theory', 'Computer Networks', 'Operating System'],
        datasets: [{
          label: 'Academic Data 2nd Year',
          data: user.result.marks.map((mark) => parseInt(mark)),
          backgroundColor: hardcodedBarColors,
          borderColor: hardcodedBarColors.map(color => color.replace('0.6', '1')),
          borderWidth: 1,
        }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, []);

  useEffect(() => {
    if (!chartRef2.current) return;

    const ctx2 = chartRef2.current.getContext('2d');

    const hardcodedBarColors = ['rgba(255, 99, 132, 0.6)', 'rgba(75, 192, 192, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 205, 86, 0.6)'];
    const labelColors2 = ['#5733FF', '#FF5733', '#33FF57', '#5733FF'];

    new Chart(ctx2, {
      type: 'bar',
      data: {
        labels: ['Artificial Intelligence', 'Compiler Design', 'Design and Analysis Of Algorithm', 'Machine Learning'],
        datasets: [{
          label: 'Academic Data 3rd Year',
          data: user.result.marks2.map((mark) => parseInt(mark)),
          backgroundColor: hardcodedBarColors,
          borderColor: hardcodedBarColors.map(color => color.replace('0.6', '1')),
          borderWidth: 1,
        }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, []);

  useEffect(() => {
    if (!chartRef3.current) return;

    const ctx3 = chartRef3.current.getContext('2d');

    const hardcodedBarColors = ['rgba(255, 99, 132, 0.6)', 'rgba(75, 192, 192, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 205, 86, 0.6)'];
    const labelColors3 = ['#FF5733', '#33FF57', '#5733FF', '#FF5733'];

    new Chart(ctx3, {
      type: 'bar',
      data: {
        labels: ['Techno-Socio Activity', 'Cryptography and Network Security', 'Humanities 3-Project Management', 'High Performance Computing'],
        datasets: [{
          label: 'Academic Data 4th Year',
          data: user.result.marks3.map((mark) => parseInt(mark)),
          backgroundColor: hardcodedBarColors,
          borderColor: hardcodedBarColors.map(color => color.replace('0.6', '1')),
          borderWidth: 1,
        }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, []);

  return (
    <div className="chart-container">
      <h1>Academic Performance First Year</h1>
      <canvas height={120} ref={chartRef}></canvas>
      <h1>Academic Performance Second Year</h1>
      <canvas height={120} ref={chartRef1}></canvas>
      <h1>Academic Performance Third Year</h1>
      <canvas height={120} ref={chartRef2}></canvas>
      <h1>Academic Performance Fourth Year</h1>
      <canvas height={120} ref={chartRef3}></canvas>

      <style jsx>{`
        .chart-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 20px;
        }

        canvas {
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
};

export default Barchart;
