async function sendNewUserData(user) {
    try {
        const response = await fetch('/api/admin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: user,
                roles: rolesNew
            })

        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

    } catch (error) {
        console.error('Failed to send new user data:', error);
        // Обработайте ошибку, например, покажите сообщение пользователю
    }

    await Promise.all([fetchAllUsersTable()])

}

async function fetchNewRoles() {
    try {
        const response = await fetch('/api/admin/roles');
        const roles = await response.json();
        displayNewRoles(roles);
    } catch (error) {
        console.error('Failed to fetch roles:', error);
    }
}

function displayNewRoles(newRoles) {
    const newRolesContainer = document.querySelector('#checkNewRole');

    // Очистка контейнера
    while (newRolesContainer.firstChild) {
        newRolesContainer.removeChild(newRolesContainer.firstChild);
    }

    // Создание чекбоксов для каждой роли
    newRoles.forEach(roleNew => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = roleNew.id;
        checkbox.name = 'role';
        checkbox.value = roleNew.role; // Значение чекбокса будет ролью
        checkbox.dataset.role = roleNew.role;

        const label = document.createElement('label');
        label.htmlFor = checkbox.id;
        label.textContent = roleNew.role; // Текст метки будет ролью

        newRolesContainer.appendChild(label);
        newRolesContainer.appendChild(checkbox);
    });
}


let rolesNew = [];

// Функция для обнуления всех полей формы
function clearFormFields() {
    const fields = ['nameNew', 'lastnameNew', 'ageNew', 'emailNew', 'passwordNew'];
    fields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.value = '';
        }
    });
}

function validateFormFields() {
    const requiredFields = ['nameNew', 'lastnameNew', 'ageNew', 'emailNew', 'passwordNew'];

    for (const field of requiredFields) {
        const fieldValue = document.getElementById(field).value.trim();
        if (!fieldValue) {
            alert(`Please fill out the ${field} field.`);
            return false; // Возвращаем false, чтобы остановить выполнение функции
        }
    }

    return true;
}
document.addEventListener("DOMContentLoaded", async function() {


    let addButton = document.getElementById("add_button");
    addButton.addEventListener("click", async function (e) {
        e.preventDefault()


        if (!validateFormFields()) {
            return;
        }

        const checkboxesNew = document.querySelectorAll('[type="checkbox"][data-role]');

        rolesNew = [];
        checkboxesNew.forEach(checkbox => {
            console.log("EDIT: forEach Start")
            // Проверяем, отмечен ли чекбокс
            if (checkbox.checked) {
                console.log("EDIT: if Start")
                // Получаем роль из атрибута data-role
                const role = checkbox.getAttribute('data-role');
                rolesNew.push({id: checkbox.id, role});

                console.log("EDIT: Body forEach")
            }
        });

        let user = {
            name: document.getElementById("nameNew").value,
            lastName: document.getElementById("lastnameNew").value,
            age: document.getElementById("ageNew").value,
            email: document.getElementById("emailNew").value,
            password: document.getElementById("passwordNew").value,
            roles: rolesNew
        };

        await Promise.all([
            sendNewUserData(user),
        ]);
        document.getElementById('users-tab').click();

        checkboxesNew.forEach(checkbox => {
            checkbox.checked = false;
        });

        await fetchAllUsersTable()
        await clearFormFields()
    })


})


