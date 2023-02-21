let persons = [
    { id: 1, name: "An", age: 19, gender: false },
    { id: 2, name: "Tu", age: 23, gender: true },
    { id: 3, name: "Thang", age: 20, gender: true },
    { id: 4, name: "Thang", age: 18, gender: true },
  ];
  let notExsit = (id) => {
    return persons.find((element) => element.id == id) == undefined;
  };
  
  let showPerson = (persons) => {
    let table = document.querySelector("#table_content");
    table.innerHTML = "";
    persons.forEach((element) => {
      const ele = document.createElement("tr");
  
      let { id, name, age, gender } = element;
      let newS = `<td>${id}</td> <td>${name}</td> <td>${age}</td> <td>${
        gender == true ? "Male" : "Female"
      }</td>`;
      ele.setAttribute("onclick", "showInput(" + id + ")");
      ele.setAttribute("name", id);
      ele.innerHTML = newS;
      table.appendChild(ele);
    });
  };
  let showInput = (id) => {
    let a = persons.find((element) => {
      return element.id == id;
    });
    let inputID = document.querySelector("#id");
    inputID.value = a.id;
    inputID.setAttribute("readonly", true);
    inputID.setAttribute("disabled", true);
    let c = "" + id;
    let node = document.getElementsByName(c)[0];
    node.setAttribute("style", "background-color: aqua;");
    let inputName = document.querySelector("#name");
    inputName.value = a.name;
    let inputAge = document.querySelector("#age");
    inputAge.value = a.age;
    let inputGender = document.getElementsByName("gender");
    if (a.gender == true) {
      inputGender[0].checked = true;
    } else inputGender[1].checked = true;
  };
  function addPerson() {
    let id = document.getElementById("id").value;
    let name = document.getElementById("name").value;
    let age = Number(document.getElementById("age").value);
    let gender =
      document.getElementsByName("gender")[0].checked == true ? true : false;
    if (id == "") alert("Moi ban nhap ID");
    else if (name == "") alert("Moi ban nhap Name");
    else if (age == "") alert("Moi ban nhap Age");
    else {
      if (!notExsit(id)) alert("ID da ton tai");
      else {
        let table = document.querySelector("#table_content");
        const ele = document.createElement("tr");
        ele.addEventListener("click", showInput());
        let newS = `<td>${id}</td> <td>${name}</td> <td>${age}</td> <td>${
          gender == true ? "Male" : "Female"
        }</td>`;
        ele.innerHTML = newS;
  
        table.appendChild(ele);
        persons.push({ id, name, age, gender });
      }
    }
  }
  let sort = () => {
    persons.sort((a, b) => {
      if (a.name == b.name) return a.age - b.age;
      else return a.name.localeCompare(b.name);
    });
    showPerson(persons);
  };
  
  let search = () => {
    let min = document.getElementById("min").value;
    let max = document.getElementById("max").value;
    if (min > max) {
      alert("Nhap lai Min,Max !!");
    } else {
      let newPersons = persons.filter(
        (element) => element.age >= min && element.age <= max
      );
      showPerson(newPersons);
    }
  };
  
  let update = () => {
    let inputID = document.getElementById("id");
    let id = inputID.value;
    let name = document.getElementById("name").value;
    let age = Number(document.getElementById("age").value);
    let gender =
      document.getElementsByName("gender")[0].checked == true ? true : false;
    if (name == "") alert("Moi ban nhap Name");
    else if (age == "") alert("Moi ban nhap Age");
    else {
      persons.forEach((element) => {
        if (element.id == id) {
          element.name = name;
          element.age = age;
          element.gender = gender;
        }
      });
      showPerson(persons);
      inputID.removeAttribute("readonly", false);
      inputID.removeAttribute("disabled", false);
      let node = document.getElementsByName("" + id)[0];
      node.removeAttribute("onclick");
    }
  };
  
  document.readyState = showPerson(persons);