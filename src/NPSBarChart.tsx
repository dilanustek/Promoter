import React, { Component } from "react";
import { NPSEntry, Bucket } from "./NPSHelpers";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

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

    const dataObj = [
      { name: "Promoters", numUsers: numPromoters },
      { name: "Passives", numUsers: numPassives },
      { name: "Detractors", numUsers: numDetractors },
    ];
    return dataObj;
  }

  render() {
    return (
      <div className="NPSBarChart">
        {this.props.allNPS ? (
          <BarChart
            width={500}
            height={200}
            data={this.handleBarChartData()}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            // layout="vertical"
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="numUsers" fill="#8884d8" />
          </BarChart>
        ) : null}
      </div>
    );
  }
}

export default NPSBarChart;
