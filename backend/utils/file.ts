//Import of the necessary modules for the functioning of the class
import fs from 'fs';


/**
 * Function that deletes a file
 * @date 6/15/2023 - 11:34:38 PM
 *
 * @async
 * @param {string} filename
 * @returns {*}
 */
const deleteFile = async (filename: string) => {
    
    try {
        await fs.promises.stat(filename); 
        
    } catch (err){
        return;
    }

    await fs.promises.unlink(filename); 
}



export { deleteFile };