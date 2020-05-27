import React, { Component } from "react";
import { NPSEntry, scoreCalculator } from "./NPSHelpers";

interface Props {
  allNPS: NPSEntry[] | null;
}

class Score extends Component<Props, {}> {
  render() {
    return <div> NPS score = {scoreCalculator(this.props.allNPS)}</div>;
  }
}

export default Score;
