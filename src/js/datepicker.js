import {getMonthName} from "./utils";

export default function DatePicker({timeframe, year, month, handleFetch}) {
    let label = '';
    if (timeframe === 'year'){
        label = year;
    } else {
        label = `${getMonthName(month)} '${year - 2000}`;
    }

    function onPrevClick() {
        let newYear = year;
        let newMonth = month;
        if (timeframe === 'year'){
            newYear = year - 1;
        } else if (month === 1) {
            newMonth = 12;
            newYear = year - 1;
        } else {
            newMonth = month - 1;
        }
        handleFetch(timeframe, newYear, newMonth);
    }

    function onNextClick() {
        let newYear = year;
        let newMonth = month;
        if (timeframe === 'year'){
            newYear = year + 1;
        } else if (month === 12) {
            newMonth = 1;
            newYear = year + 1;
        } else {
            newMonth = month + 1;
        }
        handleFetch(timeframe, newYear, newMonth);
    }

    function onSwitchClick() {
        let newTimeframe = timeframe;
        if (timeframe === 'year'){
            newTimeframe = 'month';
        } else {
            newTimeframe = 'year';
        }
        handleFetch(newTimeframe, year, month);
    }

    return (
        <div className="col-lg-6 col-md-12 text-center">
            <div className="btn-block text-center">
                <div className="btn-group-sm">
                    <button className="btn btn-sm" id="btn-time-back" onClick={onPrevClick}>
                        <i className="fas fa-chevron-left"></i>
                    </button>
                    <button className="btn btn-sm" id="btn-timeframe" onClick={onSwitchClick}>{label}</button>
                    <button className="btn btn-sm" id="btn-time-forward" onClick={onNextClick}>
                        <i className="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}