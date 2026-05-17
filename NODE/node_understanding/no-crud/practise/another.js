const sendJson = (res, statusCode, payload) => {
	res.statusCode = statusCode;
	res.end(JSON.stringify(payload));
};

const parseUserId = (path) => {
	const match = path.match(/^\/api\/users\/(\d+)$/);

	if (!match) { 
		return null;
	}

	return Number(match[1]);
};

const handleGetUsers = async (res) => {
	const data = await fetchAllUsers();
	return sendJson(res, 200, data);
};

const handleGetUser = (res, userId) => {
	const user = users.find((entry) => entry.id === userId);

	if (!user) {
		return sendJson(res, 404, { error: 'User not found' });
	}

	return sendJson(res, 200, user);
};

const handleCreateUser = async (req, res) => {
	const body = await getPostData(req);
	let bodyData;

	try {
		bodyData = JSON.parse(body);
	} catch {
		return sendJson(res, 400, { error: 'Invalid JSON format' });
	}

	if (!bodyData.name || !bodyData.role) {
		return sendJson(res, 400, { error: 'Name and role are required' });
	}

	const existingUser = users.find((entry) => entry.name.toLowerCase() === bodyData.name.toLowerCase());

	if (existingUser) {
		return sendJson(res, 409, { message: 'User already exists' });
	}

	const newUser = {
		id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
		name: bodyData.name,
		role: bodyData.role,
	};

	users.push(newUser);

	return sendJson(res, 201, { message: 'User created successfully!', user: newUser });
};

const handleUpdateUser = async (req, res, userId) => {
	const userIndex = users.findIndex((entry) => entry.id === userId);

	if (userIndex === -1) {
		return sendJson(res, 404, { error: 'User not found' });
	}

	const body = await getPostData(req);
	let bodyData;

	try {
		bodyData = JSON.parse(body);
	} catch {
		return sendJson(res, 400, { error: 'Invalid JSON format' });
	}

	if (bodyData.name) {
		users[userIndex].name = bodyData.name;
	}

	if (bodyData.role) {
		users[userIndex].role = bodyData.role;
	}

	return sendJson(res, 200, { message: 'User updated successfully!', user: users[userIndex] });
};

const handleDeleteUser = (res, userId) => {
	const userIndex = users.findIndex((entry) => entry.id === userId);

	if (userIndex === -1) {
		return sendJson(res, 404, { error: 'User not found' });
	}

	const deletedUser = users.splice(userIndex, 1)[0];

	return sendJson(res, 200, { message: 'User deleted successfully!', user: deletedUser });
};

const handleRequest = async (req, res) => {
	res.setHeader('Content-Type', 'application/json');

	const url = new URL(req.url, `http://${req.headers.host}`);
	const path = url.pathname;
	const method = req.method;
	const userId = parseUserId(path);

	try {
		if (path === '/api/users' && method === 'GET') {
			return await handleGetUsers(res);
		}

		if (path === '/api/users' && method === 'POST') {
			return await handleCreateUser(req, res);
		}

		if (userId !== null && method === 'GET') {
			return handleGetUser(res, userId);
		}

		if (userId !== null && method === 'PUT') {
			return await handleUpdateUser(req, res, userId);
		}

		if (userId !== null && method === 'DELETE') {
			return handleDeleteUser(res, userId);
		}

		return sendJson(res, 404, { error: 'Route Not Found' });
	} catch (error) {
		console.error(error);
		return sendJson(res, 500, { error: 'Internal Server Error' });
	}
};