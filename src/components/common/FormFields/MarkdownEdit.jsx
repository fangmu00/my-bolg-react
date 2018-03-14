import React from 'react';
import EditMarked from 'easy-marked';
import '../../../../node_modules/easy-marked/src/style.less';

import { uploadRPC } from './const';

class MarkdownEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <EditMarked
        uploadAction={uploadRPC}
        uploadName="file"
        afterUpload={data => data.url}
        {...this.props}
      />
    );
  }
}

export default MarkdownEdit;
