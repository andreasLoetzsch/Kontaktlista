const contactCreateBtn = document.getElementById("btn-create");
const name = document.getElementById("name");
const phoneNum = document.getElementById("phone-number");
const contactList = document.getElementById("contact-list");
const inputFields = document.getElementById("input");
const btnDeleteList = document.getElementById("btn-delete-list");

const createErrorMsg = (element) => {
  const errorMsgExist = element.querySelector("#error-msg");
  if (errorMsgExist) {
    return;
  }
  const errorMsg = document.createElement("p");
  errorMsg.id = "error-msg";
  errorMsg.innerHTML = "Båda fälten måste vara i fyllda";
  errorMsg.style.color = "red";
  element.append(errorMsg);
};

const deleteErrorMsg = (element) => {
  const errorMsg = element.querySelector("#error-msg");
  if (!errorMsg) {
    return;
  }
  errorMsg.remove();
};

const createContact = () => {
  if (name.value == "" || phoneNum.value == "") {
    createErrorMsg(inputFields);
  } else {
    const contact = document.createElement("li");
    contact.innerHTML = `<input type="text" value="${name.value}" disabled>
         <input type="tel" value="${phoneNum.value}" disabled>
         <button id="btn-edit" class="btn-edit">Redigera</button>
         <button id="btn-delete" class="btn-delete">Radera</button>`;
    contactList.appendChild(contact);
    deleteErrorMsg(inputFields);
  }
  name.value = "";
  phoneNum.value = "";
};

const toggleEdit = (contactItem) => {
  const nameInput = contactItem.querySelector("input[type='text']");
  const phoneInput = contactItem.querySelector("input[type='tel']");
  const editBtn = contactItem.querySelector(".btn-edit");
  if (nameInput.disabled && phoneInput.disabled) {
    nameInput.disabled = false;
    phoneInput.disabled = false;
    editBtn.textContent = "Spara";
  } else {
    if (nameInput.value == "" || phoneInput.value == "") {
      createErrorMsg(contactItem);
      return;
    }
    nameInput.disabled = true;
    phoneInput.disabled = true;
    editBtn.textContent = "Redigera";
    deleteErrorMsg(contactItem);
  }
};

const deleteContact = (contactItem) => {
  contactItem.remove();
};

const deleteWholeList = () => {
  contactList.replaceChildren();
};

contactCreateBtn.addEventListener("click", createContact);
btnDeleteList.addEventListener("click", deleteWholeList);

contactList.addEventListener("click", function (e) {
  const contactItem = e.target.closest("li");
  if (e.target.classList.contains("btn-edit")) {
    toggleEdit(contactItem);
  }
  if (e.target.classList.contains("btn-delete")) {
    deleteContact(contactItem);
  }
});
