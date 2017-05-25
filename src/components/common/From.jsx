import React, { PropTypes } from 'react';

class From extends React.component {
  constructor(props) {
    super(props);
    this.status = {};
  }

  static PropTypes = {
    config: PropTypes.objectOf(node),
    onChange: PropTypes.func,
    onSubmit: PropTypes.func
  }
}
