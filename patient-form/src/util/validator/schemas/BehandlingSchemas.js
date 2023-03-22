export const schemaKirurgi = {
    type: "string",
    // Accepts case-insensitive 'Kirurgi'    
    pattern: "^[kK][iI][rR][uU][rR][gG][iI]$"
}

export const schemaBehandlingstyp = {
    type: "string",
    // Accepts case-insensitive 'Kirurgi',
    // 'strålbehandling' or 'cytostatikabehandling'    
    pattern: "^[kK][iI][rR][uU][rR][gG][iI]$|"
                + "^[sS][tT][rR][åÅ][lL]"
                + "[bB][eE][hH][aA][nN][dD][lL][iI][nN][gG]$|"
                + "^[cC][yY][tT][oO][sS][tT][aA][tT][iI][kK][aA]"
                + "[bB][eE][hH][aA][nN][dD][lL][iI][nN][gG]$"
}

export const schemaOpkod = {
    type: "string",
    pattern: "^[a-zA-Z]{2}[\\d]{4}$" 
}

export const schemaBehandling = {
    type: "object",
    properties: {
        behandlingstyp: schemaBehandlingstyp,
        datum: {
            type: "string",
            format: "date-time"
        },
        opkoder: {
            type: "array",
            items: schemaOpkod
            // items: {
            //     type: "string",
            //     pattern: "^[a-zA-Z]{2}[\\d]{4}$"   
            // }
        },
    },
    required: ["behandlingstyp", "datum"] 
}