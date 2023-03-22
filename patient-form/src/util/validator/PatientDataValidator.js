import Ajv from "ajv"
import addFormats from "ajv-formats"
import { schemaBehandling } from './schemas/BehandlingSchemas'
import { schemaDiagnos } from './schemas/DiagnosSchemas'
import { schemaTillstånd } from './schemas/TillståndSchemas'

/**
 * Validates data gathered by forms
 * in PatientFormApp
 * @param {patientData} patientData The data to validate
 */
const PatientDataValidator = (patientData) => {

    const data = patientData

    const ajv = new Ajv()
    addFormats(ajv)
    
    const validate = ajv.compile({
        type: "object",
        properties: {
            personNbr: {type: "number"},
            behandlingar: {
                type: "array",
                items: schemaBehandling
            },
            diagnoser: {
                type: "array",
                items: schemaDiagnos
            },
            tillstand: {
                type: "array",
                items: schemaTillstånd
            }
        },
        required: ["personNbr"] // More required props?
    })
    
    const dataValid = validate(data)

    if (dataValid) {        
        return {
            valid: true,
            message: "Ändringar sparade!"
        }
    } 
    if (!dataValid) {
        return {
            valid: false,
            message: "Ändringar kunde inte sparas. Uppgifter felaktiga."
        }
    }
}

export default PatientDataValidator;
