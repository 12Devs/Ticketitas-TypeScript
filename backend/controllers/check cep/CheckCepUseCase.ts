import fetch from "cross-fetch";

class CheckCepUseCase {

    public async execute (cep: number) {
        const url = `https://viacep.com.br/ws/${cep}/json/`;
        const dados = await fetch(url);
        const endereco = await dados.json();
        return endereco;
    }

}

export { CheckCepUseCase };