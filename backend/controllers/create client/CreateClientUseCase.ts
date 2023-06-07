import { ClientRepository } from "../../db/ClientRepository";
import { ApiError } from "../../errors/ApiError";
import bcrypt from 'bcrypt';
import { EmailProvider } from "../../utils/EmailProvider";


/**
 * Create client use case class
 * @date 6/6/2023 - 5:48:55 PM
 *
 * @class CreateClientUseCase
 * @typedef {CreateClientUseCase}
 */
class CreateClientUseCase {

    
    /**
     * Create an instance of {@link CreateClientUseCase}
     * @date 6/6/2023 - 5:50:01 PM
     *
     * @private Marks this instance as having "private" visibility
     * @type {ClientRepository}
     */
    private clientRepository: ClientRepository
    private emailProvider: EmailProvider;

    
    /**
     * Creates an instance of CreateClientUseCase.
     * @date 6/6/2023 - 5:51:04 PM
     *
     * @constructor Marks this part of the code as a constructor 
     * @param {ClientRepository} clientRepository
     * @param {EmailProvider} emailProvider
     */
    constructor (clientRepository: ClientRepository, emailProvider: EmailProvider) {
        this.clientRepository =  clientRepository;
        this.emailProvider = emailProvider;
    }
    
    
    /**
     * Method for make a creation of a client
     * @date 6/6/2023 - 5:51:45 PM
     *
     * @public Marks this method as having "public" visibility
     * @async Marks this method as being asynchronous
     * @param {string} nome
     * @param {number} cpf
     * @param {string} email
     * @param {number} telefone
     * @param {string} senha
     * @param {string} confirmacaoSenha
     * @param {number} cep
     * @param {string} cidade
     * @param {string} estado
     * @param {string} bairro
     * @param {string} rua
     * @param {number} numero
     * @returns {newClient}
     */
    public async execute (nome: string, cpf: number, email: string, telefone: number, senha: string, confirmacaoSenha: string, cep: number, cidade: string, estado: string, bairro: string, rua: string, numero: number) {
        //Validations
        if (!nome){
            throw new ApiError("O nome é obrigatório!", 422);
        }

        if (!cpf){
            throw new ApiError("O cpf é obrigatório!", 422);
        }

        if (!email){
            throw new ApiError("O email é obrigatório!", 422);
        }

        if (!telefone){
            throw new ApiError("O telefone é obrigatório!", 422);
        }

        if (!senha){
            throw new ApiError("A senha é obrigatória!", 422);
        }

        if (!confirmacaoSenha){
            throw new ApiError("A confirmacao de senha é obrigatória!", 422);
        }

        if(senha !== confirmacaoSenha) {
            throw new ApiError("A senha e a confirmação de senha devem ser iguais!", 422);
        }

        
        const cpfExists = await this.clientRepository.findByCpf(cpf);
        const emailExists = await this.clientRepository.findByEmail(email);
        
        if(cpfExists) {
            throw new ApiError("Utilize outro cpf", 422);
        }
        
        if(emailExists) {
            throw new ApiError("Utilize outro email", 422);
        }
        
        const salt = await bcrypt.genSalt(12);
        const senhaHash = await bcrypt.hash(senha, salt);
        await this.clientRepository.create(nome, cpf, email, telefone, senhaHash, cep, cidade, estado, bairro, rua, numero);

        const emailInfo = {
            template: 'RegistrationConfirmationClient',
            subject: `Bem-vindo à Ticketitas!`
        }
        
        await this.emailProvider.sendEmail(email, emailInfo);
        
        const newClient = {
            name: nome,
            email: email
        }
        
        return { newClient };
    }
}

export { CreateClientUseCase };