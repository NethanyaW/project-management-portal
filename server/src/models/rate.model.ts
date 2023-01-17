import mongoose, { Types } from 'mongoose';

const Schema = mongoose.Schema;
const objectID = mongoose.Types.ObjectId;

const Rate = new Schema({
    item: Types.ObjectId,
    rates: [Object]
});

const RateModel = mongoose.model("Rate", Rate);

export default RateModel;
