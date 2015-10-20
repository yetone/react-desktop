import React, { Component, PropTypes } from 'react';
import WindowState from '../WindowState';
import Controls from './Controls.osx/Controls';
import Radium from 'radium';

var styles = {
  titleBar: {
    userSelect: 'none',
    WebkitAppRegion: 'drag',
    cursor: 'default',
    display: 'flex',
    alignItems: 'center',
    height: '20px',
    backgroundImage: 'linear-gradient(top, #ededed 0, #ededed 1px, #e7e7e7 2px, #d1d1d1 100%)',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: '#afafaf',
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: '#f6f6f6',
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px',
    paddingLeft: '3px',
    paddingRight: '3px'
  },

  unfocusedTitleBar: {
    backgroundImage: 'linear-gradient(top, #f8f8f8 0px, #f8f8f8 2px, #f6f6f6 100%)',
    borderBottomColor: '#cecece'
  },

  toolbar: {
    height: '36px',
    paddingLeft: '9px',
    paddingRight: '9px'
  },

  title: {
    userSelect: 'none',
    cursor: 'default',
    fontFamily: '"San Francisco", "Helvetica Neue", "Lucida Grande", Arial, sans-serif',
    fontSize: '13px',
    color: '#676767',
    flex: 1,
    textAlign: 'center',
    lineHeight: '21px'
  },

  unfocusedTitle: {
    color: '#b8b8b8'
  }
};

@WindowState
@Radium
class TitleBarOSX extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element, React.PropTypes.array]),
    style: PropTypes.object,
    title: PropTypes.string,
    controls: PropTypes.bool,
    onClosePress: PropTypes.func,
    onMinimizePress: PropTypes.func,
    onResizePress: PropTypes.func,
    visible: PropTypes.bool,
    display: PropTypes.bool
  };

  constructor(props) {
    super();
    this.state = {
      windowFocused: true,
      visible: props.visible !== false,
      display: props.display !== false
    };
  }

  render() {
    let { children, controls, title, visible, display, style, ...props } = this.props;

    let componentStyle = {...styles.titleBar, ...style};
    if (children) {
      componentStyle = {...componentStyle, ...styles.toolbar};
    }

    let titleStyle = styles.title;
    if (this.props.controls) {
      titleStyle = {...titleStyle, paddingRight: '60px'};
    }

    if (!this.state.windowFocused) {
      componentStyle = {...componentStyle, ...styles.unfocusedTitleBar};
      titleStyle = {...titleStyle, ...styles.unfocusedTitle};
    }

    controls = !controls || <Controls {...this.props}/>;
    title = !title || (
        <div style={titleStyle}>
          {this.props.title}
        </div>
      );

    componentStyle = {
      ...componentStyle,
      visibility: this.state.visible ? 'visible' : 'hidden',
      display: this.state.display ? 'flex' : 'none'
    };

    return (
      <div
        ref="element"
        style={componentStyle}
        {...props}
      >
        {controls}
        {title}
        {children}
      </div>
    );
  }
}

export default TitleBarOSX;
