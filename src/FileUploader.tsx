import React, { Component } from "react";
import { Link } from "react-router-dom";

interface State {
  isFileUploaded: boolean;
}

class FileUploader extends Component<{}, State> {
  state: State = {
    isFileUploaded: false,
  };

  uploadHandler = () => {
    console.log("uploading file...");
  };

  render() {
    return (
      <section className="uploadFile">
        <header>
          <h1>Promoter Analysis</h1>
        </header>
        <section>
          <p>
            Upload a csv of your NPS data. It should have the NPS scare in the
            first column, the NPS comments in the second column, and have tags
            in the other columns.
          </p>
          <button
            className="uploadButton"
            onClick={this.uploadHandler}
          ></button>
        </section>
      </section>
    );
  }
}

export default FileUploader;
