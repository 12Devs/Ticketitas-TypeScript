//NODE APP ENVIRONMENT VARIABLES
const NODE_ENV= "development";
const PORT= 3333;

//DATABASE CONNECTION ENVIRONMENT VARIABLES
const DB_HOST= 'localhost';
const DB_USER= 'root';
const DB_NAME= 'ticketitasdb';
const DB_PASSWORD= '';
const DB_DIALECT= 'mysql';

//SUPER ADMIN DATA
const SUPER_ADMIN_GENERATION_CODE= "GeraIssoPraMim2023ESNaMalevolenciaDoPaiBola";
const SUPER_ADMIN_INFO= 
[
    {
        "email": "tofstreak01@gmail.com",
        "password": "umaSenhaParaTodosModificar07457",
        "name": "Escravo do MI",
        "cpf": 99999999999,
        "phone": 5575998765432
    }
];

export {NODE_ENV, PORT};
export {DB_HOST, DB_USER, DB_NAME, DB_PASSWORD, DB_DIALECT};
export {SUPER_ADMIN_GENERATION_CODE, SUPER_ADMIN_INFO};