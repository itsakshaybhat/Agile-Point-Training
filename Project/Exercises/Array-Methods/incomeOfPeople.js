const people = [
    { firstName: 'Sam', lastName: 'Hughes', DOB: '07/07/1978', department: 'Development', salary: '45000' },
    { firstName: 'Terri', lastName: 'Bishop', DOB: '02/04/1989', department: 'Development', salary: '35000' },
    { firstName: 'Jar', lastName: 'Burke', DOB: '11/01/1985', department: 'Marketing', salary: '38000' },
    { firstName: 'Julio', lastName: 'Miller', DOB: '12/07/1991', department: 'Sales', salary: '40000' },
    { firstName: 'Chester', lastName: 'Flores', DOB: '03/15/1988', department: 'Development', salary: '41000' },
    { firstName: 'Madison', lastName: 'Marshall', DOB: '09/22/1980', department: 'Sales', salary: '32000' },
    { firstName: 'Ava', lastName: 'Pena', DOB: '11/02/1986', department: 'Development', salary: '38000' },
    { firstName: 'Gabriella', lastName: 'Steward', DOB: '08/26/1994', department: 'Marketing', salary: '46000' },
    { firstName: 'Charles', lastName: 'Campbell', DOB: '09/04/1977', department: 'Sales', salary: '42000' },
    { firstName: 'Tiffany', lastName: 'Lambert', DOB: '05/11/1990', department: 'Development', salary: '34000' },
    { firstName: 'Antonio', lastName: 'Gonzalez', DOB: '03/24/1985', department: 'Office Management', salary: '49000' },
    { firstName: 'Aaron', lastName: 'Garrett', DOB: '09/04/1985', department: 'Development', salary: '39000' },
];
// Exercise One: Calculate the average income for all people in the array (1:15).
// Exercise Two: Find all people in the array who are older than 30 (3:04).
// Exercise Three: Get a list of the full names (first and last name) of all people (4:27).
// Exercise Four: Order the people in the array from youngest to oldest (5:50).
// Exercise Five: Get a list of the total number of people in each department 



// console.log(people.reduce((acc, person) => acc + parseInt(person.salary),0)/people.length);

// console.log(people.filter(person=> new Date().getFullYear() -new Date(person.DOB).getFullYear() > 30));

// console.log(people.map(person => `${person.firstName} ${person.lastName}`));
// console.log(people.map(({firstName, lastName}) =>`${firstName} ${lastName}` ));

// console.log(people.sort((personA, personB)=> new Date(personB.DOB) - new Date(personA.DOB)));

// console.log(people.reduce((acc, person) => ({...acc, [person.department]: acc[person.department] + 1 || 1}), {}));

