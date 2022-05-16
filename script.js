const tableBody = document.querySelector("tbody");

const loadData = async() => {
    try {
        const usersURL = 'http://localhost:3000/users';
        const usersRes = await fetch(usersURL);
        const usersData = await usersRes.json();

        const companiesURL = 'http://localhost:3000/companies';
        const companiesRes = await fetch(companiesURL);
        const companiesData = await companiesRes.json();

        let usersNumber = 0;

        companiesData.forEach( (company) => {
            const row = document.createElement("tr");
            tableBody.appendChild(row);

            const companyCell = document.createElement("td");
            const usersCell = document.createElement("td");

            row.appendChild(companyCell);
            row.appendChild(usersCell);

            usersData.forEach( (user) => {
                if (user.uris.company === company.uri) {
                    usersNumber += 1; 
                    usersCell.textContent += `${usersNumber}. ${user.name}, ${user.email}; `
                }
            });

            usersNumber = 0;

            companyCell.textContent = company.name;
        });

        console.log(usersData);
        console.log(companiesData);
    }
    catch(err) {
        console.error(err);
    }
}

loadData();