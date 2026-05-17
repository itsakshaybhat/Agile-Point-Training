function Worker(name, role) {
    this.name = name;
    this.role = role;
    this.isAssigned = true;
}

// Scenario 1
const workerA = new Worker("Alice", "Backend");

// Scenario 2 (Mistake: Forgot the 'new' keyword)
const workerB = Worker("Bob", "Frontend");  //Gloabl inintialization leads to the memory data leaks