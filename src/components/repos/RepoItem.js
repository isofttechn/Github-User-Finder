import React from "react";

import PropTypes from "prop-types";

const RepoItem = ({ repo }) => {
  return (
    <div className="card grid-2">
      <div className="all-center">
        <h3>Repos</h3>
      </div>
      <div>
        <a href={repo.html_url}>{repo.name}</a>
      </div>
    </div>
  );
};

RepoItem.propTypes = {
  repo: PropTypes.object.isRequired
};

export default RepoItem;
