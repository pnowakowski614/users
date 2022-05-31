const tableBody = document.querySelector("tbody") as HTMLTableSectionElement;
const usersURL: string = 'http://localhost:3000/users';
const companiesURL: string = 'http://localhost:3000/companies';
let usersNumber: number = 0;

interface User {
    name: string;
    email: string;
    uris: {
        company: string;
    };
}

interface Company {
    name: string;
    uri: string;
}

const createCompanyRow = (company: Company) => {
    const row = document.createElement("tr");
    tableBody.appendChild(row);

    const companyCell = document.createElement("td");
    const usersCell = document.createElement("td");

    row.appendChild(companyCell);
    row.appendChild(usersCell);
    
    companyCell.textContent = company.name;

    return usersCell;
}

const addUser = (company: Company, usersCell: HTMLTableCellElement, usersData: User[]) => {
    usersData.forEach( (user) => {
        if (user.uris.company === company.uri) {
            usersNumber += 1;
            usersCell.innerHTML += `${usersNumber}. ${user.name}, ${user.email} <br>`
        }
    });
    usersNumber = 0;
}

const populateTable = (companiesData: Company[], usersData: User[]) => {
    companiesData.forEach( (company) => { 
        const usersCell = createCompanyRow(company);
        addUser(company, usersCell, usersData);
    });
}

const loadData = async() => {
    try {
        const usersRes = fetch(usersURL).then(resp => resp.json());
        const companiesRes = fetch(companiesURL).then(resp => resp.json());

        let data: [User[], Company[]] = await Promise.all([usersRes, companiesRes])
        const [usersData, companiesData] = data;
        
        populateTable(companiesData, usersData);
    }
    catch(err) {
        console.error(err);
    }
}

loadData();