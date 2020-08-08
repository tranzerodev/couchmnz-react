'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDnd = require('react-dnd');

var _reactDndHtml5Backend = require('react-dnd-html5-backend');

var _compose = require('./compose');

var _compose2 = _interopRequireDefault(_compose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResizableEvent = function (_React$Component) {
  _inherits(ResizableEvent, _React$Component);

  function ResizableEvent() {
    _classCallCheck(this, ResizableEvent);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  ResizableEvent.prototype.componentDidMount = function componentDidMount() {
    this.props.connectTopDragPreview((0, _reactDndHtml5Backend.getEmptyImage)(), {
      captureDraggingState: true
    });
    this.props.connectBottomDragPreview((0, _reactDndHtml5Backend.getEmptyImage)(), {
      captureDraggingState: true
    });
  };

  ResizableEvent.prototype.render = function render() {
    var _props = this.props,
        title = _props.title,
        connectTopDragSource = _props.connectTopDragSource,
        connectBottomDragSource = _props.connectBottomDragSource;

    var _map = [connectTopDragSource, connectBottomDragSource].map(function (connectDragSource) {
      return connectDragSource(_react2.default.createElement(
        'div',
        { className: 'rbc-addons-dnd-resize-anchor' },
        _react2.default.createElement('div', { className: 'rbc-addons-dnd-resize-icon' })
      ));
    }),
        Top = _map[0],
        Bottom = _map[1];

    return _react2.default.createElement(
      'div',
      { className: 'rbc-addons-dnd-resizable-event' },
      Top,
      title,
      Bottom
    );
  };

  return ResizableEvent;
}(_react2.default.Component);

var eventSourceTop = {
  beginDrag: function beginDrag(_ref) {
    var event = _ref.event;
    return _extends({}, event, { type: 'resizeT' });
  }
};

var eventSourceBottom = {
  beginDrag: function beginDrag(_ref2) {
    var event = _ref2.event;
    return _extends({}, event, { type: 'resizeB' });
  }
};

exports.default = (0, _compose2.default)((0, _reactDnd.DragSource)('resize', eventSourceTop, function (connect, monitor) {
  return {
    connectTopDragSource: connect.dragSource(),
    connectTopDragPreview: connect.dragPreview()
  };
}), (0, _reactDnd.DragSource)('resize', eventSourceBottom, function (connect, monitor) {
  return {
    connectBottomDragSource: connect.dragSource(),
    connectBottomDragPreview: connect.dragPreview()
  };
}))(ResizableEvent);
module.exports = exports['default'];