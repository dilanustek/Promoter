import React, { Component } from "react";
import {
  NPSEntry,
  Bucket,
  findCommentsFromBucketTag,
  styleIconByBucket,
  emoticonByBucket,
} from "./NPSHelpers";
import Title from "./Title";
import CommentListItem from "./CommentListItem";
import LocalOffer from "@material-ui/icons/LocalOffer";
import "./CustomerComments.css";
import { List, Divider } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

interface Props {
  tag: string | null;
  bucket: Bucket | null;
  allNPS: NPSEntry[];
}

class CustomerComments extends Component<Props, {}> {
  handleComments(
    bucket: Bucket | null,
    tag: string | null,
    allNPS: NPSEntry[]
  ) {
    const comments = findCommentsFromBucketTag(bucket, tag, allNPS);

    const maxCommentsShown = 5;
    const topXComments = comments?.slice(0, maxCommentsShown);

    if (topXComments) {
      const rows = [];
      for (let i = 0; i < topXComments?.length; i++) {
        rows.push(
          <div key={topXComments[i].id}>
            <Divider variant="inset" component="li" />
            <CommentListItem entry={topXComments[i]} />
          </div>
        );
      }

      return rows;
    }
  }

  getStringByEmptyState(stringToShow: Bucket | string | null) {
    if (stringToShow) {
      return (
        <span>
          <b>{stringToShow}</b>
        </span>
      );
    } else {
      return (
        <span style={{ color: grey[500] }}>
          Click on a tag above to view comments
        </span>
      );
    }
  }

  render() {
    return (
      <div className="customerComments">
        <Title> Customer Comments </Title>
        <div className="filterRow">
          <div className="rowIcon">{emoticonByBucket(this.props.bucket)}</div>
          Customer type:
          <div className="filterRowSpace">
            {this.getStringByEmptyState(this.props.bucket)}
          </div>
        </div>
        <div className="filterRow">
          <div className="rowIcon">
            <LocalOffer style={styleIconByBucket(this.props.bucket)} />
          </div>
          Feedback tag:
          <div className="filterRowSpace">
            {this.getStringByEmptyState(this.props.tag)}
          </div>
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
