import React, { Component } from "react";
import icon from "../../images/favicon.png";

export class HomePage extends Component {
  render() {
    return (
      <React.Fragment>
        <div id="index-banner" className="parallax-container">
          <div className="section no-pad-bot">
            <div className="container center">
              <h1 className="header center pink-text">Dog Care</h1>
              <div className="row center">
                <h5 className="header col s12 black-text">
                  เพราะสุนัขดูแลตัวเองไม่ได้
                </h5>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default HomePage;
