import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useSelector } from 'react-redux';

const Barchart = () => {
  const chartRef = useRef(null);
  const Clubs_data = useSelector((state) => state.student.club_data);
  console.log("154");
  console.log("clubassesment",Clubs_data.clubAssessments);

  var it = Clubs_data?.clubAssessments || {};
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


const processSkills = (skillObject, valueMultiplier) => {
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
valuestore.push(processSkills(it, varb));

console.log(gdsc);
console.log(acm);
console.log(wlug);
console.log(rotract);
 //console.log(x);
  useEffect(() => {
    if (chartRef.current && Clubs_data) {
      const ctx = chartRef.current.getContext('2d');

      // Extracting club names and values from the data
     
      Chart.getChart(ctx)?.destroy();
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ["GDSC","ACM","WLUG","ROTRACT","ACSES","Art Circle","CodeChef"],
          datasets: [{
            label: 'Club Data',
            data: [gdsc,acm,wlug,rotract,acses,art_circle,codechef],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
            ],
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
    }
  }, []);

  return (
    <div className='flex flex-row'>
      <div style={{ width: '1000px', height: '500px' }}>
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default Barchart;
