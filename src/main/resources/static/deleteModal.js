async function getUserDataByIdDel(userId) {
    const response = await fetch(`/api/admin/${userId}`);
    return await response.json();
}

let inputID;

async function deleteModal(modal) {

    modal.addEventListener("show.bs.modal", async function (event) {

        const userId = event.relatedTarget.dataset.userId;
        const userDel = await getUserDataByIdDel(userId)

        displayRolesDel(userDel.roles)

        const modalBodyDel = modal.querySelector(".modal-body-del");

         inputID = modalBodyDel.querySelector("input[data-user-id='id']")
        const inputName = modalBodyDel.querySelector("input[data-user-id='name']")
        const inputLastName = modalBodyDel.querySelector("input[data-user-id='lastname']")
        const inputAge = modalBodyDel.querySelector("input[data-user-id='age']")
        const inputEmail = modalBodyDel.querySelector("input[data-user-id='email']")


        inputID.value = userDel.id
        inputName.value = userDel.name
        inputLastName.value = userDel.lastName
        inputAge.value = userDel.age
        inputEmail.value = userDel.email

    })

}


function displayRolesDel(roles) {
    const rolesContainer = document.querySelector('#checkRolesDelete');

    while (rolesContainer.firstChild) {
        rolesContainer.removeChild(rolesContainer.firstChild);
    }

    roles.forEach(role => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = role.id;
        //checkbox.value = role.role; // Значение чекбокса будет ролью

        const label = document.createElement('label');
        label.htmlFor = checkbox.id; // Связываем метку с чекбоксом
        label.textContent = role.role; // Текст метки будет ролью

        rolesContainer.appendChild(label);
        rolesContainer.appendChild(checkbox);
    })


}