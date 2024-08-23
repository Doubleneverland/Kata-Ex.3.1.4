

async function sendDataDeleteUser(id) {
    console.log("Start DELETEUSER")
    try {
        const response = await fetch(`/api/admin/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Если сервер возвращает JSON, обработайте его здесь
    } catch (error) {
        console.error("Error deleting user:", error);
        // Обработайте ошибку, например, покажите сообщение пользователю
    }
}

const modalDelete = document.getElementById("deleteModal");


document.addEventListener("DOMContentLoaded", async function() {
    let deleteButton = document.getElementById("delete_button");
    deleteButton.addEventListener("click", async function (event) {
        event.preventDefault()
        //await deleteModal(modalDelete);
        let id = Number(document.getElementById("idDelete").value);
        console.log("DELETE: Body from let user");
        console.log(id.toString())

        await sendDataDeleteUser(id);
        await fetchAllUsersTable();


        const modalBootstrap = bootstrap.Modal.getInstance(modalDelete);
        modalBootstrap.hide();
    })


});