import React, { Component } from "react";
import { NPSEntry, scoreToBucket, getTagKeys } from "./NPSHelpers";
import "./FileUploaderDialog.css";
import Papa from "papaparse";
import csvData from "./NPSsample.json";
import Modal from "@material-ui/core/Modal";
import demoImg from "./screenshot.png";
import Button from "@material-ui/core/Button";
import ReactGA from "react-ga";

interface Props {
  setAllNPSData: (allNPS: NPSEntry[]) => void;
  allowModalClose: boolean;
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
          timestamp: new Date(entry.Date).getTime(),
        };
        parsedData.push(newEntry);
      }
    }

    this.props.setAllNPSData(parsedData);
  }

  onModalClose = () => {
    if (this.props.allowModalClose) {
      this.props.setIsUploadModal(false);
    }
  };

  componentDidMount() {
    ReactGA.modalview("/uploader-modal");

    // uncomment this to initialize the app without the Upload modal
    // this.parseData(csvData);
  }

  render() {
    return (
      <Modal
        disableEnforceFocus
        disableAutoFocus
        className="modalBackdrop"
        open
        onClose={this.onModalClose}
      >
        <div className="modal">
          <section className="fileUploaderSection">
            <div className="uploadText">
              <div className="modalTitle">
                <h3> Get Insights from your Net Promoter Score Comments </h3>
              </div>
              <div className="modalRow">
                <div className="step"> Step 1:</div>
                <div className="description">
                  Tag the Net Promoter Score comments using{" "}
                  <a href="https://docs.google.com/spreadsheets/d/1KEeHoyMpfOyoJkhsU8VFCutSp0CTeEjYl1mQKygAJOo/edit?usp=sharing">
                    this template
                  </a>{" "}
                  &amp; download it as a CSV.
                </div>
              </div>
              <div className="modalRow">
                <div className="step"> Step 2:</div>
                <div className="description">Upload the CSV below.</div>
              </div>
              <div className="modalRow">
                <div className="step"> Step 3:</div>
                <div className="description">
                  Explore the interactive charts!
                </div>
              </div>
            </div>
            <div>
              <Button variant="contained" component="label" color="primary">
                Upload CSV
                <input
                  className="csv-input"
                  type="file"
                  name="file"
                  accept=".csv"
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
