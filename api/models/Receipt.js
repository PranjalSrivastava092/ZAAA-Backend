var mongoose = require('mongoose');
var config = require('../../config');
var bcrypt = require('bcrypt');
var authy = require('authy')(config.authyKey);
var twilioClient = require('twilio')(config.accountSid, config.authToken);


var ReceiptSchema = new mongoose.Schema({
    
    ReceiptNo:String,
    invoiceId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Invoice"
    },
    date: {
        type: Date,
        default: new Date()
    },
    agencyName: String,
    agencyGSTIN: String,
    agencyPin:String,
    agencyAddress:String,
    agencyState:String,
    agencyPerson: String,
    signature: String,

    publicationName:String,
    publicationEdition:String,
    mediaType:String,
    publicationState:String,
    publicationGSTIN:String,
    
    clientName:String,
    clientState:String,
    clientGSTIN:String,
    executiveName:String,
    executiveOrg:String,

    /*fields of release order to come */
    adGrossAmount:String,
    taxType:String,
    taxAmount:{
        primary:String,
        secondary:String
    },
    taxIncluded:Boolean,
    otherCharges:[
        {
            amount:String,
            chargeType:String,
        }
    ],
    /* upto here */


    /*fields of Invoice, which are to be filled on invoice creation,
     to be filled by default with values of respective feilds in release Order*/
    extraCharges:String,
    publicationDiscount:String,
    agencyDiscount1:String,
    agencyDiscount2:String,
    additionalCharges:String,

    /*upto here */
    
    additionalTax:String,
    
    caption:String,
    remark:String,
    otherRemark:String,
    FinalAmount:String,
    FinalTaxAmount:String,
    netAmountFigures:String,
    netAmountWords:String,


    /*may be omitted, not discussed yet */
    paymentType:String,
    paymentDate:String,
    paymentNo:String,
    paymentAmount:String,
    paymentBankName:String,

    mediahouseID: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"MediaHouse"
    },
    executiveID: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Executive"
    },
    clientID: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Client"
    },
    
    firm : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Firm"
    },
    });
    module.exports = mongoose.model('Receipt', ReceiptSchema);
    