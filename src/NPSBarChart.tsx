import React, { Component } from "react";
import { NPSEntry, Bucket } from "./NPSHelpers";
import { HorizontalBar } from "react-chartjs-2";
import { green, red, blue } from "@material-ui/core/colors";

interface Props {
  allNPS: NPSEntry[] | null;
  tagBucketHandler: (bucket: Bucket, tag: string | null) => void;
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

  barClickHandler = (event: any) => {
    if (event) {
      const buckets: Bucket[] = ["Promoter", "Passive", "Detractor"];
      this.props.tagBucketHandler(buckets[event._datasetIndex], null);
    }
  };

  render() {
    const options = {
      onClick: this.barClickHandler,
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
            data={this.handleBarChartData()}
            width={100}
            height={13}
            options={options}
            getElementAtEvent={(e) => this.barClickHandler(e[0])}
          />
        ) : null}
      </div>
    );
  }
}

export default NPSBarChart;
