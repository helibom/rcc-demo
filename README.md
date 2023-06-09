# RCC Demo

## Fråga 1.
<img src="./database/db-diagram-black-background.svg">

I diagrammet ovan beskriver jag en databasstruktur som jag har skapat baserat på min tolkning av domänbeskrivningen.

Motiveringen till varför jag har brutit ut just 'Kirurgi' som en egen tabell från dem möjliga behandlingarna,
är att undvika att ha en 'Operationskod' som en kolumn i tabellen 'Behandlingar'.
Detta för att undvika att potentiellt ha rader med NULL värden.

I 'Kirurgi' tabellen används alla tre kolumner som primary key.
Detta för att möjliggöra för flera operationskoder vid samma behandlingstillfälle.

Alternativt skulle 'Kirurgi' tabellen kunna använda sig av en s.k. surrogate key
för primary key / identifierare.
Exempelvis deklarerad som (PostgresSQL) 'id SERIAL PRIMARY KEY'.

Detta går även att säga för övriga tabeller. 
Men för denna design har jag valt att hålla mig till att använda dem uppgifter
som nämns i domänbeskrivningen som kolumner. 

## Fråga 2.
Med utgångspunkt av att försöka ta fram ett XML-format som skulle
kunna läsas in till ett databasschema som jag definierade i Fråga 1,
så landade jag i detta [XML Schema](./xml-schema/schema.xsd).


## Fråga 3.
För uppbygnad (schema?) på JavaScript-objektet för detta formulär,
har jag föreslagit ett objekt som finns beskrivet som 'mock data'
i denna [.JSON fil](./patient-form/public/data/patient-data.json). 

## Fråga 4-6

För Fråga 4 till 6 har jag försökt uppnå kraven jag tolkat från specifikationen
i en enhetlig lösning som finns under gränssnittet i './patient-form'.
En egen tolkning av specifikationen som bör omnämnas, 
är att jag tillägnat registreringen av 'Allmäntillstånd'/'ECOG'
till en egen flik. Jag tolkade det som en logisk uppdelning 
av formulärets olika fält till 'Cancerbehandling' (eller 'Diagnos'),
'Behandling' och 'Allmäntillstånd'. 
Med detta sagt understryker jag, att jag är medveten om att jag inte
kanske förstår domänen eller formulärets 'use case' tillräckligt.

### För att köra:
Från '/patient-form' kör: <br />
$ npm install <br />
$ npm run dev

##### Tack för mig! / Henrik
