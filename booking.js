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

const getAppointments = async () => {
  await fetch(
    'https://gallant-allen-474ad7.netlify.app/.netlify/functions/get-appointments'
  )
    .then((response) => response.json())
    .then((data) => {
      const calendarEvents = data.data.map((item) => {
        const eventObject = {
          id: item.id,
          name: item.name,
          date: item.date,
          description: item.time,
          type: 'event',
          color: '#026ee0',
        };
        return eventObject;
      });
      $(document).ready(function () {
        $('#calendar2').evoCalendar({
          theme: 'Orange Coral',
          calendarEvents,
        });
      });
    })
    .catch(console.error);
};
getAppointments();

const confirmAppointment = async () => {
  let formButton = document.getElementById('formButton');
  let datePicked = document.getElementById('calendar').value;
  let timePicked = document.getElementById('time').value;
  await fetch(
    'https://gallant-allen-474ad7.netlify.app/.netlify/functions/get-appointments'
  )
    .then((response) => response.json())
    .then((data) => {
      const calendarEvents = data.data.map((item) => {
        if (item.date === datePicked && item.time === timePicked) {
          document.getElementById('conflictMessage').style.display = 'block';
        } else if (item.date === datePicked && item.time !== timePicked) {
          document.getElementById('availableMessage').style.display = 'block';
          formButton.disabled = false;
        } else {
          document.getElementById('conflictMessage').style.display = 'none';
          document.getElementById('availableMessage').style.display = 'none';
        }
      });
    })
    .catch(console.error);
};

window.onload = () => {
  $('#myModal').modal('show');
};

const closeAvailMessage = () => {
  document.getElementById('availableMessage').style.display = 'none';
};
const closeConflictMessage = () => {
  document.getElementById('conflictMessage').style.display = 'none';
};
