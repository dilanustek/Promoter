import React, { Component } from "react";
import { NPSEntry, Bucket, findCommonTags } from "./NPSHelpers";
import "./popularTags.css";
import Title from "./Title";
import { styled } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import LocalOffer from "@material-ui/icons/LocalOffer";

interface Props {
  allNPS: NPSEntry[] | null;
  tagBucketHandler: (bucket: Bucket, tag: string) => void;
  clickedBucket: Bucket | null;
  clickedTag: string | null;
}

class PopularTags extends Component<Props, {}> {
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
              <LocalOffer />
            </ListItemIcon>
            <ListItemText>
              {tag} -> {frequency} %
            </ListItemText>
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
            <h3> Promoters :) </h3>
            <List>
              {this.props.allNPS ? this.handlePopularTags("Promoter") : null}
            </List>
          </div>
          <div className="bucket">
            <h3> Passives :| </h3>
            <List>
              {this.props.allNPS ? this.handlePopularTags("Passive") : null}
            </List>
          </div>
          <div className="bucket">
            <h3> Detractors :(</h3>
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
