'use strict';

exports.__esModule = true;
exports.isSelected = isSelected;
exports.slotWidth = slotWidth;
exports.getCellAtX = getCellAtX;
exports.pointInBox = pointInBox;
exports.dateCellSelection = dateCellSelection;
function isSelected(event, selected) {
  if (!event || selected === null) {
    return false;
  }
  return [].concat(selected).indexOf(event) !== -1;
}

function slotWidth(rowBox, slots) {
  const rowWidth = rowBox.right - rowBox.left;
  const cellWidth = rowWidth / slots;

  return cellWidth;
}

function getCellAtX(rowBox, x, cellWidth, rtl, slots) {
  return rtl ? slots - 1 - Math.floor((x - rowBox.left) / cellWidth) : Math.floor((x - rowBox.left) / cellWidth);
}

function pointInBox(box, _ref) {
  const x = _ref.x;
  const y = _ref.y;
  return y >= box.top && y <= box.bottom && x >= box.left && x <= box.right;
}

function dateCellSelection(start, rowBox, box, slots, rtl) {
  let startIdx = -1;
  let endIdx = -1;
  const lastSlotIdx = slots - 1;

  const cellWidth = slotWidth(rowBox, slots);

  // Cell under the mouse
  const currentSlot = getCellAtX(rowBox, box.x, cellWidth, rtl, slots);

  // Identify row as either the initial row
  // or the row under the current mouse point
  const isCurrentRow = rowBox.top < box.y && rowBox.bottom > box.y;
  const isStartRow = rowBox.top < start.y && rowBox.bottom > start.y;

  // This row's position relative to the start point
  const isAboveStart = start.y > rowBox.bottom;
  const isBelowStart = rowBox.top > start.y;
  const isBetween = box.top < rowBox.top && box.bottom > rowBox.bottom;

  // This row is between the current and start rows, so entirely selected
  if (isBetween) {
    startIdx = 0;
    endIdx = lastSlotIdx;
  }

  if (isCurrentRow) {
    if (isBelowStart) {
      startIdx = 0;
      endIdx = currentSlot;
    } else if (isAboveStart) {
      startIdx = currentSlot;
      endIdx = lastSlotIdx;
    }
  }

  if (isStartRow) {
    // Select the cell under the initial point
    startIdx = endIdx = rtl ? lastSlotIdx - Math.floor((start.x - rowBox.left) / cellWidth) : Math.floor((start.x - rowBox.left) / cellWidth);

    if (isCurrentRow) {
      if (currentSlot < startIdx) {
startIdx = currentSlot;
} else {
endIdx = currentSlot;
} // Select current range
    }
    // The current row is below start row
    else if (start.y < box.y) {
      // Select cells to the right of the start cell
      endIdx = lastSlotIdx;
    } else {
      // Select cells to the left of the start cell
      startIdx = 0;
    }
  }

  return {startIdx, endIdx};
}
