const express = require('express');
const { handleGetAllUsers,
        handleGetUserById, 
        updateUserById, 
        deleteUserById,
        handleCreateNewUser } = require('../controllers/user')
const router = express.Router();

router.route('/')
    .get(handleGetAllUsers)
    .post(handleCreateNewUser)

router.route('/:id')
    .get(handleGetUserById)
    .patch(updateUserById)
    .delete(deleteUserById)

module.exports = router;

// router.use((req, res, next)=>{
//     fs.appendFile('log.txt', `\n${Date.now()}: ${req.ip} ,${req.method} ${req.path}`, (err, data) => {
//         next();
//     })
// });

// router.get('/', async(req, res) => {
//     const allDbUsers = await User.find({});
//     const html = `
//     <ul>
//         ${allDbUsers.map(user=> `<li>${user.firstName} - ${user.email} </li>`).join("")}
//     </ul>
//     `;
//         res.send(html);
// })


    // .delete((req, res) => {
    //     const id = Number(req.params.id);
    //     const newUsers = users.filter(user=> user.id !== id);
    //     fs.writeFile('./MOCK_DATA.json', JSON.stringify(newUsers), (err) => {
    //         if(err){
    //             return res.status(500).json({status: "erro"});
    //         }
    //         users.length = 0;
    //         users.push(...newUsers);
    //         return res.json({status: "deleted", id: id});
    //     });
    // });



    // delete((req, res) => {
    //     const id = Number(req.params.id);
    //     const index = users.findIndex(user => user.id === id );
    //     if(index === -1) {
    //         return res.status(400).json({status: "User Not Found"});
    //     }
    //     users.splice(index,1);
    //     fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) =>{
    //         if(err) {
    //             return res.status(500).json({status: "Error"});
    //         }
    //     return res.json({status:"deleted", id: id});
    //     })
    // })


        // .patch((req, res)=> {
    //     const id = Number(req.params.id);
    //     const body = req.body;
        
    //     const index = users.findIndex(user => user.id === id );

    //     if(index === -1) {
    //         return res.status(404).json({status: "User Not Found"});
    //     }

    //     users[index] = {...users[index], ...body};
    //     fs.writeFile("MOCK_DATA.json", JSON.stringify(users),(error) =>{
    //         if(error){
    //             return res.status(500).json({status: "error"});
    //         }
    //         return res.json({
    //             status: "updated",
    //             user: users[index]
    //         })
    //     })
    // })



//api/users/:id
    // const id = Number(req.params.id);
    //     const allDbUsers = await User.find({});
    //     const user = allDbUsers.find(user=> user.id === id);
    
    
    


    // users.push({...body, id: users.length +1});

    // fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
    //     return res.status(201).json({status: "success", id: users.length});
    // })
// });

// // app.patch('/api/users/:id', (req, res) => {
//     return res.json({ status: pending});
// })

// app.delete('/api/users/:id', (req, res) => {
//     return res.json({ status: pending});
// 

