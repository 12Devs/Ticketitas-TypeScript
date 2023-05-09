import { CreateEnderecoEventUseCase } from "./CreateEnderecoEventUseCase";


class CreateEnderecoEventController {

        private createEnderecoUseCase: CreateEnderecoEventUseCase;

        public constructor (createEnderecoUseCase: CreateEnderecoEventUseCase) {
                this.createEnderecoUseCase = createEnderecoUseCase;
        }

        public async handle (cep: number, estado: string, cidade: string, bairro: string, rua: string, numero: number){

                return this.createEnderecoUseCase.execute(cep, estado, cidade, bairro, rua, numero);
        }

}

export { CreateEnderecoEventController };