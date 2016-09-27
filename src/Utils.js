/**
 * Convert a number to human readable time.
 * 10.5 -> "10:30"
 * @param {Number} time
 * @returns {String} Human readable time
 */
function formatTime(time) {
  if (Number.isInteger(time))
    return time + ":00";
  else
    return ((time - 0.5) + ":30");
}

const START_TIME = 9.5;
const END_TIME = 18;
const localStorageKey = 'calender_state';
const otherTaskStorageKey = 'other_tasks';

export default {
  formatTime,
  localStorageKey,
  otherTaskStorageKey,
  START_TIME,
  END_TIME
}
