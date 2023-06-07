import { CreateEnderecoUserUseCase } from "./CreateEnderecoUserUseCase";

/**
 * @class CreateEnderecoUserController
 * @date 6/6/2023 - 10:16:30 PM
 *
 * @class CreateEnderecoUserController
 * @typedef {CreateEnderecoUserController}
 */
class CreateEnderecoUserController {
        
        /**
         * Creates an instance of {@link CreateEnderecoUserController}.
         * @date 6/6/2023 - 10:16:41 PM
         *
         * @private
         * @type {CreateEnderecoUserUseCase}
         */
        private createEnderecoUseCase: CreateEnderecoUserUseCase;

        
        /**
         * Creates an instance of CreateEnderecoUserController.
         * @date 6/6/2023 - 10:16:47 PM
         *
         * @constructor
         * @public
         * @param {CreateEnderecoUserUseCase} createEnderecoUseCase
         */
        public constructor (createEnderecoUseCase: CreateEnderecoUserUseCase) {
                this.createEnderecoUseCase = createEnderecoUseCase;
        }

        
        /**
         * Manipulate method for make a creation of a endereco
         * @date 6/6/2023 - 10:16:53 PM
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

export { CreateEnderecoUserController };