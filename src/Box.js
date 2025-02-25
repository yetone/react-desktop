import React, { Component, PropTypes } from 'react';
import Desktop from './Desktop';
import BoxOSX from './Box/Box.osx';

class Box extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element, React.PropTypes.array]),
    style: PropTypes.object,
    visible: PropTypes.bool,
    display: PropTypes.bool
  };

  componentWillUpdate(nextProps, nextState) {
    if (nextState) {
      this.refs.component.setState(nextState);
    }
  }

  render() {
    if (Desktop.os === 'win') {
      return <div ref="component" {...this.props}/>
    } else {
      return <BoxOSX ref="component" {...this.props}/>
    }
  }
}

export default Box;
