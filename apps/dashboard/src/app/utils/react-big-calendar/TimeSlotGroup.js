'use strict';

exports.__esModule = true;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TimeSlot = require('./TimeSlot');

var _TimeSlot2 = _interopRequireDefault(_TimeSlot);

var _dates = require('./utils/dates.js');

var _dates2 = _interopRequireDefault(_dates);

var _localizer = require('./localizer');

var _localizer2 = _interopRequireDefault(_localizer);

var _propTypes3 = require('./utils/propTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TimeSlotGroup = function (_Component) {
  _inherits(TimeSlotGroup, _Component);

  function TimeSlotGroup() {
    _classCallCheck(this, TimeSlotGroup);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  TimeSlotGroup.prototype.renderSlice = function renderSlice(slotNumber, content, value) {
    var _props = this.props,
        dayWrapperComponent = _props.dayWrapperComponent,
        showLabels = _props.showLabels,
        isNow = _props.isNow,
        culture = _props.culture,
        slotPropGetter = _props.slotPropGetter;

    return _react2.default.createElement(_TimeSlot2.default, {
      key: slotNumber,
      slotPropGetter: slotPropGetter,
      dayWrapperComponent: dayWrapperComponent,
      showLabel: showLabels && !slotNumber,
      content: content,
      culture: culture,
      isNow: isNow,
      value: value
    });
  };

  TimeSlotGroup.prototype.renderSlices = function renderSlices() {
    var ret = [];
    var sliceLength = this.props.step;
    var sliceValue = this.props.value;
    for (var i = 0; i < this.props.timeslots; i++) {
      var content = _localizer2.default.format(sliceValue, this.props.timeGutterFormat, this.props.culture);
      ret.push(this.renderSlice(i, content, sliceValue));
      sliceValue = _dates2.default.add(sliceValue, sliceLength, 'minutes');
    }
    return ret;
  };

  TimeSlotGroup.prototype.render = function render() {
    return _react2.default.createElement(
      'div',
      { className: 'rbc-timeslot-group' },
      this.renderSlices()
    );
  };

  return TimeSlotGroup;
}(_react.Component);

TimeSlotGroup.propTypes = {
  dayWrapperComponent: _propTypes3.elementType,
  timeslots: _propTypes2.default.number.isRequired,
  step: _propTypes2.default.number.isRequired,
  value: _propTypes2.default.instanceOf(Date).isRequired,
  showLabels: _propTypes2.default.bool,
  isNow: _propTypes2.default.bool,
  slotPropGetter: _propTypes2.default.func,
  timeGutterFormat: _propTypes3.dateFormat,
  culture: _propTypes2.default.string
};
TimeSlotGroup.defaultProps = {
  timeslots: 2,
  step: 30,
  isNow: false,
  showLabels: false
};
exports.default = TimeSlotGroup;
module.exports = exports['default'];