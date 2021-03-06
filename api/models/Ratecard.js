var mongoose = require('mongoose');
var config = require('../../config');
var timestamps = require('mongoose-timestamp');

var RatecardSchema = new mongoose.Schema({
MediaType:String,
AdType:String,
AdWords:String,
AdWordsMax:String,
AdTime:String,
RateCardType:String,
BookingCenter:{
    MediaHouseName:String,
    Edition:String,
    PulloutName:String
},

Category:{
    Main:String,
    SubCategory1:String,
    SubCategory2:String,
    SubCategory3:String,
    SubCategory4:String,
    SubCategory5:String,
    SubCategory6:String
},
Rate:{
    rateQuantity:String,
    unit:String,
    unitQuantity:String
},
Position:String,
Hue:String,
MaxSizeLimit: {
    Length:String,
    Width:String
},
MinSizeLimit: {
    Length:String,
    Width:String
},
FixSize:[{Width:String,Length:String,Amount:String}],
Scheme:[{paid:String, Free:String, TimeLimit:String}],
PremiumCustom:{PremiumType:String, Amount:String, Percentage:Boolean},
ValidityPrompt:Boolean,
PremiumBox: Number,
PremiumBaseColour: Number,
PremiumCheckMark:Number,
PremiumEmailId:Number,
PremiumWebsite:Number,
PremiumExtraWords:Number,

Tax:[{ Included:Boolean, TaxRate:String}],
ValidFrom:Date,
ValidTill:Date,
Covered:[{mediaHouse:String, EditionArea:String}],
Remarks:[{remark:String}],

firm : {
    type:mongoose.Schema.Types.ObjectId,
    ref:"Firm"
},
mediaHouseID:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"MediaHouse"
},
global:{
    type:Boolean,
    default:false
}
});

RatecardSchema.pre('save', function(next) {
    var self = this;
    if (!self.isModified('ValidTill')){
        return next();
    }
    else{
        self.ValidityPrompt = true;
        return next();
    }
});


RatecardSchema.plugin(timestamps);
module.exports = mongoose.model('RateCard', RatecardSchema);
