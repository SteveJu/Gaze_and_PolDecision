var startTime, endTime;

function time_start() {
    startTime = new Date();
};

function time_record() {
    endTime = new Date();
    var timeDiff = endTime - startTime; //in ms
    // strip the ms
    timeDiff /= 1000;

    // get seconds
    var seconds = Math.round(timeDiff);
    alert(seconds+" seconds");
}