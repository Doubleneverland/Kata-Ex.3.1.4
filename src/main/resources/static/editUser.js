

async function sendDataEditUser(user) {
    console.log("Start EditUser")
    await fetch("/api/admin", {
        method: "PUT",
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
            user: user,
            roles: roles
        })

    });

}


const modalEdit = document.getElementById("editModal");


let roles = [];

document.addEventListener("DOMContentLoaded", async function() {


    let editButton = document.getElementById("edit_button");
    editButton.addEventListener("click", async function (event) {
        event.preventDefault()

        const checkboxes = document.querySelectorAll('[type="checkbox"][data-role]');


        roles = [];
        checkboxes.forEach(checkbox => {
            console.log("EDIT: forEach Start")
            // Проверяем, отмечен ли чекбокс
            if (checkbox.checked) {
                console.log("EDIT: if Start")
                // Получаем роль из атрибута data-role
                const role = checkbox.getAttribute('data-role');
                roles.push({id: checkbox.id, role});

                console.log("EDIT: Body forEach")
            }
        });


        let user = {
            id: document.getElementById("idEdit").value,
            name: document.getElementById("nameEdit").value,
            lastName: document.getElementById("lastnameEdit").value,
            age: document.getElementById("ageEdit").value,
            email: document.getElementById("emailEdit").value,
            password: document.getElementById("passwordEdit").value,
            roles: roles
        };
        console.log("EDIT: Body from let user")

        await sendDataEditUser(user);
        await fetchAllUsersTable();

        checkboxes.forEach(checkbox =>{
            checkbox.checked = false
        })


        const modalBootstrap = bootstrap.Modal.getInstance(modalEdit);
        modalBootstrap.hide();
    })

})



