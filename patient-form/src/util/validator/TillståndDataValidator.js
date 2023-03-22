import Ajv from "ajv"
import addFormats from "ajv-formats"
import { schemaTillstånd } from './schemas/TillståndSchemas'

const TillståndDataValidator = (data) => {

    const ajv = new Ajv()
    addFormats(ajv)

    const validate = ajv.compile(schemaTillstånd)
   
    const dataValid = validate(data)

    if (!dataValid) {
        return {
            valid: false,
            message: "Ändringar kunde inte sparas. Uppgifter felaktiga."
        }
    } else {
        return {
            valid: true,
            message: "Allmäntillstånd tillagd!"
        }
    }
}

export default TillståndDataValidator;