
async function getCurrentUser() {
    const response = await fetch('/user/auth', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return await response.json();

}


document.addEventListener('DOMContentLoaded', async function () {

    const user = await getCurrentUser()
    const roles = user.roles.map(role => role.role).join(', ');

    const userInfo = document.querySelector('#navBarString')
    userInfo.innerHTML = `
                <div class="row">
                
                    <div class="example-content-main mr-2" style="color: white">
                         <h3>${user.email}</h3>
                    </div>
                    <div style="color: white" class="mr-2">
                        <h3><small>with roles:</small></h3>
                    </div>
                    <div class="example-content-main mr-2" style="color: white">
                         <h3>${roles}</h3>
                    </div>
                    
                </div>
            `;


    await fetchUserInfo()

})


async function fetchUserInfo() {
    console.log("start fetch")
    const headInfo = document.querySelector('#userPage thead'); // Получаем элемент <thead>
    const bodyCurrent = document.querySelector('#infoTable tbody'); // Получаем элемент <tbody>

    const userInfo = await getCurrentUser()

    let headInfoHTML = `
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Roles</th>
        </tr>`;
    headInfo.innerHTML = headInfoHTML;

    let bodyCurrentHTML = '';

    let userRolesHtml = userInfo.roles.map(role => role.role).join(', ');
    bodyCurrentHTML += `
        <tr>
            <td>${userInfo.id}</td>
            <td>${userInfo.name}</td>
            <td>${userInfo.lastName}</td>
            <td>${userInfo.age}</td>
            <td>${userInfo.email}</td>
            <td>${userRolesHtml}</td>
        </tr>
    `;

    bodyCurrent.innerHTML = bodyCurrentHTML;
}