//disable weekends and holidays on form datepicker
let datesForDisable = ['0,6', '12/25'];

$(document).ready(function () {
  $('#calendar').datepicker({
    maxViewMode: 3,
    orientation: 'top left',
    daysOfWeekDisabled: '0,6',
    datesDisabled: [
      '01/01',
      '07/04',
      '12,25',
      '05/30/2022',
      '09/05/2022',
      '11/11/2022',
      '11/24/2022',
      '12/26/2022',
      '01/02/2023',
      '01/16/2023',
      '05/29/2023',
      '09/04/2023',
      '11/10/2023',
      '11/23/2023',
    ],
    autoclose: true,
    todayHighlight: true,
  });
});

//calendar display
// let dt = new Date();
// function renderDate() {
//   dt.setDate(1);
//   let day = dt.getDay();
//   let today = new Date();
//   let endDate = new Date(dt.getFullYear(), dt.getMonth() + 1, 0).getDate();
//   let prevDate = new Date(dt.getFullYear(), dt.getMonth(), 0).getDate();
//   let months = [
//     'January',
//     'February',
//     'March',
//     'April',
//     'May',
//     'June',
//     'July',
//     'August',
//     'September',
//     'October',
//     'November',
//     'December',
//   ];
//   document.getElementById('month').innerHTML = months[dt.getMonth()];
//   document.getElementById('date_str').innerHTML = dt.toDateString();
//   let cells = '';
//   for (x = day; x > 0; x--) {
//     cells += "<div class='prev_date'>" + (prevDate - x + 1) + '</div>';
//   }
//   console.log(day);
//   for (i = 1; i <= endDate; i++) {
//     if (i == today.getDate() && dt.getMonth() == today.getMonth())
//       cells += "<div class='today'>" + i + '</div>';
//     else cells += '<div>' + i + '</div>';
//   }
//   document.getElementsByClassName('days')[0].innerHTML = cells;
// }
// function moveDate(para) {
//   if (para == 'prev') {
//     dt.setMonth(dt.getMonth() - 1);
//   } else if (para == 'next') {
//     dt.setMonth(dt.getMonth() + 1);
//   }
//   renderDate();
// }
const calendarEvents = [];
const saveAppointment = () => {
  let userName = document.getElementById('userName').value;
  console.log(userName);
  let date = document.getElementById('calendar').value;
  console.log(date);
  let time = document.getElementById('time').value;
  console.log(time);
  let id = Math.floor(Math.random() * 100);
  console.log(id);
  const eventObject = {
    id: id,
    name: userName,
    date: date,
    description: time,
    type: 'event',
    color: 'orange',
  };
  console.log(eventObject);
  calendarEvents.push(eventObject);
  console.log(calendarEvents);
  return calendarEvents;
};

$(document).ready(function () {
  $('#calendar2').evoCalendar({
    calendarEvents,
  });
});
