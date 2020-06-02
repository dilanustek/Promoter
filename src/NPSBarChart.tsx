import React, { Component } from "react";
import { NPSEntry, Bucket } from "./NPSHelpers";

interface Props {
  allNPS: NPSEntry[] | null;
}

class NPSBarChart extends Component<Props, {}> {
  handleBarChartData() {
    if (!this.props.allNPS) return null;
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
    return [numPromoters, numPassives, numDetractors];
  }

  render() {
    return <div className="NPSBarChart">{this.handleBarChartData()}</div>;
  }
}

export default NPSBarChart;
