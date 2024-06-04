var nameInput = document.getElementById("sName");
var urlInput = document.getElementById("sAdress");
var submitBtn = document.getElementById("submitBtn");
var bookArr = [];


if (localStorage.getItem("bookArr") != null) {
  bookArr = JSON.parse(localStorage.getItem("bookArr"));
  displayAllData();
}

function visitSite(idx) {
  var httpChecker = /^http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\//;
  if (httpChecker.test(bookArr[idx].address)) {
    open(bookArr[idx].address);
  } else {
    open(`https://${bookArr[idx].address}`);
  }
}

function addBook() {
  var name = nameInput.value;
  var address = urlInput.value;
  var namePattern = /^[a-zA-Z0-9]{3,}$/;
  var urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;

  var isNameValid = namePattern.test(name);
  var isUrlValid = urlPattern.test(address);

  // Validate name input
  if (!isNameValid) {
    if (nameInput.classList.contains("is-valid")) {
      nameInput.classList.replace("is-valid", "is-invalid");
    }
    nameInput.classList.add("is-invalid");
  } else {
    if (nameInput.classList.contains("is-invalid")) {
      nameInput.classList.replace("is-invalid", "is-valid");
    }
    nameInput.classList.add("is-valid");
  }

  // Validate URL input
  if (!isUrlValid) {
    if (urlInput.classList.contains("is-valid")) {
      urlInput.classList.replace("is-valid", "is-invalid");
    }
    urlInput.classList.add("is-invalid");
  } else {
    if (urlInput.classList.contains("is-invalid")) {
      urlInput.classList.replace("is-invalid", "is-valid");
    }
    urlInput.classList.add("is-valid");
  }

  // Stop function if either input is invalid
  if (!isNameValid || !isUrlValid) {
    showErrorModal();
    return;
  }

  // Prefix address with "http://" if missing
  if (!/^https?:\/\//i.test(address)) {
    address = "http://" + address;
  }

  var book = {
    name: name,
    address: address,  
  };

  bookArr.push(book);
  localStorage.setItem("bookArr", JSON.stringify(bookArr));
  displayLastData();
  clearForm();
}

function displayLastData() {
  var lastIndex = bookArr.length - 1;
  var container = `
    <tr>
    <td>${lastIndex + 1}</td>
    <td>${bookArr[lastIndex].name}</td>
    <td><a onclick="visitSite(${lastIndex})" class="btn btn-visit" href="#" target="_blank"><i class="fa-solid fa-eye"></i> Visit</a></td>
    <td><button class="btn btn-danger" onclick="deleteBook(${lastIndex})"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
    </tr>
  `;
  document.getElementById("tableContent").innerHTML += container;
}

function displayAllData() {
  var container = ``;
  for (var i = 0; i < bookArr.length; i++) {
    container += `
      <tr>
      <td>${i + 1}</td>
      <td>${bookArr[i].name}</td>
      <td><a onclick="visitSite(${i})" class="btn btn-visit" href="#" target="_blank"><i class="fa-solid fa-eye"></i> Visit</a></td>
      <td><button class="btn btn-danger" onclick="deleteBook(${i})"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
      </tr>
    `;
  }
  document.getElementById("tableContent").innerHTML = container;
}

function deleteBook(index) {
  bookArr.splice(index, 1);
  localStorage.setItem("bookArr", JSON.stringify(bookArr));
  displayAllData();
}

function showErrorModal() {
  var errorModal = new bootstrap.Modal(document.getElementById("errorModal"));
  errorModal.show();
}

function clearForm() {
  nameInput.value = "";
  urlInput.value = "";
  nameInput.classList.remove("is-valid", "is-invalid");
  urlInput.classList.remove("is-valid", "is-invalid");
}

submitBtn.addEventListener("click", function(event) {
  event.preventDefault(); // Prevent default form submission
  addBook();
});
