import React, { Component } from "react";
import Score from "./Score";
import {
  NPSEntry,
  Bucket,
  getMinTime,
  getMaxTime,
  npsScoreCalculator,
  scoreCounter,
} from "./NPSHelpers";
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
  minDate: number;
  maxDate: number;
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
    minDate: getMinTime(this.props.allNPS),
    maxDate: getMaxTime(this.props.allNPS),
  };

  setBucketAndMaybeTag = (bucket: Bucket, tag: string | null) => {
    this.setState({
      clickedBucket: bucket,
      clickedTag: tag,
    });
  };
  getCommentSectionKey(
    tag: string | null,
    bucket: Bucket | null,
    minDate: number,
    maxDate: number
  ) {
    if (tag) {
      return bucket + tag + minDate + maxDate;
    } else if (bucket) return bucket + minDate + maxDate;
    else return "empty";
  }

  updateEntriesByDate(minDate: number, maxDate: number) {
    const timeFilteredNPSUpdated = this.props.allNPS.filter((entry) => {
      return entry.timestamp >= minDate && entry.timestamp <= maxDate;
    });
    this.setState({ timeFilteredNPS: timeFilteredNPSUpdated });
  }

  setTimeFilteredNPSEntries = (timeStamp: number, minOrMax: "min" | "max") => {
    if (minOrMax === "min") {
      this.setState({ minDate: timeStamp });
      this.updateEntriesByDate(timeStamp, this.state.maxDate);
    } else {
      this.setState({ maxDate: timeStamp });
      this.updateEntriesByDate(this.state.minDate, timeStamp);
    }
  };

  render() {
    return (
      <MyContainer maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} className="NPSstatsHeader">
            <h1>NPS Analysis Results</h1>
            <TimeRangePicker
              allNPS={this.props.allNPS}
              setNPSEntiesByTimeRange={this.setTimeFilteredNPSEntries}
            />
          </Grid>
        </Grid>

        {this.state.timeFilteredNPS.length > 0 ? (
          <Grid container spacing={3}>
            <Grid item xs={12} md={3} lg={3}>
              <MyPaper className="fixedHeightPaper">
                <Score
                  npsScore={npsScoreCalculator(this.state.timeFilteredNPS)}
                  numAnalyzedEntries={this.state.timeFilteredNPS.length}
                />
              </MyPaper>
            </Grid>
            <Grid item xs={12} md={9} lg={9}>
              <MyPaper className="fixedHeightPaper">
                <NPSBarChart
                  scores={scoreCounter(this.state.timeFilteredNPS)}
                  setBucket={this.setBucketAndMaybeTag}
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
                  // key is a combination of tag, bucket, and selected dates so that everything updates on any change.
                  key={this.getCommentSectionKey(
                    this.state.clickedTag,
                    this.state.clickedBucket,
                    this.state.minDate,
                    this.state.maxDate
                  )}
                  tag={this.state.clickedTag}
                  bucket={this.state.clickedBucket}
                  allNPS={this.state.timeFilteredNPS}
                />
              </MyPaper>
            </Grid>
          </Grid>
        ) : null}
      </MyContainer>
    );
  }
}

export default NPSstats;
