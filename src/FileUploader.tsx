import React, { Component } from "react";
import { NPSEntry, bucketFiller, getTagKeys } from "./NPSHelpers";
import "./FileUploader.css";
import Papa from "papaparse";
import csvData from "./NPSsample.json";
import Modal from "@material-ui/core/Modal";
import demoImg from "./screenshot.png";

interface State {
  isFileUploaded: boolean;
  allNPS: NPSEntry[] | null;
}

interface Props {
  dataHandler: (allNPS: NPSEntry[]) => void;
  isUploadOpen: boolean;
}

class FileUploader extends Component<Props, State> {
  state: State = {
    isFileUploaded: false,
    allNPS: null,
  };

  handleChange = (event: any) => {
    const csvFile = event.target.files[0];
    if (csvFile) {
      Papa.parse(csvFile, {
        complete: this.papaParseData,
        header: true,
      });
    }
  };

  papaParseData = (result: Papa.ParseResult) => {
    const data = result.data;
    this.parseData(data);
  };

  parseData(data: any) {
    const commentFullData = data.filter((entry: any) => entry.Comment !== "");
    let parsedData: NPSEntry[] = [];

    for (let i = 0; i < commentFullData.length; i++) {
      const entry = commentFullData[i];
      const scoreNum =
        typeof entry.Score == "number" ? entry.Score : parseInt(entry.Score);

      const availableKeys = Object.keys(entry);
      const tagKeys = getTagKeys(availableKeys, entry);

      if (entry.Comment && tagKeys.length > 0) {
        const newEntry: NPSEntry = {
          id: i,
          score: scoreNum,
          comment: entry.Comment,
          bucket: bucketFiller(scoreNum),
          tags: tagKeys,
        };
        parsedData.push(newEntry);
      }
    }

    this.setState({
      isFileUploaded: true,
    });

    this.props.dataHandler(parsedData);
  }

  render() {
    return (
      <Modal
        className="modalBackdrop"
        open={this.props.isUploadOpen}
        // onClose={this.handleChange}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className="modal">
          <section className="uploadFile">
            <div>
              Upload a CSV of your NPS data. It should have the NPS scare in the
              first column, the NPS comments in the second column, and have tags
              in the other columns.
            </div>
            <div className="uploadSection">
              <input
                className="csv-input"
                type="file"
                name="file"
                placeholder={"placeholder text"}
                onChange={this.handleChange}
              />
              <p />
            </div>
          </section>
          <div className="vl"></div>
          <section className="demo">
            <div>
              <div>Or </div>
              <button onClick={() => this.parseData(csvData)}>
                see demo data!
              </button>
            </div>
            <img className="demoImg" src={demoImg} alt="Demo Screenshot" />
          </section>
        </div>
      </Modal>
    );
  }
}

export default FileUploader;
