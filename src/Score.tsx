import React, { Component } from "react";
import { NPSEntry, scoreCalculator } from "./NPSHelpers";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";

interface Props {
  allNPS: NPSEntry[];
}

class Score extends Component<Props, {}> {
  render() {
    return (
      <div>
        <Title>NPS score</Title>
        <Typography component="p" variant="h4">
          {scoreCalculator(this.props.allNPS)}
        </Typography>
        <Typography>{this.props.allNPS.length} entries analyzed</Typography>
      </div>
    );
  }
}

export default Score;
