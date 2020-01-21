import React from "react";
import moment from "moment";


export const CalendarToolbar = toolbar => {
  var label = moment() ;
  
    const goToBack = () => {
     label = moment().subtract(1, 'days').startOf('day');
     
    };
    const goToNext = () => {
      label =moment().add(1, 'days').startOf('day');
    };
    const goToCurrent = () => {
      toolbar.onNavigate("TODAY");
    };
  

  
    return (
      <div className="big-calendar-header">
        <div className="float-left">
          <label><span>
          <span>{label.format("DD")} </span>
          <span>{label.format("MMMM")} </span>
          <span> {label.format("YYYY")}</span>
        </span></label>
        </div>
  
        <div className="float-right">
          <div>
            <button
              className="btn btn-primary calendar-today-btn mr-2"
              onClick={goToCurrent}
            >
              Today
            </button>
            <button className="btn calendar-prev-btn mr-1" onClick={goToBack}>
              <span className="simple-icon-arrow-left" />
            </button>
            <button className="btn calendar-next-btn" onClick={goToNext}>
              <span className="simple-icon-arrow-right" />
            </button>
          </div>
        </div>
      </div>
    );
  };
  