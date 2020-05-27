import React, { Component } from "react";
import { NPSEntry, findCommonTags } from "./NPSHelpers";
import "./popularTags.css";

interface Props {
  allNPS: NPSEntry[] | null;
}

class PopularTags extends Component<Props, {}> {
  render() {
    return (
      <div className="bucketSections">
        <div className="bucket">
          <h3> Promoters :) </h3>
          <div className="commonTags">
            {findCommonTags("Promoter", this.props.allNPS, 5)}
          </div>
        </div>
        <div className="bucket">
          <h3> Passives :| </h3>
          {/* <div className="commonTags">{this.findCommonTags("Passive")}</div> */}
        </div>
        <div className="bucket">
          <h3> Detractors :(</h3>
          {/* <div className="commonTags">{this.findCommonTags("Detractor")}</div> */}
        </div>
      </div>
    );
  }
}

export default PopularTags;
