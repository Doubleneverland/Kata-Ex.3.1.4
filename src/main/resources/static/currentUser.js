
document.addEventListener('DOMContentLoaded', async function () {
    await fetchUserTable()
});


async function getCurrentUser() {
    const response = await fetch('/api/admin/auth', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }})
    return await response.json();

}

fetch('http://localhost:8080/app.js')
    .then(response => {
        console.log('MIME type:', response.headers.get('content-type'));
    })
    .catch(error => console.error('Error fetching app.js:', error));


async function fetchUserTable() {
    console.log("start fetch")
    const headCurrent = document.querySelector('#userInfo thead'); // Получаем элемент <thead>
    const bodyCurrent = document.querySelector('#userInfo tbody'); // Получаем элемент <tbody>

    const users = await getCurrentUser()

    let headCurrentHTML = `
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Roles</th>
        </tr>`;
    headCurrent.innerHTML = headCurrentHTML;

    let bodyCurrentHTML = '';

        let userRolesHtml = users.roles.map(role => role.role).join(', ');
        bodyCurrentHTML += `
        <tr>
            <td>${users.id}</td>
            <td>${users.name}</td>
            <td>${users.lastName}</td>
            <td>${users.age}</td>
            <td>${users.email}</td>
            <td>${userRolesHtml}</td>
        </tr>
    `;



    bodyCurrent.innerHTML = bodyCurrentHTML;
}



