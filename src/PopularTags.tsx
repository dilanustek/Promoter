import React, { Component } from "react";
import {
  NPSEntry,
  Bucket,
  findCommonTags,
  styleIconByBucket,
} from "./NPSHelpers";
import "./popularTags.css";
import Title from "./Title";
import { styled } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import LocalOffer from "@material-ui/icons/LocalOffer";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import MoodBadIcon from "@material-ui/icons/MoodBad";
import { ListItemSecondaryAction } from "@material-ui/core";

interface Props {
  allNPS: NPSEntry[] | null;
  tagBucketHandler: (bucket: Bucket, tag: string) => void;
  clickedBucket: Bucket | null;
  clickedTag: string | null;
}

class PopularTags extends Component<Props, {}> {
  // styleIconByBucket(bucket: Bucket) {
  //   if (bucket === "Promoter") {
  //     return { color: green[500] };
  //   } else if (bucket === "Passive") {
  //     return { color: blue[500] };
  //   } else return { color: red[500] };
  // }

  handlePopularTags = (bucket: Bucket) => {
    const commonTags = findCommonTags(bucket, this.props.allNPS, 5);
    if (commonTags) {
      const rows = [];
      for (let i = 0; i < commonTags.length; i++) {
        const tag = commonTags[i][0];
        const frequency = commonTags[i][1];

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
              {frequency}%
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
              <InsertEmoticonIcon
                className="tagIcon"
                style={styleIconByBucket("Promoter")}
              />
              <h3 className="bucketTitle">Promoters</h3>
            </div>
            <List>
              {this.props.allNPS ? this.handlePopularTags("Promoter") : null}
            </List>
          </div>
          <div className="bucket">
            <div className="bucketHeader">
              <SentimentSatisfiedIcon
                className="tagIcon"
                style={styleIconByBucket("Passive")}
              />
              <h3 className="bucketTitle">Passives </h3>
            </div>
            <List>
              {this.props.allNPS ? this.handlePopularTags("Passive") : null}
            </List>
          </div>
          <div className="bucket">
            <div className="bucketHeader">
              <MoodBadIcon
                className="tagIcon"
                style={styleIconByBucket("Detractor")}
              />
              <h3 className="bucketTitle">Detractors</h3>
            </div>
            <List>
              {this.props.allNPS ? this.handlePopularTags("Detractor") : null}
            </List>
          </div>
        </div>
      </div>
    );
  }
}

export default PopularTags;
