import fs from 'fs';

const deleteFile = async (filename: string) => {
    
    try {
        await fs.promises.stat(filename); //Verifica se o arquivo existe no diretorio
        
    } catch (err){
        return;
    }

    await fs.promises.unlink(filename); //Remove o arquivo;
}



export { deleteFile };