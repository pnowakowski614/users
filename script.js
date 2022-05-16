const tableBody = document.querySelector("tbody");
let usersNumber = 0;

const createCompanyRow = (company) => {
    const row = document.createElement("tr");
    tableBody.appendChild(row);

    const companyCell = document.createElement("td");
    const usersCell = document.createElement("td");

    row.appendChild(companyCell);
    row.appendChild(usersCell);
    
    companyCell.textContent = company.name;

    return usersCell;
}

const addUser = (company, usersCell, usersData) => {
    usersData.forEach( (user) => {
        if (user.uris.company === company.uri) {
            usersNumber += 1; 
            usersCell.textContent += `${usersNumber}. ${user.name}, ${user.email}; `
        }
    });
    usersNumber = 0;
}

const populateTable = (companiesData, usersData) => {
    companiesData.forEach( (company) => { 
        const usersCell = createCompanyRow(company);
        addUser(company, usersCell, usersData);
    });
}

const loadData = async() => {
    try {
        const usersURL = 'http://localhost:3000/users';
        const usersRes = await fetch(usersURL);
        const usersData = await usersRes.json();

        const companiesURL = 'http://localhost:3000/companies';
        const companiesRes = await fetch(companiesURL);
        const companiesData = await companiesRes.json();

        populateTable(companiesData, usersData);
    }
    catch(err) {
        console.error(err);
    }
}

loadData();