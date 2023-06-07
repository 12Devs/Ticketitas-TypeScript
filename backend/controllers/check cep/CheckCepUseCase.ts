import fetch from "cross-fetch";


/**
 * Check CEP use case class
 * @date 6/6/2023 - 5:33:49 PM
 *
 * @class CheckCepUseCase
 * @typedef {CheckCepUseCase}
 */
class CheckCepUseCase {
    
    /**
     * Method for get the datas of CEP
     * @date 6/6/2023 - 5:34:27 PM
     *
     * @public
     * @async
     * @param {number} cep
     * @returns {String} - datas of the CEP
     */
    public async execute (cep: number) {
        const url = `https://viacep.com.br/ws/${cep}/json/`;
        const dados = await fetch(url);
        const endereco = await dados.json();
        return endereco;
    }

}

export { CheckCepUseCase };