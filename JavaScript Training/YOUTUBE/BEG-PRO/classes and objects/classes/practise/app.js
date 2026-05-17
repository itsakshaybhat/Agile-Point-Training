let data = "secret info";
class User{
    constructor(name, email){
        this.name = name;
        this.email = email;
    }
    viewData(){
        console.log("data =", data);
    }
}

class Admin extends User{
    constructor(name, email){
        super(name, email)
        this.name = name;
        this.email = email;
    }
    editData (){
        Data = "some new value";
    }
}

const obj = new User("akshay", "google.@gmail.com");
const obj2 = new User("aman", "aman.@gmail.com");
obj.viewData();
obj2.viewData();

let teacher = new User("dean", "dean2@gmail.com");
teacher.viewData();
console.log(teacher.name);


const admin1 = new Admin("admin", "admin@gmail.com");

