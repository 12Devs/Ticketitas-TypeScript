//Import of the necessary modules for the functioning of the class
import fetch from "cross-fetch";


/**
 * Function that searches for a zip code
 * @date 6/15/2023 - 11:36:54 PM
 *
 * @async
 * @param {number} cep
 * @returns {unknown}
 */
const pesquisarCep = async function (cep: number) {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    const dados = await fetch(url);
    const endereco = await dados.json();
    return endereco;
}

export { pesquisarCep }