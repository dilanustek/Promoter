import React, { Component } from "react";
import { NPSEntry, Bucket } from "./NPSHelpers";
import { HorizontalBar } from "react-chartjs-2";
import { green, red, blue } from "@material-ui/core/colors";

interface Props {
  allNPS: NPSEntry[];
  setTagAndMaybeBucket: (bucket: Bucket, tag: string | null) => void;
}

class NPSBarChart extends Component<Props, {}> {
  getBarChartData() {
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

    const data = {
      datasets: [
        {
          label: "Promoters",
          backgroundColor: green[400],
          data: [numPromoters],
        },
        {
          label: "Passives",
          backgroundColor: blue[200],
          data: [numPassives],
        },
        {
          label: "Detractors",
          backgroundColor: red[400],
          data: [numDetractors],
        },
      ],
    };

    return data;
  }

  onBarClick = (event: any) => {
    const buckets: Bucket[] = ["Promoter", "Passive", "Detractor"];
    if (event[0]) {
      this.props.setTagAndMaybeBucket(buckets[event[0]._datasetIndex], null);
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
        {this.props.allNPS ? (
          <HorizontalBar
            data={this.getBarChartData()}
            width={100}
            height={13}
            options={options}
            getElementAtEvent={this.onBarClick}
          />
        ) : null}
      </div>
    );
  }
}

export default NPSBarChart;
