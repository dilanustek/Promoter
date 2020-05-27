import React, { Component } from "react";
import NPSEntry from "./NPSHelpers";

interface Props {
  allNPS: NPSEntry[] | null;
}

class Score extends Component<Props, {}> {
  scoreCalculator() {
    const allNPS = this.props.allNPS;

    if (allNPS) {
      // let sumNPS = 0;
      let numPromoters = 0;
      let numDetractors = 0;
      for (let i = 0; i < allNPS.length; i++) {
        if (allNPS[i].bucket === "Promoter") {
          numPromoters++;
        } else if (allNPS[i].bucket === "Detractor") {
          numDetractors++;
        }
        // sumNPS += allNPS[i].score;
      }

      const percentPromoters = (numPromoters / allNPS.length) * 100;
      const percentDetractors = (numDetractors / allNPS.length) * 100;

      // const avgScore = sumNPS / allNPS.length;

      return Math.round(percentPromoters - percentDetractors);
    } else return 0;
  }

  render() {
    return <div> NPS score = {this.scoreCalculator()}</div>;
  }
}

export default Score;
