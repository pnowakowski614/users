"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const tableBody = document.querySelector("tbody");
const usersURL = 'http://localhost:3000/users';
const companiesURL = 'http://localhost:3000/companies';
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
};
const addUser = (company, usersCell, usersData) => {
    usersData.forEach((user) => {
        if (user.uris.company === company.uri) {
            usersNumber += 1;
            usersCell.textContent += `${usersNumber}. ${user.name}, ${user.email}; `;
        }
    });
    usersNumber = 0;
};
const populateTable = (companiesData, usersData) => {
    companiesData.forEach((company) => {
        const usersCell = createCompanyRow(company);
        addUser(company, usersCell, usersData);
    });
};
const loadData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usersRes = fetch(usersURL).then(resp => resp.json());
        const companiesRes = fetch(companiesURL).then(resp => resp.json());
        let data = yield Promise.all([usersRes, companiesRes]);
        let usersData = data[0];
        let companiesData = data[1];
        populateTable(companiesData, usersData);
    }
    catch (err) {
        console.error(err);
    }
});
loadData();
