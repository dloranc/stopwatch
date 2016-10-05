'using strict';

$(document).ready(function() {
    let stopwatchText = $('.stopwatch .time');

    let stopwatch = null;
    let startDate = null;
    let lastDuration = moment.duration(0);
    let hasReset = false;

    $('.button--run').click(startOrPauseStopwatch);
    $('.button--reset').click(resetStopwatch);

    $(document).keypress(function (event) {
        if (event.keyCode == 32) {
            startOrPauseStopwatch();
        }

        if (event.keyCode == 114 || event.keyCode == 82) {
            resetStopwatch();
        }
    });

    function startOrPauseStopwatch() {
        hasReset = false;
        $this = $('.button--run');

        if ($this.hasClass('button--play')) {
            startDate = new Date();
            stopwatch = setInterval(stopwatchFunction, 10);

            $this.removeClass('button--play');
            $this.addClass('button--stop');
        } else {
            clearInterval(stopwatch);
            lastDuration = lastDuration + moment.duration(Date.now() - startDate);

            $this.removeClass('button--stop');
            $this.addClass('button--play');
        }

        $('.button--reset').toggleClass('button--disabled');
    }

    function resetStopwatch() {
        if (!hasReset) {
            stopwatchText.text('00:00:00.000');

            addLastTimeToList();

            lastDuration = moment.duration(0);
            hasReset = true;
        }
    }

    function addLastTimeToList() {
        let item = $('<div class="reset-list__item"></div>');
        let itemText = getFormattedString(moment.duration(lastDuration + lastDuration - lastDuration));
        item.text(itemText);
        $('.reset-list').append(item);
    }

    function getTime() {
        const duration = moment.duration(Date.now() - startDate + lastDuration);
        const formattedDate = getFormattedString(duration);

        return formattedDate;
    }

    function stopwatchFunction() {


        stopwatchText.text(getTime());
    }

    function getFormattedString(diff) {
        var hours = diff.hours();
        var minutes = diff.minutes();
        var seconds = diff.seconds();
        var milliseconds = diff.milliseconds();

        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        milliseconds = milliseconds < 100 ? '0' + milliseconds : milliseconds;
        milliseconds = milliseconds < 10 ? '0' + milliseconds : milliseconds;

        return `${hours}:${minutes}:${seconds}.${milliseconds}`;
    }
});