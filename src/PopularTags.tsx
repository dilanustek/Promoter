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
            {this.props.allNPS
              ? findCommonTags("Promoter", this.props.allNPS, 5)
              : null}
          </div>
        </div>
        <div className="bucket">
          <h3> Passives :| </h3>
          <div className="commonTags">
            {this.props.allNPS
              ? findCommonTags("Passive", this.props.allNPS, 5)
              : null}
          </div>
        </div>
        <div className="bucket">
          <h3> Detractors :(</h3>
          <div className="commonTags">
            {this.props.allNPS
              ? findCommonTags("Detractor", this.props.allNPS, 5)
              : null}
          </div>
        </div>
      </div>
    );
  }
}

export default PopularTags;
