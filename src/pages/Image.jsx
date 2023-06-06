import React from "react";
import Helmet from "../commponents/Helmet/Helmet";
import Single from "../commponents/single/Single";


const Image = () => {

  return (
    <Helmet title={"Image"}>
      <main>
        <div className="container">

          {/* ======middle======= */}
          <div className="middle">
            {/* <div className="controlsContainer">
              <div className="controls">
                <img className="controlsIcon" alt="" src="/backward-5.svg" />
                <img className="controlsIcon--small" alt="" src="/play.svg" />
                <img className="controlsIcon" alt="" src="/forward-5.svg" />
              </div>
            </div>
            <div className="timecontrols">
              <p className="controlsTime">1:02</p>
              <div className="time_progressbarContainer">
                <div style={{ width: "40%" }} className="time_progressBar"></div>
              </div>
              <p className="controlsTime">2:05</p>
            </div> */}

            {/* POSTS */}
            <Single />
          </div>
        </div>
      </main>
    </Helmet >
  );
};
export default Image;