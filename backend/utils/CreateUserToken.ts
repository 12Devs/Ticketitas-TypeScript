//Importing of the necessary resources for the creation of the token
import { sign } from "jsonwebtoken";


/**
 * @description Função que cria o token do usuário
 * @date 6/15/2023 - 11:32:49 PM
 *
 * @param {*} user
 * @returns {{ token: any; user: any; }}
 */
const createUserToken = (user) =>{
    const token = sign({
        nome: user.client.nome
    },
        "vamoTirar10NessaBagaca",
        {
            subject: `${user.client.cpf}`,
            expiresIn: "1d"
        }); 

    return { token: token, user: user.client };
}

export { createUserToken };