import Ajv from "ajv"
import addFormats from "ajv-formats"
import { schemaKirurgi, schemaOpkod,
schemaBehandlingstyp, schemaBehandling } from './schemas/BehandlingSchemas'

/**
 * 
 * @param {data} data is the data to validate. 
 * @param {property} property is the property 
 *                   to validate, if any.
 *                   If NULL, function validates
 *                   entire data object. 
 * @returns True if validation was succesful,
 *          False if validation failed. 
 */
const BehandlingDataValidator = (data, property) => {
    
    const ajv = new Ajv()
    addFormats(ajv)
    var validate;

    switch (property) {
        case 'kirurgi':
            validate = ajv.compile(schemaKirurgi);
            break;
        case 'opkod':
            validate = ajv.compile(schemaOpkod);
            break;
        case 'behandlingstyp':
            validate = ajv.compile(schemaBehandlingstyp);
            break;
        default:
            validate = ajv.compile(schemaBehandling);
    }

    const validData = validate(data)

    if (!validData) {
        return {
            valid: false,
            message: "Ändringar kunde inte sparas. Uppgifter felaktiga."
        }
    } else {
        return {
            valid: true,
            message: "Behandlingstyp tillagd!"
        }
    }
}

export default BehandlingDataValidator;