import React, { Component } from "react";
import {
  NPSEntry,
  Bucket,
  findCommonTagsInBucket,
  colorIconByBucket,
  titleEmoticonByBucket,
  bucketNames,
} from "./NPSHelpers";
import "./popularTags.css";
import Title from "./Title";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import LocalOffer from "@material-ui/icons/LocalOffer";
import { ListItemSecondaryAction, Typography } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";

interface Props {
  allNPS: NPSEntry[];
  setBucketAndMaybeTag: (bucket: Bucket, tag: string | null) => void;
  clickedBucket: Bucket | null;
  clickedTag: string | null;
}

const PopularTagsTitle = styled(Typography)({
  fontSize: 20,
  fontWeight: 600,
});

const MySecondaryListItem = styled(ListItemSecondaryAction)({
  color: "#818181",
});

class PopularTags extends Component<Props, {}> {
  setPopularTagsByBucket = (bucket: Bucket) => {
    const commonTags = findCommonTagsInBucket(bucket, this.props.allNPS, 5);
    if (commonTags) {
      const rows = [];
      for (let [tag, rate] of commonTags) {
        rows.push(
          <ListItem
            key={tag}
            button
            selected={
              this.props.clickedTag === tag &&
              this.props.clickedBucket === bucket
            }
            onClick={() => {
              this.props.setBucketAndMaybeTag(bucket, tag);
            }}
          >
            <ListItemIcon>
              <LocalOffer style={{ color: colorIconByBucket(bucket) }} />
            </ListItemIcon>
            <ListItemText>{tag}</ListItemText>
            <MySecondaryListItem>{Math.round(rate * 100)}%</MySecondaryListItem>
          </ListItem>
        );
      }

      return rows;
    }
  };

  getBucketHeaderClassName(bucket: Bucket) {
    return this.props.clickedBucket === bucket
      ? "selectedBucketHeader"
      : "nonselectedBucketHeader";
  }

  getBucketDiv(bucket: Bucket) {
    return (
      <div className="bucket" key={bucket}>
        <List>
          <ListItem
            key="title"
            button
            selected={this.props.clickedBucket === bucket}
            onClick={() => this.props.setBucketAndMaybeTag(bucket, null)}
          >
            {titleEmoticonByBucket(bucket)}
            <PopularTagsTitle className="bucketTitle">
              {bucket}
            </PopularTagsTitle>
          </ListItem>
          {this.setPopularTagsByBucket(bucket)}
        </List>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Title> Popular Tags </Title>
        <div className="bucketSections">
          {bucketNames.map((bucket) => this.getBucketDiv(bucket))}
        </div>
      </div>
    );
  }
}

export default PopularTags;
