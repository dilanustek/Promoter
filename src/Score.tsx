import React, { Component } from "react";
import { NPSEntry, scoreCalculator } from "./NPSHelpers";
import Typography from "@material-ui/core/Typography";
import Title from "./TItle";

interface Props {
  allNPS: NPSEntry[] | null;
}

class Score extends Component<Props, {}> {
  render() {
    return (
      <div>
        <Title>NPS score</Title>
        <Typography component="p" variant="h4">
          {scoreCalculator(this.props.allNPS)}
        </Typography>
      </div>
    );
  }
}

export default Score;
