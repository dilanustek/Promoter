import React, { Component } from "react";
import { NPSEntry, scoreToBucket, getTagKeys } from "./NPSHelpers";
import "./FileUploaderDialog.css";
import Papa from "papaparse";
import csvData from "./NPSsample.json";
import Modal from "@material-ui/core/Modal";
import demoImg from "./screenshot.png";
import Button from "@material-ui/core/Button";

interface Props {
  setAllNPSData: (allNPS: NPSEntry[]) => void;
  isUploadModalOpen: boolean;
  isAllNPSSet: boolean;
  setIsUploadModal: (isOpen: boolean) => void;
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
    this.parseData(result.data);
  };

  parseData(data: any[]) {
    const entriesWithComments = data.filter(
      (entry: any) => entry.Comment !== ""
    );
    let parsedData: NPSEntry[] = [];

    for (let entry of entriesWithComments) {
      const scoreNum =
        typeof entry.Score === "number" ? entry.Score : parseInt(entry.Score);

      const availableKeys = Object.keys(entry);
      const tagKeys = getTagKeys(availableKeys, entry);

      if (entry.Comment) {
        const newEntry: NPSEntry = {
          id: entry.Id,
          score: scoreNum,
          comment: entry.Comment,
          bucket: scoreToBucket(scoreNum),
          tags: tagKeys,
        };
        parsedData.push(newEntry);
      }
    }

    this.props.setAllNPSData(parsedData);
  }

  onModalClose = () => {
    console.log("modal closed");
    // if allNPS is loaded
    if (this.props.isAllNPSSet) {
      this.props.setIsUploadModal(false);
    }
  };

  componentDidMount() {
    this.parseData(csvData);
  }

  render() {
    return (
      <Modal
        disableEnforceFocus
        disableAutoFocus
        className="modalBackdrop"
        open={this.props.isUploadModalOpen}
        onClose={this.onModalClose}
      >
        <div className="modal">
          <section className="fileUploaderSection">
            <div className="uploadText">
              <div className="modalTitle">Upload a CSV of your NPS data. </div>
              <div className="modalText">
                Your file should have the NPS score and comments in seperate
                columns titled "Score" and "Comment". Tags should each have
                their own columns.
              </div>
            </div>
            <div>
              <Button variant="contained" component="label" color="primary">
                Upload CSV
                <input
                  className="csv-input"
                  type="file"
                  name="file"
                  placeholder={"placeholder text"}
                  style={{ display: "none" }}
                  onChange={this.onFileInputChange}
                />
              </Button>
            </div>
          </section>
          <section className="demoSection">
            <img className="demoImg" src={demoImg} alt="Demo Screenshot" />
            <div>
              <Button
                variant="contained"
                onClick={() => this.parseData(csvData)}
              >
                Explore demo
              </Button>
            </div>
          </section>
        </div>
      </Modal>
    );
  }
}

export default FileUploaderDialog;
