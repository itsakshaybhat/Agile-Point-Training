const express = require('express');
const router = express.Router();
const { handleAllUsers,
        handleUsersById,
        handleCreateUser,
        handleUsersUpdate,
        handleDeleteUser} = require('../controller/userController');

 
router.route('/')
    .get(handleAllUsers)
    .post(handleCreateUser);

router.route('/:id')
    .get(handleUsersById)
    .put(handleUsersUpdate)
    .delete(handleDeleteUser);

module.exports = router;