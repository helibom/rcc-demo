export const schemaEcog = {
    type: "integer",
    minimum: 0,
    maximum: 5
}

export const schemaTillstånd = {
    type: "object",
    properties: {
            ecog: schemaEcog,
            datum: {
                type: "string",
                format: "date-time"
            }
        },
    required: ["ecog", "datum"] 
};