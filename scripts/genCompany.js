const fs = require( "fs" )
const path = require( "path" );

const { faker:{ internet, company, address, helpers, date } } = require( "@faker-js/faker" );
const uuid = require( "uuid" ).v4;


function  buildURL( domain, subDomain, path ){
    return `${internet.protocol()}://${ subDomain ? subDomain + "." : ""}${domain}/${ path ? path : "" }`;
}


const domain = internet.domainName();

const keywordScalar = 5;
const createdOn = date.between( "2000-01-01T00:00:00", (new Date()).toISOString() )


const keywords = [];

for( let i = 0, l = Math.floor( Math.random() * keywordScalar ); i < l; ++i ){
    keywords.push( company.bsAdjective() )
}

const emailScalar = 4
const emails = [];

let types = ['support', 'sales', 'internal'];
let type = "";

for( let i = 0, l = Math.floor( Math.random() * emailScalar ); i < l; ++i ){
    type = types[i];

    emails.push({
        type:    type,
        address: internet.email( type, "", domain, { allowSpecialCharacters: false } )
    })
}

const domainScalar = 10
const domains = [];
let subDomain = ""

for( let i = 0, l = Math.floor( Math.random() * domainScalar ); i < l; ++i ){
    type = types[i];

    if( l > types.length ){
        subDomain = internet.domainWord()
        domains.push({
            type:    "subDomain",
            address: buildURL( domain, subDomain )
        })
    } else {
        domains.push({
            type:    type,
            address: buildURL( domain, type )
        })
    }
}

fs.writeFileSync(
    path.join( __dirname, "company.json"),
    JSON.stringify({
        id:          uuid(),
        name:        company.name(),
        suffix:      company.companySuffix(),
        status:      helpers.shuffle(['CREATED', 'REVIEWED', 'PUBLISHED', 'REVOKED'])[0],
        website:     domain,
        slogan:      company.catchPhrase(),
        keywords:    keywords,

        soldBy:      uuid(),

        email: emails,
        domain: domains,

        companyHQ: {
            street:      "400 S 205 E",
            city:        "Salt Lake City",
            state:       "Utah",
            country:     "United States of America",
            countryCode: "US",
            latitude:    40.759926,
            longitude:   -111.884888
        },

        metadata:{
            version: "1.0.0",
            lastChangeReason: "Reflect new company slogan",
            lastUpdatedOn: date.between( (new Date( createdOn )).toISOString(), (new Date()).toISOString() ),
            lastUpdatedBy: uuid(),
            createdOn:     createdOn,
            createdBy:     uuid(),
        }
    }, null, 2 )
)