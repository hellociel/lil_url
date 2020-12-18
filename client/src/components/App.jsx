import React, { Component } from "react";
import Form from "./Form.jsx";
import URL from "./URL.jsx";
import Url from "url-parse";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      origin: "",
      pathname: "",
      originalUrl: "",
      shortenedPathname: "",
      shortenedUrl: "",
      count: 0,
      isDup: null,
      copied: false,
    };
    this.onChange = this.onChange.bind(this);
    this.shortenUrl = this.shortenUrl.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.findAndSaveUrl = this.findAndSaveUrl.bind(this);
    this.copyUrl = this.copyUrl.bind(this);
    this.getCounter = this.getCounter.bind(this);
  }

  onChange(e) {
    e.preventDefault();
    this.setState({ originalUrl: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    let givenUrl = this.state.originalUrl;
    let newUrl = new Url(givenUrl);
    let pathname = newUrl.pathname;

    this.setState({
      origin: newUrl.origin,
      pathname: newUrl.pathname,
    });
    this.shortenUrl(pathname, this.state.count);
  }

  shortenUrl(pathname, count) {
    let shortenedPathname = btoa(count + pathname).slice(0, 7);
    this.findAndSaveUrl(shortenedPathname);
  }

  findAndSaveUrl(shortenedPathname) {
    axios
      .get("/find", { params: { url: shortenedPathname } })
      .then((response) => {
        let newUrl = this.state.origin + "/" + shortenedPathname;
        this.setState({ shortenedUrl: newUrl });
      })
      .then()
      .catch((error) => {
        this.shortenUrl(this.state.pathname, this.statecount + 1);
      });
  }

  copyUrl(e) {
    e.preventDefault();
    let copyText = this.state.shortendUrl;
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    this.setState({ copied: true });
  }

  getCounter() {
    axios
      .get("/counter")
      .then((response) => {
        let newCounter = response.data.counter;

        this.setState({ count: newCounter });
      })
      .catch((error) => {});
  }

  componentDidMount() {
    this.getCounter();
  }

  render() {
    return (
      <div id="background">
        <div id="container">
          <div id="title">Mini URL Generator</div>
          <div id="generator">
            <Form onChange={this.onChange} />
            <button className="generateButton" onClick={this.onSubmit}>
              Generate Mini URL
            </button>
            <URL
              copyUrl={this.copyUrl}
              copied={this.state.copied}
              origin={this.state.origin}
              shortUrl={this.state.shortenedUrl}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
