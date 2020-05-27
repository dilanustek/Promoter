import React, { Component } from "react";
import Score from "./Score";
import { NPSEntry } from "./NPSHelpers";

interface Props {
  allNPS: NPSEntry[] | null;
}

class NPSstats extends Component<Props, {}> {
  render() {
    return (
      <section className="npsstats">
        <h1>NPS Analysis Results</h1>
        <Score allNPS={this.props.allNPS} />
      </section>
    );
  }
}

export default NPSstats;
