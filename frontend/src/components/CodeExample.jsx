import React, { PropTypes} from 'react';
import ReactDOM from 'react-dom';

import CodeMirror from 'codemirror';
import 'codemirror/addon/runmode/runmode';
import 'codemirror/mode/javascript/javascript';

export default class CodeExample extends React.Component {
  static propTypes = {
    codeText: PropTypes.string.isRequired,
    mode: PropTypes.string.isRequired
  };

  render() {
    return (
      <pre className="cm-s-solarized cm-s-light">
        <code>
          {this.props.codeText}
        </code>
      </pre>
    );
  }

  componentDidMount() {
    if (CodeMirror === undefined) {
      return;
    }

    CodeMirror.runMode(
      this.props.codeText,
      this.props.mode,
      ReactDOM.findDOMNode(this).children[0]
    );
  }
}
