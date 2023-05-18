//Most of the variables and some of the text used to document this file were auto-generated using {@link https://marketplace.visualstudio.com/items?itemName=crystal-spider.jsdoc-generator JSDoc Generator by Crystal Spider}

/**
 * Import of the class {@link PromoterPasswordChangeCode}
 */
import { PromoterPasswordChangeCode } from "../models/PromoterPasswordChangeCode";
/**
 * Import of the {@link https://www.npmjs.com/package/randomstring randomstring} module
 */
import randomstring from 'node-randomstring';

/**
 * Class for handling the IO of database info
 * @date 5/17/2023 - 3:10:29 AM
 *
 * @class PromoterRepository
 * @typedef {PromoterPasswordChangeCodeRepository}
 */
class PromoterPasswordChangeCodeRepository {
    
    /**
     * Declaration of the instance of this class (PromoterRepository)
     * @date 5/17/2023 - 3:11:31 AM
     *
     * @private Marks this object as private
     * @type {PromoterPasswordChangeCodeRepository}
     */
    private promoterPasswordChangeCodeRepository: PromoterPasswordChangeCodeRepository

    /**
     * Method for requesting the insertion of (a) new row(s) in the server database in order to store the information of a new promoter registry
     * @date 5/17/2023 - 3:11:52 AM
     *
     * @public Marks this method as having "public" visibility
     * @async Marks this method as being asynchronous
     * @param {string} code user password change code
     * @param {number} cpf user CPF number
     * @returns {*}
     */
    public async create (code: string, cpf: number){
        
        //Executes the database actions
        await PromoterPasswordChangeCode.create({code, cpf});
        
    }

    /**
     * Method for requesting the erasure of the entry with the requested key from the database
     * @date 5/17/2023 - 3:31: AM
     *
     * @public Marks this method as having "public" visibility
     * @async Marks this method as being asynchronous
     * @param {string} code user password change code
     * @param {number} cpf user CPF number
     * @returns {*}
     */
    public async destroyByCode (code: string){
        
        //Executes the database actions
        await PromoterPasswordChangeCode.destroy({
            where: {
                code: code
            }
        });
        
    }

    /**
     * Method for searching an promoter password code entry (code-CPF tuple) by their code value
     * @date 5/17/2023 - 3:40:31 PM
     *
     * @public Marks this method as having "public" visibility
     * @async Marks this method as being asynchronous
     * @param {string} code user CPF number
     * @returns {Array} Array of promoters password change code entries, matching the search (or none if no match is found)
     */
    public async findByCode (code: string) {
        const codeExists = await PromoterPasswordChangeCode.findOne({raw: true, attributes: ['code'], where: {
            code: code
        }});
        return codeExists;
    }

    /**
     * Method for searching an promoter password code entry (code-CPF tuple) by their CPF number
     * @date 5/17/2023 - 4:27:17 AM
     *
     * @public Marks this method as having "public" visibility
     * @async Marks this method as being asynchronous
     * @param {number} cpf user CPF number
     * @returns {Array} Array of promoters password change code entries, matching the search (or none if no match is found)
     */
    public async findByCpf (cpf: number) {
        const cpfExists = await PromoterPasswordChangeCode.findOne({raw: true, attributes: ['code'], where: {
            cpf: cpf
        }});
        return cpfExists;
    }

    public async updateCode (code: string){
        await PromoterPasswordChangeCode.update({
            code: code
        },
        {
            where: {
                code: code
            }
        });
    }

    public async generateUniqueCode () {

        //Usage of the "generate" method of the "randomstring" module in order to obtain a 32 character-long password change code
        const randomCode = await randomstring.generate(32);

        //Checks if code exists
        const codeExists = await this.findByCode(randomCode);
        
        //Conditional for the non-existence or existence of the code generated
        if(!codeExists) {
            
            //Returns the code
            return randomCode;
        }
        else{
            //Runs recursively
            return this.generateUniqueCode();
        }
        
    }
}

//Class export declarator
export { PromoterPasswordChangeCodeRepository };