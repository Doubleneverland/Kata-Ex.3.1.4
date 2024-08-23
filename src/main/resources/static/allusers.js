
//-------------Заполнение таблицы с юзерами


async function GetAllUsers() {
    const response = await fetch('/api/admin', { method: 'GET' })
    return await response.json();
}


async function fetchAllUsersTable() {

    const tableHead = document.querySelector('#usersTable thead'); // Получаем элемент <thead>
    const tableBody = document.querySelector('#usersTable tbody'); // Получаем элемент <tbody>
    const users = await GetAllUsers();

    // Очищаем <thead>, если он уже содержит какие-то данные
    while (tableHead.firstChild) {
        tableHead.removeChild(tableHead.firstChild);
    }
    let tableHeadHTML = `
    <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Last Name</th>
        <th>Age</th>
        <th>Email</th>
        <th>Roles</th>
        <th>Edit</th>
        <th>Delete</th>
      
    </tr>`;
    tableHead.innerHTML = tableHeadHTML;


    let tableBodyHTML = '';
    for (let user of users) {
        // Перебираем роли пользователя
        let userRolesHtml = '';
        if (user.roles && user.roles.length > 0) {
            userRolesHtml = user.roles.map(role => role.role).join(', ');
        }

        tableBodyHTML += `
<tr>
    <td>${user.id}</td>
    <td>${user.name}</td>
    <td>${user.lastName}</td>
    <td>${user.age}</td>
    <td>${user.email}</td>
    <td>${userRolesHtml}</td> 
    <td>
       <button class="edit_button btn btn-primary" 
                data-bs-toggle="modal" 
                data-bs-target="#editModal"
                data-user-id="${user.id}">
        Edit</button>                   
    </td>
    <td><button class="deleteBut btn btn-danger" 
                data-bs-toggle="modal" 
                data-bs-target="#deleteModal"
                data-user-id="${user.id}">
                Delete</button></td>
    
</tr>`;
    }

    tableBody.innerHTML = tableBodyHTML;

}






