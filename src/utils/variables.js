var currentLabGroup = 0;
var messageQueue;
var sessionStarted = false;

/**
 * 
 * @param {Number} a 
 * @param {Number} b 
 * @returns True if bigger a more urgent than b otherwise false.
 */
 const queueComparator = (a, b) => {
    if((a[0].toString()[0] === currentLabGroup.toString()) && (b[0].toString()[0] === currentLabGroup.toString())) {
        // Default behaviour
        return a[1] < b[1];
    } else if ((a.toString()[0] === currentLabGroup.toString())) {
        return true;
    } else if ((b.toString()[0] === currentLabGroup.toString())) {
        return false;
    }
    // Default behaviour
    return a[1] < b[1];
}

module.exports = {
    currentLabGroup,
    messageQueue,
    sessionStarted
}