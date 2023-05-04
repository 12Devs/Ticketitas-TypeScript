import jwt from "jsonwebtoken";

const createUserToken = (user, request, response) =>{
    const token = jwt.sign({
        nome: user.client.nome
    },
        "vamoTirar10NessaBagaca",
        {
            subject: `${user.client.cpf}`,
            expiresIn: "1d"
        }); 

    response.status(200).json({message: "Autenticado com sucesso",
    token: token,
    user: user.client
    });
}

export { createUserToken };