const fs = require('fs').promises;
const path = require('path');

const dataPath = path.join(__dirname, 'data.json');

async function readData() {
    try {
        const data = await fs.readFile(dataPath, 'utf-8');
        return JSON.parse(data || '[]');
    } catch (error) {
        if (error.code === 'ENOENT') {
            return [];
        }
        throw error;
    }
}


async function writeData(data) {
    await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
}


async function createUser(user) {
    const users = await readData();
    user.id = Date.now();
    users.push(user);
    await writeData(users);
    return user;
}

async function updateUser(id, updatedData) {
    const users = await readData();
    const index = users.findIndex(u => u.id === id);
    if(index === -1) throw new Error('User not found');
    users[index] = {...users[index], ...updatedData};
    await writeData(users);
    return users[index];
}


async function deleteUser(id) {
    const users = await readData();
    const filtered = users.filter(u => u.id != id);
    if (filtered.length === users.length) {
        return false;
    }
    await writeData(filtered);
    return true;
}


module.exports = {
    readData,
    createUser, 
    updateUser,
    deleteUser
};