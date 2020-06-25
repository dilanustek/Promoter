import React, { Component } from "react";
import { NPSEntry, npsScoreCalculator } from "./NPSHelpers";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";

interface Props {
  npsScore: number;
  numAnalyzedEntries: number;
}

class Score extends Component<Props, {}> {
  render() {
    return (
      <div>
        <Title>NPS score</Title>
        <Typography component="p" variant="h4">
          {this.props.npsScore}
        </Typography>
        <Typography>
          {this.props.numAnalyzedEntries} entries analyzed
        </Typography>
      </div>
    );
  }
}

export default Score;
