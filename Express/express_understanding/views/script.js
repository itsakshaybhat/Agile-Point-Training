const userList = document.getElementById('userList');
const userForm = document.getElementById('userForm');
const userNameInput = document.getElementById('userName');
const showUsersBtn = document.getElementById('showUsersBtn');
const searchUserBtn = document.getElementById('searchUserBtn');
const searchUserId = document.getElementById('searchUserId');
const statusMessage = document.getElementById('statusMessage');
const userDetail = document.getElementById('userDetail');


function setStatus(message, type = 'info') {
    statusMessage.textContent = message;
    statusMessage.dataset.type = type;
}

function clearStatus() {
    statusMessage.textContent = '';
    statusMessage.dataset.type = '';
}

function renderUserDetail(user) {
    if (!user) {
        userDetail.hidden = true;
        userDetail.innerHTML = '';
        return;
    }

    userDetail.hidden = false;
    userDetail.innerHTML = `
        <strong>User Details</strong>
        <div>ID: ${user.id}</div>
        <div>Name: ${user.name}</div>
    `;
}

async function loadUsers() {
    try {
        setStatus('Loading users...', 'info');
        const res = await fetch('/users');
        const data = await res.json();

        userList.innerHTML = '';

        if (!data.data.length) {
            userList.innerHTML = '<div class="empty-state">No users found. Add one to begin.</div>';
            renderUserDetail(null);
            setStatus('No users available yet.', 'info');
            return;
        }

        data.data.forEach(user => {
            const div = document.createElement('div');
            div.className = 'user';

            const info = document.createElement('span');
            info.innerHTML = `<strong>ID:</strong> ${user.id} | <strong>Name:</strong> ${user.name}`;

            const actions = document.createElement('div');
            actions.className = 'user-actions';

            const editButton = document.createElement('button');
            editButton.type = 'button';
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', () => editUser(user.id, user.name));

            const deleteButton = document.createElement('button');
            deleteButton.type = 'button';
            deleteButton.className = 'delete';
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => deleteUser(user.id));

            actions.append(editButton, deleteButton);
            div.append(info, actions);
            userList.appendChild(div);
        });

        setStatus(`Loaded ${data.data.length} user(s).`, 'success');

    } catch (err) {
        console.error('Error loading users:', err);
        setStatus('Failed to load users. Check the server and browser console.', 'error');
    }
}

async function searchUserById() {
    const id = Number(searchUserId.value);
    if (!id) {
        setStatus('Enter a valid user id.', 'error');
        return;
    }

    try {
        setStatus(`Searching user ${id}...`, 'info');
        const res = await fetch(`/users/${id}`);
        const data = await res.json();

        if (data.success) {
            renderUserDetail(data.data);
            setStatus(`Found user ${id}.`, 'success');
        } else {
            renderUserDetail(null);
            setStatus(data.message, 'error');
        }
    } catch (err) {
        console.error('Error searching user:', err);
        setStatus('Error searching user by id.', 'error');
    }
}

userForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = userNameInput.value.trim();
    if (!name) return;

    try {
        setStatus('Creating user...', 'info');
        const res = await fetch('/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        });
        const data = await res.json();
        if (data.success) {
            userNameInput.value = '';
            renderUserDetail(null);
            await loadUsers();
        } else {
            setStatus(data.message, 'error');
        }
    } catch (err) {
        console.error('Error adding user:', err);
        setStatus('Error creating user.', 'error');
    }
});

async function deleteUser(id) {
    try {
        setStatus(`Deleting user ${id}...`, 'info');
        const res = await fetch(`/users/${id}`, { method: 'DELETE' });
        const data = await res.json();
        if (data.success) {
            renderUserDetail(null);
            await loadUsers();
        } else {
            setStatus(data.message, 'error');
        }
    } catch (err) {
        console.error('Error deleting user:', err);
        setStatus('Error deleting user.', 'error');
    }
}

async function editUser(id, currentName) {
    const newName = prompt('Enter new name for user:', currentName);
    if (newName === null) return;

    const trimmedName = newName.trim();
    if (!trimmedName) {
        setStatus('Name cannot be empty.', 'error');
        return;
    }

    try {
        setStatus(`Updating user ${id}...`, 'info');
        const res = await fetch(`/users/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: trimmedName })
        });
        const data = await res.json();
        if (data.success) {
            renderUserDetail(data.data);
            await loadUsers();
        } else {
            setStatus(data.message, 'error');
        }
    } catch (err) {
        console.error('Error updating user:', err);
        setStatus('Error updating user.', 'error');
    }
}

showUsersBtn.addEventListener('click', loadUsers);
searchUserBtn.addEventListener('click', searchUserById);

window.addEventListener('DOMContentLoaded', () => {
    clearStatus();
    userList.innerHTML = '<div class="empty-state">Press Show Users to load the list from Server.</div>';
});