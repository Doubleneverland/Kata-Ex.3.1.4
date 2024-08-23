//
async function getUserDataById(userId) {
    const response = await fetch(`/api/admin/${userId}`);
    return await response.json();
}


async function editModal(modal){

    modal.addEventListener("show.bs.modal", async function(event){

        const userId = event.relatedTarget.dataset.userId;
        const user = await getUserDataById(userId)

        const modalBody = modal.querySelector(".modal-body");

        const inputID = modalBody.querySelector("input[data-user-id='id']")
        const inputName = modalBody.querySelector("input[data-user-id='name']")
        const inputLastName = modalBody.querySelector("input[data-user-id='lastname']")
        const inputAge = modalBody.querySelector("input[data-user-id='age']")
        const inputEmail = modalBody.querySelector("input[data-user-id='email']")
        const inputPass = modalBody.querySelector("input[data-user-id='password']")
        if (inputPass !== null) {
            inputPass.value = user.password
        }

        inputID.value = user.id
        inputName.value = user.name
        inputLastName.value = user.lastName
        inputAge.value = user.age
        inputEmail.value = user.email

    })

}

async function fetchRoles() {
    try {
        const response = await fetch('/api/admin/roles');
        const roles = await response.json();
        displayRoles(roles);
    } catch (error) {
        console.error('Failed to fetch roles:', error);
    }
}

async function displayRoles(roles) {
    const rolesContainer = document.querySelector('#checkRoles');

    // Очистка контейнера
    while (rolesContainer.firstChild) {
        rolesContainer.removeChild(rolesContainer.firstChild);
    }

    // Создание чекбоксов для каждой роли
    roles.forEach(role => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = role.id; // Убедитесь, что ID уникален для каждого чекбокса
        checkbox.name = 'role';
        checkbox.value = role.role; // Значение чекбокса будет ролью
        checkbox.dataset.role = role.role; // Используем data-role вместо dataset.userId, если это более подходит для вашей логики

        const label = document.createElement('label');
        label.htmlFor = checkbox.id; // Связываем метку с чекбоксом
        label.textContent = role.role; // Текст метки будет ролью

        rolesContainer.appendChild(label);
        rolesContainer.appendChild(checkbox);

    });

}






