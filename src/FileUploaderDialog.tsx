import React, { Component } from "react";
import { NPSEntry, bucketFiller, getTagKeys } from "./NPSHelpers";
import "./FileUploaderDialog.css";
import Papa from "papaparse";
import csvData from "./NPSsample.json";
import Modal from "@material-ui/core/Modal";
import demoImg from "./screenshot.png";

interface Props {
  dataHandler: (allNPS: NPSEntry[]) => void;
  isUploadModalOpen: boolean;
}

class FileUploaderDialog extends Component<Props, {}> {
  onFileInputChange = (event: any) => {
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

    for (let entry of commentFullData) {
      const scoreNum =
        typeof entry.Score === "number" ? entry.Score : parseInt(entry.Score);

      const availableKeys = Object.keys(entry);
      const tagKeys = getTagKeys(availableKeys, entry);

      if (entry.Comment && tagKeys.length > 0) {
        const newEntry: NPSEntry = {
          id: entry.Id,
          score: scoreNum,
          comment: entry.Comment,
          bucket: bucketFiller(scoreNum),
          tags: tagKeys,
        };
        parsedData.push(newEntry);
      }
    }

    this.props.dataHandler(parsedData);
  }

  render() {
    return (
      <Modal
        disableEnforceFocus
        disableAutoFocus
        className="modalBackdrop"
        open={this.props.isUploadModalOpen}
        // onClose={this.onFileInputChange}
      >
        <div className="modal">
          <section className="fileUploader">
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
                onChange={this.onFileInputChange}
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

export default FileUploaderDialog;
