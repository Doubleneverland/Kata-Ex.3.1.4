document.addEventListener('DOMContentLoaded', async function () {
    await editModal(modalEdit);
    await deleteModal(modalDelete);
    await fetchRoles();
    await fetchNewRoles();
    await fetchAllUsersTable();

});

