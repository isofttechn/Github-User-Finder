/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment } from "react";

import ntfound from "../pages/found.jpg";

const NotFound = () => {
  return (
    <Fragment>
      <div className="card grid-2">
        <div>
          <h1>Not Found</h1>
          <p>The page you are looking for does not exist..</p>
        </div>

        <div>
          <img
            src={ntfound}
            style={{ width: "500", margin: "auto", paddingTop: "20px" }}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default NotFound;
