import React, { Component } from "react";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ChatOutlinedIcon from "@material-ui/icons/ChatOutlined";

import {
  ListItemText,
  ListItemIcon,
  ListItem,
  ListItemSecondaryAction,
} from "@material-ui/core";

interface Props {
  commentObj: { short: string | null; long: string };
}

interface State {
  showLong: boolean;
}

class CommentListItem extends Component<Props, State> {
  state: State = {
    showLong: false,
  };

  handleExpandClick = () => {
    this.setState({
      showLong: !this.state.showLong,
    });
  };

  getExpandIcon() {
    if (this.props.commentObj.short) {
      if (this.state.showLong) {
        return <ExpandLess onClick={this.handleExpandClick} />;
      } else {
        return <ExpandMore onClick={this.handleExpandClick} />;
      }
    } else return null;
  }

  getText() {
    if (this.props.commentObj.short && !this.state.showLong)
      return this.props.commentObj.short;
    else return this.props.commentObj.long;
  }

  render() {
    return (
      <ListItem>
        <ListItemIcon>
          <ChatOutlinedIcon />
        </ListItemIcon>
        <ListItemText>{this.getText()}</ListItemText>
        <ListItemSecondaryAction>
          {this.getExpandIcon()}
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

export default CommentListItem;
