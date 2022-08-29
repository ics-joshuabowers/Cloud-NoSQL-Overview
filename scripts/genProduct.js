const fs = require( "fs" )
const path = require( "path" );

const { commerce, helpers, date } = require( "faker" );
const uuid = require( "uuid" ).v4;

const keywordScalar = 5;
const createdOn = date.between( "2000-01-01T00:00:00", Date.now().toISOString() )
const keywords = [];

for( let i = 0, l = Math.floor( Math.random() * keywordScalar ); i < l; ++i ){
    keywords.push( company.bsAdjective() )
}

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

        keywords:    keywords,
        soldBy:      uuid(),

        metadata:{
            version: "1.0.0",
            lastChangeReason: "Make it more sellable",
            lastUpdatedOn: date.between( createdOn.toISOString(), Date.now().toISOString() ),
            lastUpdatedBy: uuid(),
            createdOn:     createdOn,
            createdBy:     uuid(),
        }
    }, null, 2 )
)