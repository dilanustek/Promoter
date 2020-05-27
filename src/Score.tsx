import React, { Component } from "react";
import NPSEntry from "./NPSHelpers";

interface Props {
  allNPS: NPSEntry[] | null;
}

class Score extends Component<Props, {}> {
  scoreCalculator() {
    const allNPS = this.props.allNPS;

    if (allNPS) {
      let sumNPS = 0;
      for (let i = 0; i < allNPS.length; i++) {
        console.log("scpre = " + allNPS[i].score);
        sumNPS += allNPS[i].score;
      }

      return sumNPS / allNPS.length;
    }
  }

  render() {
    return <div>NPS score = {this.scoreCalculator()}</div>;
  }
}

export default Score;
