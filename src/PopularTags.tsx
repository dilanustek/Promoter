import React, { Component } from "react";
import {
  NPSEntry,
  Bucket,
  findCommonTagsInBucket,
  styleIconByBucket,
  titleEmoticonByBucket,
} from "./NPSHelpers";
import "./popularTags.css";
import Title from "./Title";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import LocalOffer from "@material-ui/icons/LocalOffer";
import { ListItemSecondaryAction } from "@material-ui/core";

interface Props {
  allNPS: NPSEntry[];
  tagBucketHandler: (bucket: Bucket, tag: string) => void;
  clickedBucket: Bucket | null;
  clickedTag: string | null;
}

class PopularTags extends Component<Props, {}> {
  handlePopularTags = (bucket: Bucket) => {
    const commonTags = findCommonTagsInBucket(bucket, this.props.allNPS, 5);
    if (commonTags) {
      const rows = [];
      for (let i = 0; i < commonTags.length; i++) {
        const tag = commonTags[i][0];
        const rate = commonTags[i][1];

        rows.push(
          <ListItem
            key={i}
            button
            selected={
              this.props.clickedTag === tag &&
              this.props.clickedBucket === bucket
            }
            onClick={() => {
              this.props.tagBucketHandler(bucket, tag);
            }}
          >
            <ListItemIcon>
              <LocalOffer style={styleIconByBucket(bucket)} />
            </ListItemIcon>
            <ListItemText>{tag}</ListItemText>
            <ListItemSecondaryAction className="freqText">
              {Math.round(rate * 100)}%
            </ListItemSecondaryAction>
          </ListItem>
        );
      }

      return rows;
    }
  };

  render() {
    return (
      <div>
        <Title> Popular Tags </Title>
        <div className="bucketSections">
          <div className="bucket">
            <div className="bucketHeader">
              {titleEmoticonByBucket("Promoter")}
              <h3 className="bucketTitle">Promoters</h3>
            </div>
            <List>{this.handlePopularTags("Promoter")}</List>
          </div>
          <div className="bucket">
            <div className="bucketHeader">
              {titleEmoticonByBucket("Passive")}
              <h3 className="bucketTitle">Passives </h3>
            </div>
            <List>{this.handlePopularTags("Passive")}</List>
          </div>
          <div className="bucket">
            <div className="bucketHeader">
              {titleEmoticonByBucket("Detractor")}
              <h3 className="bucketTitle">Detractors</h3>
            </div>
            <List>{this.handlePopularTags("Detractor")}</List>
          </div>
        </div>
      </div>
    );
  }
}

export default PopularTags;
