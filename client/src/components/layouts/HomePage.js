import React, { Component } from "react";
import "../../css/landing.css";

export class HomePage extends Component {
  render() {
    return (
      <React.Fragment>
        <div id="index-banner" className="parallax-container landing">
          <div className="section no-pad-bot">
            <div className="container center">
              <h1
                className="header center pink-text"
                style={{ marginTop: "5.5rem" }}>
                Dog Care
              </h1>
              <div className="row center">
                <h3 className="header col s12 black-text">
                  เพราะสุนัขดูแลตัวเองไม่ได้
                </h3>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default HomePage;
