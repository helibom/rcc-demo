export const schemaDiagnos = {
    type: "object",
    properties: {
            diagnosgrund: {
                type: "string",
                // 'PAD', 'cytologi', 'röntgen' or 'klinisk undersökning'
                pattern: "^[pP][aA][dD]$|"
                + "^[cC][yY][tT][oO][lL][oO][gG][iI]$|"
                + "^[rR][öÖ][nN][tT][gG][eE][nN]$|"
                + "^[kK][lL][iI][nN][iI][sS][kK]\\s"
                + "[uU][nN][dD][eE][rR][sS][öÖ][kK][nN][iI][nN][gG]$"  
            },
            datum: {
                type: "string",
                format: "date-time"
            }
        },
    required: ["diagnosgrund", "datum"] 
};

;