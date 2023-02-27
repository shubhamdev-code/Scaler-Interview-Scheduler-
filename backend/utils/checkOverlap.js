const checkOverlap = (interview, startTime, endTime) => {
  let currStartTime = new Date(interview.startTime);
  let currEndTime = new Date(interview.endTime);

  if (
    startTime <= currStartTime &&
    endTime >= currStartTime &&
    endTime <= currEndTime
  )
    return true;
  if (
    startTime >= currStartTime &&
    startTime <= currEndTime &&
    endTime >= currEndTime
  )
    return true;
  if (startTime >= currStartTime && endTime <= currEndTime) return true;
  if (startTime <= currStartTime && endTime >= currEndTime) return true;
  return false;
};

module.exports = checkOverlap;
