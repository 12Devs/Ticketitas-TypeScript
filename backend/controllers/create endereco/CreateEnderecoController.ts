import { CreateEnderecoUseCase } from "./CreateEnderecoUseCase";

class CreateEnderecoController {

        private createEnderecoUseCase: CreateEnderecoUseCase;

        constructor (createEnderecoUseCase: CreateEnderecoUseCase) {
                this.createEnderecoUseCase = createEnderecoUseCase;
        }

        public async handle (cep: number, estado: string, cidade: string, bairro: string, rua: string, numero: number){

                return this.createEnderecoUseCase.execute(cep, estado, cidade, bairro, rua, numero);
        }

}

export { CreateEnderecoController };