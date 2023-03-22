import Ajv from "ajv"
import addFormats from "ajv-formats"
import { schemaDiagnos } from './schemas/DiagnosSchemas'

const DiagnosDataValidator = (data) => {

    const ajv = new Ajv()
    addFormats(ajv)

    const validate = ajv.compile(schemaDiagnos)
   

    const structureValid = validate(data)

    if (!structureValid) {
        return {
            valid: false,
            message: "Ändringar kunde inte sparas. Uppgifter felaktiga."
        }
    } else {
        return {
            valid: true,
            message: "Diagnos tillagd!"
        }
    }
}

export default DiagnosDataValidator;