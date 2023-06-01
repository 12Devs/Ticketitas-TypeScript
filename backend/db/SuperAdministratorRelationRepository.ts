//Most of the variables and some of the text used to document this file were auto-generated using {@link https://marketplace.visualstudio.com/items?itemName=crystal-spider.jsdoc-generator JSDoc Generator by Crystal Spider}

/**
 * Import of the class {@link SuperAdministratorRelation}
 */
import { SuperAdministratorRelation } from "../models/SuperAdministratorRelation";

/**
 * Class for handling the IO of database info
 * @date 5/17/2023 - 3:10:29 AM
 *
 * @class AdministratorRepository
 * @typedef {SuperAdministratorRelationRepository}
 */
class SuperAdministratorRelationRepository {

    /**
     * Method for requesting the insertion of (a) new row(s) in the server database in order to store the information of a new administrator registry
     * @date 5/17/2023 - 3:11:52 AM
     *
     * @public Marks this method as having "public" visibility
     * @async Marks this method as being asynchronous
     * @param {number} cpf user CPF number
     * @returns {*}
     */
    public async create (cpf: number){
        
        //Executes the database actions
        await SuperAdministratorRelation.create({cpf});
        
    }

    /**
     * Method for searching an administrator cpf in this relation
     * @date 5/17/2023 - 4:27:17 AM
     *
     * @public Marks this method as having "public" visibility
     * @async Marks this method as being asynchronous
     * @param {number} cpf user CPF number
     * @returns {Array} Array of administrators password change code entries, matching the search (or none if no match is found)
     */
    public async findByCpf (cpf: number) {
        const cpfExists = await SuperAdministratorRelation.findOne({raw: true, attributes: ['cpf'], where: {
            cpf: cpf
        }});
        return cpfExists;
        
    }
}

//Class export declarator
export { SuperAdministratorRelationRepository };