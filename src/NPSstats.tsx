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

const MyContainer = styled(Container)({
  paddingTop: 4 * 8,
  paddingBottom: 4 * 8,
});

const MyPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: "flex",
  overflow: "auto",
  flexDirection: "column",
}));

interface Props {
  allNPS: NPSEntry[];
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

  tagBucketHandler = (bucket: Bucket, tag: string | null) => {
    this.setState({
      clickedBucket: bucket,
      clickedTag: tag,
    });
  };

  render() {
    return (
      <MyContainer maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <h1>NPS Analysis Results</h1>
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <MyPaper className="fixedHeightPaper">
              <Score allNPS={this.props.allNPS} />
            </MyPaper>
          </Grid>
          <Grid item xs={12} md={9} lg={9}>
            <MyPaper className="fixedHeightPaper">
              <NPSBarChart
                allNPS={this.props.allNPS}
                tagBucketHandler={this.tagBucketHandler}
              />
            </MyPaper>
          </Grid>
          <Grid item xs={12}>
            <MyPaper>
              <PopularTags
                allNPS={this.props.allNPS}
                tagBucketHandler={this.tagBucketHandler}
                clickedBucket={this.state.clickedBucket}
                clickedTag={this.state.clickedTag}
              />
            </MyPaper>
          </Grid>
          <Grid item xs={12}>
            <MyPaper>
              <CustomerComments
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
