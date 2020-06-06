import React, { Component } from "react";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ChatOutlinedIcon from "@material-ui/icons/ChatOutlined";
import { NPSEntry } from "./NPSHelpers";
import "./CustomerComments.css";

import {
  ListItemText,
  ListItemIcon,
  ListItem,
  ListItemSecondaryAction,
} from "@material-ui/core";

interface Props {
  entry: NPSEntry;
}

interface State {
  showLong: boolean;
}

class CommentListItem extends Component<Props, State> {
  state: State = {
    showLong: false,
  };
  maxCommentLen = 330;

  handleExpandClick = () => {
    this.setState({
      showLong: !this.state.showLong,
    });
  };

  getCommentWithButton() {
    if (this.props.entry.comment.length > this.maxCommentLen) {
      // too long
      if (this.state.showLong) {
        //shw long
        return (
          <ListItemText>
            {this.props.entry.comment}
            <span className="expand" onClick={this.handleExpandClick}>
              Show less
            </span>
          </ListItemText>
        );
      } else {
        // show short
        return (
          <ListItemText>
            {this.props.entry.comment.slice(0, this.maxCommentLen)}...
            <span className="expand" onClick={this.handleExpandClick}>
              Show more
            </span>
          </ListItemText>
        );
      }
    } else {
      //not too long. no button
      return <ListItemText>{this.props.entry.comment}</ListItemText>;
    }
  }

  // getExpandIcon() {
  //   if (this.props.entry.comment.length > this.maxCommentLen) {
  //     if (this.state.showLong) {
  //       return <ExpandLess onClick={this.handleExpandClick} />;
  //     } else {
  //       return <ExpandMore onClick={this.handleExpandClick} />;
  //     }
  //   } else return null;
  // }

  // getText() {
  //   if (
  //     this.props.entry.comment.length > this.maxCommentLen &&
  //     !this.state.showLong
  //   ) {
  //     return this.props.entry.comment.slice(0, this.maxCommentLen);
  //   } else {
  //     return this.props.entry.comment;
  //   }
  // }

  render() {
    return (
      <ListItem>
        <ListItemIcon>
          <ChatOutlinedIcon />
        </ListItemIcon>
        {this.getCommentWithButton()}
        {/* <ListItemText>{this.getText()}</ListItemText> */}
        {/* <ListItemSecondaryAction>
          {this.getExpandIcon()}
        </ListItemSecondaryAction> */}
      </ListItem>
    );
  }
}

export default CommentListItem;
