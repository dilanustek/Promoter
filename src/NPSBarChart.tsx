import React, { Component } from "react";
import { NPSEntry, Bucket, scoreCounter } from "./NPSHelpers";
import { HorizontalBar } from "react-chartjs-2";
import { green, red, blue } from "@material-ui/core/colors";

interface Props {
  setBucket: (bucket: Bucket, tag: string | null) => void;
  scores: { numPromoters: number; numPassives: number; numDetractors: number };
}

class NPSBarChart extends Component<Props, {}> {
  getBarChartData() {
    const data = {
      datasets: [
        {
          label: "Promoters",
          backgroundColor: green[400],
          data: [this.props.scores.numPromoters],
        },
        {
          label: "Passives",
          backgroundColor: blue[200],
          data: [this.props.scores.numPassives],
        },
        {
          label: "Detractors",
          backgroundColor: red[400],
          data: [this.props.scores.numDetractors],
        },
      ],
    };

    return data;
  }

  onBarClick = (event: any) => {
    const buckets: Bucket[] = ["Promoter", "Passive", "Detractor"];
    if (event[0]) {
      this.props.setBucket(buckets[event[0]._datasetIndex], null);
    }
  };

  render() {
    const options = {
      animation: { duration: 1500 },
      tooltips: {
        displayColors: true,
        mode: "nearest",
        titleFontSize: 0,
      },
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
            stacked: true,
          },
        ],
      },
    };

    return (
      <div className="NPSBarChart">
        <HorizontalBar
          data={this.getBarChartData()}
          width={100}
          height={13}
          options={options}
          getElementAtEvent={this.onBarClick}
        />
      </div>
    );
  }
}

export default NPSBarChart;
