import React, { Component, PropTypes } from 'react';
import { mergeStyles } from '../Styling';
import SegmentedControl from '../SegmentedControl';

var styles = {
  box: {
    userSelect: 'none',
    cursor: 'default',
    backgroundColor: 'rgba(0, 0, 0, .04)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderTopColor: 'rgba(0, 0, 0, .07)',
    borderLeftColor: 'rgba(0, 0, 0, .037)',
    borderRightColor: 'rgba(0, 0, 0, .037)',
    borderBottomColor: 'rgba(0, 0, 0, .026)',
    borderRadius: '4px',
    position: 'relative',
    padding: '23px 18px 22px 18px'
  },

  segmentedControls: {
    marginTop: '10px',
    paddingTop: '33px'
  }
};

class Box extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element, React.PropTypes.array]),
    style: PropTypes.object,
    visible: PropTypes.bool,
    display: PropTypes.bool
  };

  constructor(props) {
    super();
    this.state = {
      visible: props.visible !== false,
      display: props.display !== false
    };
  }

  get styles() {
    return mergeStyles(styles.box, this.props.style);
  }

  render() {
    const { children, style, visible, display, ...props } = this.props;
    const hasSegmentedControls = typeof children === 'object' && children.type === SegmentedControl;

    let componentStyle = this.styles;
    if (hasSegmentedControls) {
      componentStyle = mergeStyles(componentStyle, styles.segmentedControls);
    }

    componentStyle = mergeStyles(componentStyle, {
      visibility: this.state.visible ? 'visible' : 'hidden',
      display: this.state.display ? 'block' : 'none'
    });

    return (
      <div
        style={componentStyle}
        {...props}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Box;
