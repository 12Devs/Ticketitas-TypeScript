import { CreateEnderecoUserUseCase } from "./CreateEnderecoUserUseCase";

class CreateEnderecoUserController {

        private createEnderecoUseCase: CreateEnderecoUserUseCase;

        public constructor (createEnderecoUseCase: CreateEnderecoUserUseCase) {
                this.createEnderecoUseCase = createEnderecoUseCase;
        }

        public async handle (cep: number, estado: string, cidade: string, bairro: string, rua: string, numero: number){

                return this.createEnderecoUseCase.execute(cep, estado, cidade, bairro, rua, numero);
        }

}

export { CreateEnderecoUserController };