import React, { Component } from "react";
import { NPSEntry, Bucket, findCommonTags } from "./NPSHelpers";
import "./popularTags.css";

interface Props {
  allNPS: NPSEntry[] | null;
  tagBucketHandler: (bucket: Bucket, tag: string) => void;
  // need a callback function that will give tag & bucket up to NPSStats,
  // it will call the customer comment with the right tag & bucket
  // check with  Antoine if doesn't work
}
// sum = (x,y) => x+y
// double = (x) => sum(x,x)
// increment = (x) => sum(x,1)

class PopularTags extends Component<Props, {}> {
  handlePopularTags = (bucket: Bucket) => {
    const commonTags = findCommonTags(bucket, this.props.allNPS, 5);
    if (commonTags) {
      const row = [];
      for (let i = 0; i < commonTags.length; i++) {
        row.push(
          <li
            key={i}
            onClick={() =>
              this.props.tagBucketHandler(bucket, commonTags[i][0])
            }
          >
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
