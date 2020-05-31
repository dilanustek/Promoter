import React, { Component } from "react";
import Score from "./Score";
import { NPSEntry, Bucket } from "./NPSHelpers";
import "./NPSstats.css";
import PopularTags from "./PopularTags";
import CustomerComments from "./CustomerComments";

interface Props {
  allNPS: NPSEntry[] | null;
}

interface State {
  clickedBucket: Bucket | null;
  clickedTag: string | null;
}

class NPSstats extends Component<Props, {}> {
  state: State = {
    clickedBucket: null,
    clickedTag: null,
  };

  tagBucketHandler = (bucket: Bucket, tag: string) => {
    this.setState({
      clickedBucket: bucket,
      clickedTag: tag,
    });
  };

  render() {
    return (
      <section className="npsstats">
        <h1>NPS Analysis Results</h1>
        <Score allNPS={this.props.allNPS} />
        <PopularTags
          allNPS={this.props.allNPS}
          tagBucketHandler={this.tagBucketHandler}
        />
        <CustomerComments
          tag={this.state.clickedTag}
          bucket={this.state.clickedBucket}
          allNPS={this.props.allNPS}
        />
      </section>
    );
  }
}

export default NPSstats;
