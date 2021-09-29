let dataButton = document.querySelector('.show_data');

dataButton.addEventListener('click', showData);

function myFunction(xml) {
  console.log('YES');
  let studentSection = document.querySelector('.student_data');
  let data = xml.responseXML;
  //   console.log(data);

  let students = data.getElementsByTagName('student');
  console.log(students[0].children[0].innerHTML);

  for (i = 0; i < students.length; i++) {
    let div = document.createElement('div');
    let attendance = parseInt(students[i].children[4].innerHTML);
    console.log(attendance);
    let code;
    if (attendance >= 95) {
      code = 1;
    } else if (attendance >= 85) {
      code = 2;
    } else if (attendance >= 75) {
      code = 3;
    } else {
      code = 4;
    }
    div.innerHTML = `
    <div class="basic_info">
        <h2>${students[i].children[0].innerHTML}</h2>
        <p>Roll No. ${students[i].children[1].innerHTML}</p>
        <p>Semester : ${students[i].children[2].innerHTML}</p>
        <p>Branch : ${students[i].children[3].innerHTML}</p>    
    </div>
    <div class="attendance">
        <p>Attendance</p>
        <button class = "code code_${code}"></button>
    </div>
    `;
    studentSection.append(div);
  }
}

function showData() {
  console.log('In show data');
  document.querySelector('.data_header').style.display = 'block';
  let request = new XMLHttpRequest();
  //   console.log(request);
  request.open('GET', '/student.xml', true);
  request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      //   console.log(this);
      myFunction(this);
    }
  };
  request.send();
}
