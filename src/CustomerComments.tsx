import React, { Component } from "react";
import { NPSEntry, Bucket, findCommentsFromBucketTag } from "./NPSHelpers";

interface Props {
  tag: string;
  bucket: Bucket;
  allNPS: NPSEntry[] | null;
}

class CustomerComments extends Component<Props, {}> {
  handleComments(bucket: Bucket, tag: string, allNPS: NPSEntry[] | null) {
    const comments = findCommentsFromBucketTag(bucket, tag, allNPS, 5);
    if (comments) {
      const row = [];
      for (let i = 0; i < comments?.length; i++) {
        row.push(<li key={i}>{comments[i]}</li>);
      }

      console.log(row);
      return <ul>{row}</ul>;
    }
  }

  render() {
    return (
      <div className="customerComments">
        <h2>Customer Comments</h2>
        <div className="comments">
          {this.handleComments(
            this.props.bucket,
            this.props.tag,
            this.props.allNPS
          )}
        </div>
      </div>
    );
  }
}

export default CustomerComments;
