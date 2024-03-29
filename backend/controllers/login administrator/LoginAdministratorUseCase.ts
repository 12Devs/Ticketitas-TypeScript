import { AdministratorRepository } from "../../db/AdministratorRepository";
import bcrypt from "bcrypt";
import { ApiError } from "../../errors/ApiError";
import { sign } from "jsonwebtoken";
import { TokenAdministratorRepository } from "../../db/TokenAdministratorRepository";

class LoginAdministratorUseCase {

    private administratorRepository: AdministratorRepository;
    private tokenAdministratorRepository: TokenAdministratorRepository;

    constructor (administratorRepository: AdministratorRepository, tokenAdministratorRepository: TokenAdministratorRepository) {
        this.administratorRepository = administratorRepository;
        this.tokenAdministratorRepository = tokenAdministratorRepository;
    }

    public async execute (email: string, senha: string) {
        
        if (!email){
            throw new ApiError("O email é obrigatório", 422);
        }

        if (!senha){
            throw new ApiError("A senha é obrigatória", 422);
        }

        const infoAdministrator: any = await this.administratorRepository.findByEmailAndSenha(email, senha);
        
        if (infoAdministrator === null || infoAdministrator === undefined) {
            throw new ApiError("Email ou senha incorretos", 422);
        }

        if (infoAdministrator.email !== email) {
            throw new ApiError("Email ou senha incorretos", 422);
        }

        const checkSenha = bcrypt.compareSync(senha, infoAdministrator.password);

        if (!checkSenha) {
            throw new ApiError("Email ou senha incorretos", 422);
        }

        const token = sign({tipo: "administrator", nome: infoAdministrator.nome},
            
        process.env.JWT_SECRET,

        {subject: `${infoAdministrator.cpf}`,
            expiresIn: process.env.EXPIRES_TOKEN});
    
    
    const refreshToken = await sign({tipo: "administrator", nome: infoAdministrator.nome},
        
        process.env.JWT_REFRESH_SECRET,
        
        {subject: `${infoAdministrator.cpf}`,
            expiresIn: process.env.EXPIRES_REFRESH_TOKEN});
    
    var expiresDate = new Date();
    expiresDate.setDate(expiresDate.getDate() + 30);

    await this.tokenAdministratorRepository.create(infoAdministrator.cpf, expiresDate, refreshToken);

    const administrator = {
        nome: infoAdministrator.nome,
        cpf: infoAdministrator.cpf,
        email: infoAdministrator.email
    }
    
    return { administrator, token, refreshToken };
    }
}

export { LoginAdministratorUseCase };