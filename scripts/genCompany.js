const fs = require( "fs" )
const path = require( "path" );

const { faker:{ internet, company, address, helpers, date, phone } } = require( "@faker-js/faker" );
const uuid = require( "uuid" ).v4;


function  buildURL( domain, subDomain, path ){
    return `${internet.protocol()}://${ subDomain ? subDomain + "." : ""}${domain}/${ path ? path : "" }`;
}


const domain = internet.domainName();
const state = address.state()

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
        id:      uuid(),
        purpose: type,
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
            id:      uuid(),
            purpose: "subDomain",
            address: buildURL( domain, subDomain )
        })
    } else {
        domains.push({
            id:      uuid(),
            purpose: type,
            address: buildURL( domain, type )
        })
    }
}


const phones = [];
const phoneScalar = 10
const phoneTypes = [ "sales", "support", "internal", "warehouses", "services", "operator" ];

for( let i = 0, l = Math.floor( Math.random() * phoneScalar ); i < l; ++i ){
    
    phones.push({
        id:      uuid(),
        purpose: helpers.shuffle( phoneTypes )[0],
        number:  phone.number( "###-###-####" )
    })
}

const subsidiaries = [];
const subsidiaryScalar = 2

for( let i = 0, l = Math.floor( Math.random() * subsidiaryScalar ); i < l; ++i ){
    
    subsidiaries.push({
        id:           uuid(),
        parentId:     uuid(),
        number:       company.name()
    })
}

const parentTo = [];
const parentScalar = 4

for( let i = 0, l = Math.floor( Math.random() * parentScalar ); i < l; ++i ){
    parentTo.push({
        id:           uuid(),
        subsidiaryId: uuid(),
        number:       company.name()
    })
}

fs.writeFileSync(
    path.join( __dirname, "company.json"),
    JSON.stringify({
        id:       uuid(),
        name:     company.name(),
        suffix:   company.companySuffix(),
        status:   helpers.shuffle(['CREATED', 'REVIEWED', 'PUBLISHED', 'REVOKED'])[0],
        website:  domain,
        slogan:   company.catchPhrase(),
        keywords: keywords,

        soldBy:   uuid(),

        email:  emails,
        domain: domains,
        phone:  phones,

        subsidiaryOf: subsidiaries,
        parentOf:     parentTo,

        companyHQ: {
            street:      address.streetAddress(),
            city:        address.cityName(),
            state:       state,
            country:     address.country(),
            postal:      address.zipCodeByState( state ),
            latitude:    address.latitude(),
            longitude:   address.longitude()
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