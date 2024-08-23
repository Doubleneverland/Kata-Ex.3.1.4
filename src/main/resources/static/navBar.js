//---------------Заполнение navBar


document.addEventListener('DOMContentLoaded', function () {
    //let container = document.querySelector('#navBar');
    fetch('/api/admin/auth', {method: 'GET'})
        .then(response => response.json())
        .then(owner =>{
            const user = owner.email
            const roles = owner.roles.map(role => role.role).join(', ');
            const userInfo = document.querySelector('#navBarString')
            userInfo.innerHTML = `
                <div class="row">
                
                    <div class="example-content-main mr-2" style="color: white">
                         <h3>${user}</h3>
                    </div>
                    <div style="color: white" class="mr-2">
                        <h3><small>with roles:</small></h3>
                    </div>
                    <div class="example-content-main mr-2" style="color: white">
                         <h3>${roles}</h3>
                    </div>
                    
                </div>
            `;
        })

})



