import { createSelector } from 'reselect';
import moment from 'moment';

const officeHoursSelector = state => state.officeHours;
const currentDateSelector = state => state.currentDate;

export const pointsOfDaySelector = createSelector(
  officeHoursSelector,
  currentDateSelector,
  (officeHours, currentDate) => {
    let arr = [];
    if(officeHours[currentDate]){
      return officeHours[currentDate].points;
    }
    let days = Object.keys(officeHours);
    for(let i = 0; i < days; i++) {
      arr = arr.concat(officeHours[days[i]]);
    }

    return arr;
  }
);

export const totalHoursOfDaySelector = createSelector(
  pointsOfDaySelector,
  (points) => {
    let total = 0;
    let currentIn = null;

    for(let i = 0; i < points.length; i++) {
      let {pointType, hour, minute} = points[i];
      if(pointType === 'in') {
        currentIn = {hour, minute};
        continue;
      }

      let lastIn = moment({...currentIn});
      let currentOut = moment({hour, minute});
      // console.log(lastIn.duration(currentOut));
    }
    return total;
  }
);
