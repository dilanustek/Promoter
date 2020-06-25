import React, { Component } from "react";
import Fab from "@material-ui/core/Fab";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { styled } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import "./App.css";

const MyFabButton = styled(Fab)(({ theme }) => ({
  position: "fixed",
  bottom: theme.spacing(4),
  right: theme.spacing(4),
}));

const MyPopover = styled(Popover)(({ theme }) => ({}));

interface State {
  isFeedbackOpen: boolean;
}

class FeedbackButton extends Component<{}, State> {
  state: State = {
    isFeedbackOpen: false,
  };

  fabButtonRef = React.createRef<HTMLButtonElement>();

  toggleFeedback = () => {
    this.setState({ isFeedbackOpen: !this.state.isFeedbackOpen });
  };
  render() {
    return (
      <div>
        <MyFabButton
          className="feedback-fab"
          color="primary"
          aria-label="feedback"
          onClick={this.toggleFeedback}
          ref={this.fabButtonRef}
        >
          <HelpOutlineIcon fontSize="large" />
        </MyFabButton>
        <MyPopover
          id={"popover"}
          open={this.state.isFeedbackOpen}
          anchorEl={this.fabButtonRef.current}
          onClose={this.toggleFeedback}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        >
          <Typography className="popover-txt">
            <h3> Hi!</h3>
            <div>
              If you have any feedback or questions on Net-Promoter, feel free
              to send me an email!
            </div>
            <u>dilanustek@gmail.com </u>
            <h3> FAQ</h3>
            <h4>
              Why not auto-tag the comments rather than asking users to upload a
              pre-tagged spreadheet?
            </h4>
            <div>
              Version 2 of this app would have this functionality. If you're
              interested in this happening, drop me a email to indicate your
              interest!
            </div>
          </Typography>
        </MyPopover>
      </div>
    );
  }
}

export default FeedbackButton;
