import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

class URL extends Component {
  constructor(props) {
    super(props);
    this.state = { buttonText: "Copy To Your Clipboard", copied: false };
    this.changeText = this.changeText.bind(this);
  }
  changeText() {
    this.setState({ buttonText: "Copied!" });
  }

  render() {
    return (
      <div className="form">
        <form>
          <label>Shortened URL</label>
          <br></br>
          <textarea
            id="shortUrl"
            rows="1"
            cols="20"
            wrap="hard"
            value={this.props.shortUrl}
            readOnly
          ></textarea>

          <CopyToClipboard
            className="copyButton"
            text={this.props.shortUrl}
            onCopy={this.props.copyUrl}
          >
            <button className="copyButton">{this.state.buttonText}</button>
          </CopyToClipboard>
        </form>
      </div>
    );
  }
}

export default URL;
