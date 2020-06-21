import React, { Component } from "react";
import { NPSEntry } from "./NPSHelpers";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { styled } from "@material-ui/core/styles";

interface Props {
  setTimeRange: (start: number, end: number) => void;
  allNPS: NPSEntry[];
}

interface State {
  selectedMinDate: number;
  selectedMaxDate: number;
}

const MyKeyboardPicker = styled(KeyboardDatePicker)(({ theme }) => ({
  paddingRight: "20px",
}));

class TimeRangePicker extends Component<Props, State> {
  minTime = this.getMinTime();
  maxTime = this.getMaxTime();

  state: State = {
    selectedMinDate: this.minTime,
    selectedMaxDate: this.maxTime,
  };

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

  setDate = (date: Date | null, minOrMax: "min" | "max") => {
    console.log(date);
    if (date) {
      const newTime = date.getTime();
      if (minOrMax === "min") {
        this.setState({ selectedMinDate: newTime });
      } else if (minOrMax === "max") {
        this.setState({ selectedMaxDate: newTime });
      }
    }
  };

  render() {
    return (
      <div className="timeRangePicker">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <MyKeyboardPicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline-1"
            label="Start date"
            value={this.state.selectedMinDate}
            minDate={this.minTime}
            maxDate={this.maxTime}
            onChange={(date) => this.setDate(date, "min")}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline-2"
            label="End date"
            value={this.state.selectedMaxDate}
            minDate={this.minTime}
            maxDate={this.maxTime}
            invalidLabel={
              this.state.selectedMaxDate < this.state.selectedMinDate
                ? "invalid"
                : undefined
            }
            onChange={(date) => this.setDate(date, "max")}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>
      </div>
    );
  }
}

export default TimeRangePicker;
