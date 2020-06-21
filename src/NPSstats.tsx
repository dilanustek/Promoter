import React, { Component } from "react";
import Score from "./Score";
import { NPSEntry, Bucket } from "./NPSHelpers";
import "./NPSstats.css";
import PopularTags from "./PopularTags";
import CustomerComments from "./CustomerComments";
import { styled } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import NPSBarChart from "./NPSBarChart";
import TimeRangePicker from "./TimeRangePicker";

interface Props {
  allNPS: NPSEntry[];
}

interface State {
  clickedBucket: Bucket | null;
  clickedTag: string | null;
  timeFilteredNPS: NPSEntry[];
}

const MyContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

const MyPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: "flex",
  overflow: "auto",
  flexDirection: "column",
}));

class NPSstats extends Component<Props, {}> {
  state: State = {
    clickedBucket: null,
    clickedTag: null,
    timeFilteredNPS: this.props.allNPS,
  };

  setBucketAndMaybeTag = (bucket: Bucket, tag: string | null) => {
    this.setState({
      clickedBucket: bucket,
      clickedTag: tag,
    });
  };

  getCommentSectionKey(tag: string | null, bucket: Bucket | null) {
    if (tag) {
      return bucket + tag;
    } else if (bucket) return bucket;
    else return "empty";
  }

  setTimeFilteredNPS = (start: number, end: number) => {
    const timeFilteredNPS = this.props.allNPS.filter(
      (entry) => entry.timestamp > start && entry.timestamp < end
    );
    this.setState({ timeFilteredNPS: timeFilteredNPS });
  };

  render() {
    return (
      <MyContainer maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} className="NPSstatsHeader">
            <h1>NPS Analysis Results</h1>
            <TimeRangePicker
              setTimeRange={this.setTimeFilteredNPS}
              allNPS={this.props.allNPS}
            />
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <MyPaper className="fixedHeightPaper">
              <Score allNPS={this.state.timeFilteredNPS} />
            </MyPaper>
          </Grid>
          <Grid item xs={12} md={9} lg={9}>
            <MyPaper className="fixedHeightPaper">
              <NPSBarChart
                allNPS={this.state.timeFilteredNPS}
                setBucketAndMaybeTag={this.setBucketAndMaybeTag}
              />
            </MyPaper>
          </Grid>
          <Grid item xs={12}>
            <MyPaper>
              <PopularTags
                allNPS={this.state.timeFilteredNPS}
                setBucketAndMaybeTag={this.setBucketAndMaybeTag}
                clickedBucket={this.state.clickedBucket}
                clickedTag={this.state.clickedTag}
              />
            </MyPaper>
          </Grid>
          <Grid item xs={12}>
            <MyPaper>
              <CustomerComments
                key={this.getCommentSectionKey(
                  this.state.clickedTag,
                  this.state.clickedBucket
                )}
                tag={this.state.clickedTag}
                bucket={this.state.clickedBucket}
                allNPS={this.props.allNPS}
              />
            </MyPaper>
          </Grid>
        </Grid>
      </MyContainer>
    );
  }
}

export default NPSstats;
