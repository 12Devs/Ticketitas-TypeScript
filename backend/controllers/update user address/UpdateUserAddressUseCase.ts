//Most of the variables and some of the text used to document this file were auto-generated using {@link https://marketplace.visualstudio.com/items?itemName=crystal-spider.jsdoc-generator JSDoc Generator by Crystal Spider}

//Import of the repository classes
import { ClientRepository } from "../../db/ClientRepository";
import { PromoterRepository } from "../../db/PromoterRepository";

import { ApiError } from "../../errors/ApiError"; //Import of the ApiError class

/**
 * Class for executing the proccess of updating an user address
 * @date 5/27/2023 - 11:47:16 PM
 *
 * @class UpdateUserAddressUseCase
 * @typedef {UpdateUserAddressUseCase}
 */
class UpdateUserAddressUseCase {

    /**
     * Declares an instance of {@link ClientRepository}
     * @date 5/27/2023 - 11:47:16 PM
     *
     * @private Marks this instance as having "private" visibility
     * @type {ClientRepository}
     */
    private clientRepository: ClientRepository;
    /**
     * Declares an instance of {@link PromoterRepository}
     * @date 5/27/2023 - 11:47:16 PM
     *
     * @private Marks this instance as having "private" visibility
     * @type {PromoterRepository}
     */
    private promoterRepository: PromoterRepository;

    /**
     * Constructor for instances of {@link ClientRepository} and {@link PromoterRepository}
     * @date 5/27/2023 - 11:47:16 PM
     *
     * @constructor Marks this part of the code as a constructor
     * @public Marks this constructor as having "public" visibility
     * @param {ClientRepository} clientRepository
     * @param {PromoterRepository} promoterRepository
     */
    public constructor (clientRepository: ClientRepository, promoterRepository: PromoterRepository){
        this.clientRepository = clientRepository;
        this.promoterRepository = promoterRepository;
    }

    /**
     * Method that updates and saves the new user address in the database
     * @date 5/27/2023 - 11:47:16 PM
     *
     * @public Marks this method as having "public" visibility
     * @async Marks this method as being asynchronous
     * @param {string} tipo Type of the user ("administrator", "client" or "promoter")
     * @param {number} cpf User CPF number
     * @param {number} cep User address postal code
     * @param {string} cidade User address city name
     * @param {string} estado User address state name
     * @param {string} bairro User address district name
     * @param {string} rua User address street name
     * @param {number} numero User address house number
     * @returns {*}
     */
    public async execute (tipo: string, cpf: number, cep: number, cidade: string, estado: string, bairro: string, rua: string, numero: number){
        
        //Postal code cannot be blank
        if(!cep) {
            throw new ApiError("O novo CEP não pode ser vazio!", 422);
        }
        
        //City name cannot be blank
        if(!cidade) {
            throw new ApiError("O novo nome da cidade não pode ser vazio!", 422);
        }

        //State name cannot be blank
        if(!estado) {
            throw new ApiError("O novo nome do estado não pode ser vazio!", 422);
        }

        //District name cannot be blank
        if(!bairro) {
            throw new ApiError("O novo nome do bairro não pode ser vazio!", 422);
        }

        //Street name cannot be blank
        if(!rua) {
            throw new ApiError("O novo nome da rua não pode ser vazio!", 422);
        }

        //House number cannot be blank
        if(!numero) {
            throw new ApiError("O novo número do logradouro não pode ser vazio!", 422);
        }

        //Checks the type of user in order to communicate with the correct database repository
        if (tipo === "client"){
            await this.clientRepository.updateAddress(cpf, cep, cidade, estado, bairro, rua, numero);
        } 
        else if (tipo === "promoter"){
            await this.promoterRepository.updateAddress(cpf, cep, cidade, estado, bairro, rua, numero);
        }
        else {
            throw new ApiError("Administradores não possuem endereço de residência em seu cadastro!", 422);
        }
    }

}

export { UpdateUserAddressUseCase }; //Class export declarator