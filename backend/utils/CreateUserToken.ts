import { sign } from "jsonwebtoken";

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