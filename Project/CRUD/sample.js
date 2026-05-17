let users = [];

function createUser(name){
    const user = {
        id: Date.now(),
        name: name
    };
    users.push(user);
    console.log("The user is created",user);
}


function getUser() {
    console.table("The details of the user are:", users);
}

function deleteUser(id) {
    users = users.filter((user)=> user.id !== id);
    console.table(`The user is deleted, and remaining things are,`,JSON.stringify(users));
}

function updateUser(id, name) {
    // const updated = users.map(user=> user.id = name);
    // console.log(updated);
    users = users.map(user=> {
        if(user.id === id) {
            return {...user, name: name};
        }
        return user;
    })
}

createUser("Akshay");
createUser("Rahul");
createUser("Mahesh");

getUser();
deleteUser(users[0].id);

updateUser(users[1].id,"Ramesh");


function updateUser(id, updatedData){
    users = users.map(user =>
        user.id === id ? {...user, ...updatedDate} :user
    );
}

updatedUser(1, {name : "agiel"});