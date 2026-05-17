//Pagination

const page = parseInt(req.query.page) || 1;
const limit = parseInt(req.query.limit) || 10;

const start = (page - 1) * limit;
const end = page * limit;

// filtering

const current = req.query.status;

if(current) {
    tasks = tasks.filter(task =>task.status === current);
}

//Sorting

const sort = req.query.sort;
if(sort === 'asc'){
    tasks.sort((a,b) => a.id - b.id);
}
