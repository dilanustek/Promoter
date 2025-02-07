import React, { Component } from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { styled } from "@material-ui/core/styles";
import { NPSEntry, getMinTime, getMaxTime } from "./NPSHelpers";

interface Props {
  setNPSEntiesByTimeRange: (timeStamp: number, minOrMax: "min" | "max") => void;
  allNPS: NPSEntry[];
}

interface State {
  selectedMinDate: number;
  selectedMaxDate: number;
}

const StartDatePicker = styled(KeyboardDatePicker)(({ theme }) => ({
  paddingRight: "20px",
}));

class TimeRangePicker extends Component<Props, State> {
  minTime = getMinTime(this.props.allNPS);
  maxTime = getMaxTime(this.props.allNPS);

  state: State = {
    selectedMinDate: this.minTime,
    selectedMaxDate: this.maxTime,
  };

  isValidDate(date: Date) {
    return !isNaN(date.getTime());
  }

  setDate = (date: Date | null, minOrMax: "min" | "max") => {
    if (date && this.isValidDate(date)) {
      const newTime = date.getTime();
      if (minOrMax === "min") {
        this.setState({ selectedMinDate: newTime });
      } else if (minOrMax === "max") {
        this.setState({ selectedMaxDate: newTime });
      }

      this.props.setNPSEntiesByTimeRange(newTime, minOrMax);
    }
  };

  render() {
    return (
      <div className="timeRangePicker">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <StartDatePicker
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
              this.state.selectedMinDate > this.state.selectedMaxDate
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
