import React, { Component } from "react";
import {
  NPSEntry,
  Bucket,
  findCommentsFromBucketAndMaybeTag,
  colorIconByBucket,
  getEmoticonByBucket,
} from "./NPSHelpers";
import Title from "./Title";
import CommentListItem from "./CommentListItem";
import LocalOffer from "@material-ui/icons/LocalOffer";
import "./CustomerComments.css";
import { List, Divider } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import Pagination from "@material-ui/lab/Pagination";

interface Props {
  tag: string | null;
  bucket: Bucket | null;
  allNPS: NPSEntry[];
}

interface State {
  commentsPaginationIndex: number;
}

const COMMENTS_PER_PAGE = 5;

class CustomerComments extends Component<Props, State> {
  state: State = {
    commentsPaginationIndex: 0,
  };

  cachedComments: NPSEntry[] | null = null;

  setPaginationIndex = (event: React.ChangeEvent<unknown>, value: number) => {
    this.setState({
      commentsPaginationIndex: (value - 1) * COMMENTS_PER_PAGE,
    });
  };

  getFilteredComments() {
    if (this.cachedComments) {
      return this.cachedComments;
    }

    this.cachedComments = findCommentsFromBucketAndMaybeTag(
      this.props.bucket,
      this.props.tag,
      this.props.allNPS
    );
    return this.cachedComments;
  }

  getComments() {
    const allComments = this.getFilteredComments();
    return allComments?.slice(
      this.state.commentsPaginationIndex,
      this.state.commentsPaginationIndex + COMMENTS_PER_PAGE
    );
  }

  getCommentRows() {
    const nextComments = this.getComments();
    if (!nextComments) return null;

    const rows = nextComments?.map((entry) => (
      <div key={entry.id}>
        <Divider variant="inset" component="li" />
        <CommentListItem entry={entry} />
      </div>
    ));
    return rows;
  }

  getDescriptions(stringToShow: Bucket | string | null) {
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

  getNumberOfPages(allFilteredComments: NPSEntry[] | null) {
    if (!allFilteredComments) return 0;

    return Math.ceil(allFilteredComments.length / COMMENTS_PER_PAGE);
  }

  render() {
    return (
      <div className="customerComments">
        <Title> Customer Comments </Title>
        <div className="filterRow">
          <div className="rowIcon">
            {getEmoticonByBucket(this.props.bucket, false)}
          </div>
          Customer type:
          <div className="filterRowSpace">
            {this.getDescriptions(this.props.bucket)}
          </div>
        </div>
        <div className="filterRow">
          <div className="rowIcon">
            <LocalOffer
              style={{ color: colorIconByBucket(this.props.bucket) }}
            />
          </div>
          Feedback tag:
          <div className="filterRowSpace">
            {this.getDescriptions(this.props.tag)}
          </div>
        </div>
        <List>{this.getCommentRows()}</List>
        {this.cachedComments ? (
          <Pagination
            count={this.getNumberOfPages(this.cachedComments)}
            variant="outlined"
            color="primary"
            onChange={this.setPaginationIndex}
          />
        ) : null}
      </div>
    );
  }
}

export default CustomerComments;
