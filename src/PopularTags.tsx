import React, { Component } from "react";
import { NPSEntry, findCommonTags } from "./NPSHelpers";
import "./popularTags.css";

interface Props {
  allNPS: NPSEntry[] | null;
}

class PopularTags extends Component<Props, {}> {
  handlePopularTags = (bucket: string) => {
    const commonTags = findCommonTags(bucket, this.props.allNPS, 5);
    if (commonTags) {
      const row = [];
      for (let i = 0; i < commonTags.length; i++) {
        row.push(
          <li key={i} onClick={() => console.log("click")}>
            {commonTags[i][0]} -> {commonTags[i][1]} %
          </li>
        );
      }

      return <ul>{row}</ul>;
    }
  };

  render() {
    return (
      <div className="bucketSections">
        <div className="bucket">
          <h3> Promoters :) </h3>
          <div className="commonTags">
            {this.props.allNPS ? this.handlePopularTags("Promoter") : null}
          </div>
        </div>
        <div className="bucket">
          <h3> Passives :| </h3>
          <div className="commonTags">
            {this.props.allNPS ? this.handlePopularTags("Passive") : null}
          </div>
        </div>
        <div className="bucket">
          <h3> Detractors :(</h3>
          <div className="commonTags">
            {this.props.allNPS ? this.handlePopularTags("Detractor") : null}
          </div>
        </div>
      </div>
    );
  }
}

export default PopularTags;
