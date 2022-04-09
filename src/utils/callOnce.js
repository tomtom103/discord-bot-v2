function callOnce(fn, context) {
    let result;
    return function() {
        if (fn) {
            result = fn.apply(context || this, arguments);
            fn = context = null;
        }
        return result;
    }
}

module.exports = {
    callOnce
}