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

//EMAIL SERVICE DATA
const EMAIL_HOST= "smtp.gmail.com";
const EMAIL_SERVICE= 'gmail';
const EMAIL_PORT= 465;
const EMAIL_SECURE= true;
const EMAIL_USER= "ticketitasdb@gmail.com";
const EMAIL_PASSWORD= "j l s l n q c b b w m k m v v k";
const EMAIL_REJECT_UNAUTHORIZED= false;

export {NODE_ENV, PORT}; //Export node variables
export {DB_HOST, DB_USER, DB_NAME, DB_PASSWORD, DB_DIALECT}; //Export database variables
export {SUPER_ADMIN_GENERATION_CODE, SUPER_ADMIN_INFO}; //Export super administrator information
export {EMAIL_HOST, EMAIL_SERVICE, EMAIL_PORT, EMAIL_SECURE, EMAIL_USER, EMAIL_PASSWORD, EMAIL_REJECT_UNAUTHORIZED}; //Export email service variables