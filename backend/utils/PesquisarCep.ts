import fetch from "cross-fetch";

const pesquisarCep = async function (cep: number) {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    const dados = await fetch(url);
    const endereco = await dados.json();
    return endereco;
}

export { pesquisarCep }