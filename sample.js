function getOption() {
  selectElement = document.querySelector('#selectOptions');
  output = selectElement.value;
  if (output == 'health') {
    addHealthTable();
  }
  if (output == 'poverty') {
    addPovertyTable();
  }
}

let table = document.getElementById('table');
function addHealthTable() {
  let tbl = document.createElement('table');
  let tblBody = document.createElement('tbody');
  let tableHead = document.createElement('thead');
  table.appendChild(tbl);
  let tr = document.createElement('tr');
  tableHead.appendChild(tr);
  let tr1 = document.createElement('th');
  let tr1Text = document.createTextNode('Indicator Name');
  tr1.appendChild(tr1Text);
  tr.appendChild(tr1);
  let tr2 = document.createElement('th');
  let tr2Text = document.createTextNode('Black Rate');
  tr2.appendChild(tr2Text);
  tr.appendChild(tr2);
  let tr3 = document.createElement('th');
  let tr3Text = document.createTextNode('White Rate');
  tr3.appendChild(tr3Text);
  tr.appendChild(tr3);
  tr1.style.width = '50%';
  tr2.style.width = '25%';
  tr3.style.width = '25%';
  let closeBtn = document.createElement('th');
  let closeBtnText = document.createTextNode('X');
  closeBtn.appendChild(closeBtnText);
  tr.appendChild(closeBtn);
  closeBtn.style.cursor = 'pointer';
  fetch('https://hardcore-mayer-7938e9.netlify.app/.netlify/functions/health')
    .then((response) => response.json())
    .then((data) => {
      let infoName = data.data.map(function (element) {
        return `${element.Name}`;
      });
      let bRate = data.data.map(function (element) {
        return `${element.BlackRate}`;
      });
      let wRate = data.data.map(function (element) {
        return `${element.WhiteRate}`;
      });
      for (var i = 0; i < data.data.length; i++) {
        let row = document.createElement('tr');
        let cell1 = document.createElement('td');
        let cellText1 = document.createTextNode(infoName[i]);
        cell1.appendChild(cellText1);
        row.appendChild(cell1);
        let cell2 = document.createElement('td');
        let cellText2 = document.createTextNode(bRate[i]);
        cell2.appendChild(cellText2);
        row.appendChild(cell2);
        let cell3 = document.createElement('td');
        let cellText3 = document.createTextNode(wRate[i]);
        cell3.appendChild(cellText3);
        row.appendChild(cell3);
        tblBody.appendChild(row);
        cell1.style.width = '50%';
        cell2.style.width = '25%';
        cell3.style.width = '25%';
      }
      tbl.appendChild(tableHead);
      tbl.appendChild(tblBody);
      tbl.setAttribute('border', '2');
      tbl.className = 'table table-striped';
    })
    .catch(console.error);
  closeBtn.addEventListener('click', () => {
    closeBtn.parentElement.parentElement.parentElement.style.display = 'none';
  });
}

function addPovertyTable() {
  let table = document.getElementById('table');
  let tbl = document.createElement('table');
  let tblBody = document.createElement('tbody');
  let tableHead = document.createElement('thead');
  table.appendChild(tbl);
  let tr = document.createElement('tr');
  tableHead.appendChild(tr);
  let tr1 = document.createElement('th');
  let tr1Text = document.createTextNode('Indicator Name');
  tr1.appendChild(tr1Text);
  tr.appendChild(tr1);
  let tr2 = document.createElement('th');
  let tr2Text = document.createTextNode('Black Rate');
  tr2.appendChild(tr2Text);
  tr.appendChild(tr2);
  let tr3 = document.createElement('th');
  let tr3Text = document.createTextNode('White Rate');
  tr3.appendChild(tr3Text);
  tr.appendChild(tr3);
  tr1.style.width = '50%';
  tr2.style.width = '25%';
  tr3.style.width = '25%';
  let closeBtn = document.createElement('th');
  let closeBtnText = document.createTextNode('X');
  closeBtn.appendChild(closeBtnText);
  tr.appendChild(closeBtn);
  closeBtn.style.cursor = 'pointer';

  fetch('https://hardcore-mayer-7938e9.netlify.app/.netlify/functions/poverty')
    .then((response) => response.json())
    .then((data) => {
      let infoName = data.data.map(function (element) {
        return `${element.Name}`;
      });
      let bRate = data.data.map(function (element) {
        return `${element.BlackRate}`;
      });
      let wRate = data.data.map(function (element) {
        return `${element.WhiteRate}`;
      });
      for (var i = 0; i < data.data.length; i++) {
        let row = document.createElement('tr');
        let cell1 = document.createElement('td');
        let cellText1 = document.createTextNode(infoName[i]);
        cell1.appendChild(cellText1);
        row.appendChild(cell1);
        let cell2 = document.createElement('td');
        let cellText2 = document.createTextNode(bRate[i]);
        cell2.appendChild(cellText2);
        row.appendChild(cell2);
        let cell3 = document.createElement('td');
        let cellText3 = document.createTextNode(wRate[i]);
        cell3.appendChild(cellText3);
        row.appendChild(cell3);
        tblBody.appendChild(row);
        cell1.style.width = '50%';
        cell2.style.width = '25%';
        cell3.style.width = '25%';
      }
      tbl.appendChild(tableHead);
      tbl.appendChild(tblBody);
      tbl.setAttribute('border', '2');
      tbl.className = 'table table-striped';
    })
    .catch(console.error);
  closeBtn.addEventListener('click', () => {
    closeBtn.parentElement.parentElement.parentElement.style.display = 'none';
  });
}

// document.getElementById('seeData').addEventListener('click', appendData);
// function appendData() {
//   fetch('https://hardcore-mayer-7938e9.netlify.app/.netlify/functions/readAll')
//     .then((response) => response.json())
//     .then((data) => {
//       let mainContainer = document.getElementById('myData');
//       let titleBox = document.getElementById('title');
//       for (let i = 0; i < data.data.length; i++) {
//         let div = document.createElement('div');
//         titleBox.innerHTML = "Indicators for Women's Health";
//         div.innerHTML = data.data[i];
//         mainContainer.appendChild(div);
//         document.getElementById('seeData').disabled = true;
//       }
//     })
//     .catch(console.error);
// }
