const parseCSV = (csvString) => 
    csvString.split('\n').map(row => row.split(","));

const str = `abc, def, ghi
jkl, mno, pqr
stu, vwx, yza`;

console.table(parseCSV(str));