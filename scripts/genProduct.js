const fs = require( "fs" )
const path = require( "path" );

const { faker:{ company, commerce, helpers, date, random, internet } } = require( "@faker-js/faker" );
const uuid = require( "uuid" ).v4;

const keywordScalar = 5;
const createdOn = date.between( "2000-01-01T00:00:00", (new Date()).toISOString() );
const keywords = [];

for( let i = 0, l = Math.floor( Math.random() * keywordScalar ); i < l; ++i ){
    keywords.push( company.bsAdjective() )
}

const imageScalar = 4
const images = [];

let domain = internet.domainName();

const websites = [{
    id:      uuid(),
    address: `https://${domain}`
}];

for( let i = 0, l = Math.floor( Math.random() * imageScalar ); i < l; ++i ){
    
    images.push({
        id:      uuid(),
        address: `https://${domain}/images/${uuid()}.png`
    })
}

const measuresScalar = 4
const measurePurposes = [ "boxed", "storage", "shipping" ]
const uoms = [ "in", "ft", "cm", "m", "yrd" ];
const measures = [];

for( let i = 0, l = Math.floor( Math.random() * measuresScalar ); i < l; ++i ){
    measures.push({
        id:      uuid(),
        purpose: helpers.shuffle( measurePurposes )[0],
        weight:  random.numeric( 2 ),
        width:   random.numeric( 2 ),
        height:  random.numeric( 2 ),
        length:  random.numeric( 2 ),
        uom:     helpers.shuffle( uoms )[0]
    })
}

let fiveStar   = random.numeric( 5 )
let fourStar   = random.numeric( 5 )
let threeStar  = random.numeric( 5 )
let twoStar    = random.numeric( 5 )
let oneStar    = random.numeric( 5 )
let countTotal = fiveStar + fourStar + threeStar + twoStar + oneStar

fs.writeFileSync(
    path.join( __dirname, "product.json"),
    JSON.stringify({
        id:          uuid(),
        name:        commerce.productName(),
        type:        commerce.product(),
        department:  commerce.department(),
        status:      helpers.shuffle(['CREATED', 'REVIEWED', 'PUBLISHED', 'REVOKED'])[0],
        price:       commerce.price( 5, 200, 2, "$" ),
        description: commerce.productDescription(),
        availabilityDate: date.between( createdOn.toISOString(), createdOn.setMonth( createdOn.getMonth() + 2 ) ),

        keywords:    keywords,
        soldBy:      uuid(),

        images:  images,
        measure: measures,
        website: websites,

        reviewSummary: {
            fiveStar:    fiveStar,
            fourStar:    fourStar,
            threeStar:   threeStar,
            twoStar:     twoStar,
            oneStar:     oneStar,
            reviewCount: countTotal
        },
    
        metadata:{
            version: "1.0.0",
            lastChangeReason: "Make it more sellable",
            lastUpdatedOn: date.between( createdOn.toISOString(), (new Date()).toISOString() ),
            lastUpdatedBy: uuid(),
            createdOn:     createdOn,
            createdBy:     uuid(),
        }
    }, null, 2 )
)