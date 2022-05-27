const tableBody = document.querySelector("tbody") as HTMLTableSectionElement;
const usersURL: string = 'http://localhost:3000/users';
const companiesURL: string = 'http://localhost:3000/companies';
let usersNumber: number = 0;

interface user {
    name: string;
    email: string;
    uris: {
        company: string;
    };
}

interface company {
    name: string;
    uri: string;
}

const createCompanyRow = (company: company) => {
    const row = document.createElement("tr");
    tableBody.appendChild(row);

    const companyCell = document.createElement("td");
    const usersCell = document.createElement("td");

    row.appendChild(companyCell);
    row.appendChild(usersCell);
    
    companyCell.textContent = company.name;

    return usersCell;
}

const addUser = (company: company, usersCell: HTMLTableCellElement, usersData: user[]) => {
    usersData.forEach( (user) => {
        if (user.uris.company === company.uri) {
            usersNumber += 1;
            usersCell.innerHTML += `<pre> ${usersNumber}. ${user.name}, ${user.email} </pre>`
        }
    });
    usersNumber = 0;
}

const populateTable = (companiesData: company[], usersData: user[]) => {
    companiesData.forEach( (company) => { 
        const usersCell = createCompanyRow(company);
        addUser(company, usersCell, usersData);
    });
}

const loadData = async() => {
    try {
        const usersRes = fetch(usersURL).then(resp => resp.json());
        const companiesRes = fetch(companiesURL).then(resp => resp.json());

        let data: [user[], company[]] = await Promise.all([usersRes, companiesRes])
        let usersData = data[0];
        let companiesData = data[1];
        
        populateTable(companiesData, usersData);
    }
    catch(err) {
        console.error(err);
    }
}

loadData();