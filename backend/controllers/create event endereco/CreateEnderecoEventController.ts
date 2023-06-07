import { CreateEnderecoEventUseCase } from "./CreateEnderecoEventUseCase";



/**
 * create Edereco event controller class
 * @date 6/6/2023 - 10:08:02 PM
 *
 * @class CreateEnderecoEventController
 * @typedef {CreateEnderecoEventController}
 */
class CreateEnderecoEventController {        

        /**
         * Creates an instance of {@link CreateEnderecoEventController}.
         * @date 6/6/2023 - 10:08:32 PM
         *
         * @private
         * @type {CreateEnderecoEventUseCase}
         */
        private createEnderecoUseCase: CreateEnderecoEventUseCase;

        

        /**
         * Creates an instance of CreateEnderecoEventController.
         * @date 6/6/2023 - 10:09:09 PM
         *
         * @constructor
         * @public
         * @param {CreateEnderecoEventUseCase} createEnderecoUseCase
         */
        public constructor (createEnderecoUseCase: CreateEnderecoEventUseCase) {
                this.createEnderecoUseCase = createEnderecoUseCase;
        }

        

        /**
         * Manipulate method for make a creation of a endereco
         * @date 6/6/2023 - 10:09:16 PM
         *
         * @public
         * @async
         * @param {number} cep
         * @param {string} estado
         * @param {string} cidade
         * @param {string} bairro
         * @param {string} rua
         * @param {number} numero
         * @returns {unknown}
         */
        public async handle (cep: number, estado: string, cidade: string, bairro: string, rua: string, numero: number){

                return this.createEnderecoUseCase.execute(cep, estado, cidade, bairro, rua, numero);
        }

}

export { CreateEnderecoEventController };