import React, { Component } from "react";
import {
  NPSEntry,
  Bucket,
  findCommentsFromBucketTag,
  styleIconByBucket,
  emoticonByBucket,
} from "./NPSHelpers";
import Title from "./Title";
import LocalOffer from "@material-ui/icons/LocalOffer";
import ChatOutlinedIcon from "@material-ui/icons/ChatOutlined";
import "./CustomerComments.css";
import {
  ListItemText,
  ListItemAvatar,
  ListItemIcon,
  ListItem,
  List,
  Divider,
} from "@material-ui/core";

interface Props {
  tag: string | null;
  bucket: Bucket | null;
  allNPS: NPSEntry[] | null;
}

class CustomerComments extends Component<Props, {}> {
  handleComments(
    bucket: Bucket | null,
    tag: string | null,
    allNPS: NPSEntry[] | null
  ) {
    const comments = findCommentsFromBucketTag(bucket, tag, allNPS, 5);
    if (comments) {
      const rows = [];
      for (let i = 0; i < comments?.length; i++) {
        rows.push(
          <div key={i}>
            <ListItem key={i}>
              <ListItemIcon>
                <ChatOutlinedIcon />
              </ListItemIcon>
              <ListItemText>{comments[i]}</ListItemText>
            </ListItem>
            <Divider
              // variant="inset"
              component="li"
            />
          </div>
        );
      }

      return rows;
    }
  }

  render() {
    return (
      <div className="customerComments">
        <Title> Customer Comments </Title>
        <div className="filterRow">
          <div className="rowIcon">{emoticonByBucket(this.props.bucket)}</div>
          <b>{this.props.bucket}</b>
        </div>
        <div className="filterRow">
          <div className="rowIcon">
            <LocalOffer style={styleIconByBucket(this.props.bucket)} />
          </div>
          <b>{this.props.tag}</b>
        </div>
        <List>
          {this.handleComments(
            this.props.bucket,
            this.props.tag,
            this.props.allNPS
          )}
        </List>
      </div>
    );
  }
}

export default CustomerComments;
