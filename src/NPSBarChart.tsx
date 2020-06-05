import React, { Component } from "react";
import { NPSEntry, Bucket } from "./NPSHelpers";
import { HorizontalBar, Bar } from "react-chartjs-2";
import { green, grey, red, blue } from "@material-ui/core/colors";

interface Props {
  allNPS: NPSEntry[] | null;
}

class NPSBarChart extends Component<Props, {}> {
  handleBarChartData() {
    if (!this.props.allNPS) return [{}];
    let numPromoters = 0;
    let numPassives = 0;
    let numDetractors = 0;

    for (let entry of this.props.allNPS) {
      if (entry.bucket === "Promoter") {
        numPromoters++;
      } else if (entry.bucket === "Passive") {
        numPassives++;
      } else numDetractors++;
    }
    console.log(numPromoters + " " + numPassives + " " + numDetractors);

    // const dataObj = [
    //   { name: "Promoters", numUsers: numPromoters },
    //   { name: "Passives", numUsers: numPassives },
    //   { name: "Detractors", numUsers: numDetractors },
    // ];

    // const data = {
    //   labels: ["Promoters", "Passives", "Detractors"],
    //   datasets: [
    //     {
    //       label: "NPS Scores",
    //       fill: false,
    //       backgroundColor: "rgba(75,192,192,0.4)",
    //       borderColor: "rgba(75,192,192,1)",
    //       pointBorderColor: "rgba(75,192,192,1)",
    //       pointBackgroundColor: "#fff",
    //       pointBorderWidth: 1,
    //       pointHoverRadius: 5,
    //       pointHoverBackgroundColor: "rgba(75,192,192,1)",
    //       pointHoverBorderColor: "rgba(220,220,220,1)",
    //       pointHoverBorderWidth: 2,
    //       pointRadius: 1,
    //       pointHitRadius: 10,
    //       data: [numPromoters, numPassives, numDetractors],
    //     },
    //   ],
    // };

    const data = {
      labels: ["Number of Users"],
      datasets: [
        {
          label: "Promoters",
          backgroundColor: green[400],
          //   hoverBackgroundColor: "rgba(46,185,235,1)",
          data: [numPromoters],
        },
        {
          label: "Passives",
          backgroundColor: blue[300],
          //   hoverBackgroundColor: "rgba(46,185,235,1)",
          data: [numPassives],
        },
        {
          label: "Detractors",
          backgroundColor: red[400],
          //   hoverBackgroundColor: "rgba(46,185,235,1)",
          data: [numDetractors],
        },
      ],
    };

    return data;
  }

  barClickHandler = () => {
    console.log("bar clicked");
  };

  render() {
    const options = {
      onClick: this.barClickHandler,
      tooltips: {
        displayColors: true,
        // callbacks: {
        //   mode: "x",
        // },
      },
      //   scales: {
      //     xAxes: [
      //       {
      //         stacked: true,
      //         gridLines: {
      //           display: false,
      //         },
      //       },
      //     ],
      //     yAxes: [
      //       {
      //         stacked: true,
      //         ticks: {
      //           beginAtZero: true,
      //         },
      //         type: "linear",
      //       },
      //     ],
      //   },
      scales: {
        xAxes: [
          {
            ticks: {
              beginAtZero: true,
              fontFamily: "'Open Sans Bold', sans-serif",
              fontSize: 11,
            },
            scaleLabel: {
              display: false,
            },
            gridLines: {},
            stacked: true,
          },
        ],
        yAxes: [
          {
            gridLines: {
              display: false,
              color: "#fff",
              zeroLineColor: "#fff",
              zeroLineWidth: 0,
            },
            ticks: {
              fontFamily: "'Open Sans Bold', sans-serif",
              fontSize: 11,
            },
            stacked: true,
          },
        ],
      },
    };

    return (
      <div className="NPSBarChart">
        {this.props.allNPS ? (
          <HorizontalBar
            data={this.handleBarChartData()}
            width={100}
            height={16}
            options={options}
            getElementAtEvent={(e) => console.log(e)}
          />
        ) : null}
      </div>
    );
  }
}

export default NPSBarChart;
