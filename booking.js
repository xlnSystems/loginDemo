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
