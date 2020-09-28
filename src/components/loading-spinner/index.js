import React from "react";
import "./index.scss";

export default class LoadingSpinnerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.body = document.body;
  }

  render() {
    return (
      <div id="SQ-loading-spinner">
        <div className="circle1"></div>
        <div className="circle2"></div>
      </div>
    );
  }

  componentDidMount() {
    // this.body.style.height = "100vh";
    // this.body.style.overflow = "hidden";
  }

  componentWillUnmount() {
    // this.body.style.height = "initial";
    // this.body.style.overflow = "initial";
  }
}
