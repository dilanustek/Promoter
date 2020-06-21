import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import { NPSEntry } from "./NPSHelpers";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import "./TimeRangePicker.css";
import { styled } from "@material-ui/core/styles";

interface Props {
  setTimeRange: (start: number, end: number) => void;
  allNPS: NPSEntry[];
}

interface State {
  selectedMinDate: number;
  selectedMaxDate: number;
}

const MyPickerUtilProvider = styled(MuiPickersUtilsProvider)(({ theme }) => ({
  paddingRight: "16px",
}));

class TimeRangePicker extends Component<Props, State> {
  state: State = {
    selectedMinDate: this.getMinTime(),
    selectedMaxDate: this.getMaxTime(),
  };

  //   startDateRef = React.createRef<>();
  //   endDateRef = React.createRef<>();

  getMinTime() {
    const data = this.props.allNPS;
    const minTime = data.reduce(
      (min, p) => (p.timestamp < min ? p.timestamp : min),
      data[0].timestamp
    );
    console.log("min " + minTime);
    console.log(new Date(minTime));

    return minTime;
  }

  getMaxTime() {
    const data = this.props.allNPS;
    const maxTime = data.reduce(
      (max, p) => (p.timestamp > max ? p.timestamp : max),
      data[0].timestamp
    );
    console.log("max= " + maxTime);
    console.log(new Date(maxTime));
    return maxTime;
  }

  isBetweenDateRange(date: number) {
    return date <= this.getMaxTime() && date >= this.getMinTime();
  }

  setDate = (date: Date | null, minOrMax: "min" | "max") => {
    console.log(date);
    if (date) {
      const newTime = date.getTime();
      if (minOrMax === "min") {
        if (this.isBetweenDateRange(newTime)) {
          this.setState({ selectedMinDate: newTime });
        } else this.setState({ selectedMinDate: this.getMinTime() });
      } else if (minOrMax === "max" && newTime <= this.getMaxTime()) {
        if (this.isBetweenDateRange(newTime)) {
          this.setState({ selectedMaxDate: newTime });
        } else this.setState({ selectedMaxDate: this.getMaxTime() });
      }
    }
  };

  render() {
    return (
      <div className="timeRangePicker">
        <Typography id="range-slider" gutterBottom>
          Select a date range to filter everything:
        </Typography>

        <div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline-1"
              label="Start date"
              value={this.state.selectedMinDate}
              onChange={(date) => this.setDate(date, "min")}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
              // ref={this.startDateRef}
            />
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline-2"
              label="End date"
              value={this.state.selectedMaxDate}
              onChange={(date) => this.setDate(date, "max")}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
              // ref={this.endDateRef}
            />
          </MuiPickersUtilsProvider>
        </div>
      </div>
    );
  }
}

export default TimeRangePicker;
