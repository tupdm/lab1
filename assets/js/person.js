const persons = [
  { id: 1, name: "Rose", age: 25, gender: false },
  { id: 2, name: "Jisoo", age: 27, gender: true },
  { id: 3, name: "Lisa", age: 25, gender: true },
  { id: 4, name: "Jennie", age: 26, gender: false },
  { id: 5, name: "a", age: 26, gender: false },
];
// --------------------------------------------------------------------------------------------------------------------
// Display person
let lastRow = null;

let showPersons = (array) => {
let table = document.getElementById("person_table");
let saveButton = document.getElementById("save_button");

// Clear existing table rows
table.innerHTML = "";

// Create table headers
let headerRow = document.createElement("tr");
let headers = ["ID", "Name", "Age", "Gender"];
for (let header of headers) {
  let th = document.createElement("th");
  th.textContent = header;
  headerRow.appendChild(th);
}
table.appendChild(headerRow);

// Create table rows for each person
for (let person of array) {
  let row = document.createElement("tr");
  let { id, name, age, gender } = person;
  row.innerHTML = `
    <td>${id}</td>
    <td>${name}</td>
    <td>${age}</td>
    <td>${gender ? "Male" : "Female"}</td>
  `;
  row.addEventListener("click", () => {
    if (row === lastRow) {
      // Clear input fields and deselect row
      document.getElementById("id").value = "";
      document.getElementById("id").disabled = false;
      document.getElementById("id").style.cursor = "";
      document.getElementById("name").value = "";
      document.getElementById("age").value = "";
      document.getElementById("male").checked = true;
      document.getElementById("female").checked = false;
      row.classList.remove("selected");
      row.style.backgroundColor = "white";
      lastRow = null;

      // Enable save button
      saveButton.disabled = false;
      saveButton.style.cursor = "pointer";
    } else {
      // Set input fields and select row
      document.getElementById("id").value = id;
      document.getElementById("id").disabled = true;
      document.getElementById("id").style.cursor = "not-allowed";
      document.getElementById("name").value = name;
      document.getElementById("age").value = age;
      if (gender) {
        document.getElementById("male").checked = true;
      } else {
        document.getElementById("female").checked = true;
      }
      if (lastRow) {
        lastRow.classList.remove("selected");
        lastRow.style.backgroundColor = "white";
      }
      row.classList.add("selected");
      row.style.backgroundColor = "pink";
      lastRow = row;

      // Disable save button and change cursor
      saveButton.disabled = true;
      saveButton.style.cursor = "not-allowed";
    }
  });
  table.appendChild(row);
}
}

showPersons(persons);
// --------------------------------------------------------------------------------------------------------------------
//   Add person
let addPerson = () => {
  let id = document.getElementById("id").value;
  let name = document.getElementById("name").value;
  let age = document.getElementById("age").value;
  let gender = document.querySelector('input[name="gender"]:checked').value === "true";

  if (!id) {
    alert("Please enter an ID.");
    return;
  }
  if (id < 0) {
    alert("Please enter valid ID.");
    return;
  }

  if (persons.some((person) => person.id == id)) {
    alert("ID is already used by another person. Please enter a unique ID.");
    return;
  }

  if (!name) {
    alert("Please enter a name.");
    return;
  }

  if (!age) {
    alert("Please enter an age.");
    return;
  }

  let newPerson = { id, name, age, gender };
  persons.push(newPerson);

  showPersons(persons);

  // Clear input
  document.getElementById("id").value = "";
  document.getElementById("name").value = "";
  document.getElementById("age").value = "";
  document.querySelector('input[name="gender"]:checked').checked = true;
}
// -------------------------------------------------------------------------------------------------------------
let updatePerson = () => {


if (lastRow) {
  let id = document.getElementById("id").value;
  let name = document.getElementById("name").value;
  let age = document.getElementById("age").value;
  let gender = document.getElementById("male").checked;
  // Get index of person in persons array
  let index = persons.findIndex((person) => person.id == id);

    // Update person data
    persons[index].name = name;
    persons[index].age = age;
    persons[index].gender = gender;

    // Update table with new person data
    showPersons(persons);

    // Clear input fields and deselect row
    document.getElementById("id").value = "";
    document.getElementById("id").disabled = false;
    document.getElementById("id").style.cursor = "";
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("male").checked = true;
    document.getElementById("female").checked = false;
    lastRow.classList.remove("selected");
    lastRow = null;

    // Enable save button
    document.getElementById("save_button").disabled = false;
    document.getElementById("save_button").style.cursor = "pointer";
} else {
  alert("Please select a person to update!");
}
}

// -------------------------------------------------------------------------------------------------------------

let sortPerson = ()=> {
  persons.sort((a, b) => {
    let nameCompare = a.name.localeCompare(b.name);
    return nameCompare !== 0 ? nameCompare : b.age - a.age;
  });
  showPersons(persons);
}

// -------------------------------------------------------------------------------------------------------------
let searchPerson = () => {
let min = document.getElementById("min").value;
let max = document.getElementById("max").value;
if (min > max) {
  alert("Please enter valid MIN MAX");
}else if(!min || !max) {
  showPersons(persons);
}
else {
  let newPersons = persons.filter(
      (element) => element.age >= min && element.age <= max
    );
    showPersons(newPersons);
}
};

// -------------------------------------------------------------------------------------------------------------
let deletePerson = () => {
if (lastRow) {
  if(confirm("Are you sure to delete this person?") == true){
  let personId = parseInt(document.getElementById("id").value);
  let index = persons.findIndex(person => person.id === personId);

    persons.splice(index, 1);

    // Clear input fields and deselect row
    document.getElementById("id").value = "";
    document.getElementById("id").disabled = false;
    document.getElementById("id").style.cursor = "";
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("male").checked = true;
    document.getElementById("female").checked = false;
    lastRow.classList.remove("selected");
    lastRow = null;

    // Enable save button
    let saveButton = document.getElementById("save_button");
    saveButton.disabled = false;
    saveButton.style.cursor = "pointer";

    // Refresh table
    showPersons(persons);
  
}
}else{
  alert("Please select a person to delete!")
}
}