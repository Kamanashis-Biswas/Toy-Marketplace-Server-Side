import mongoose, { Schema } from 'mongoose';

const ToySchema = new Schema({
    toy_name: Schema.Types.String,
    uid: { type: Schema.Types.String, required: true },
    seller_name: { type: Schema.Types.String, required: true },
    seller_email: { type: Schema.Types.String, required: true },
    category: { type: Schema.Types.String, required: true, enum: [
        "sports_car", "truck", "regular_car", "mini_fire_truck"
    ]},
    rating: {type: Schema.Types.Number, required: true},
    price: { type: Schema.Types.Number },
    avail_qty: { type: Schema.Types.Number, default: 0, required: true },
    descriptions: { type: Schema.Types.String, require: false },
    photoUrl: {type: Schema.Types.String, required: false}
});

const Toy = new mongoose.model("Toy", ToySchema);
export default Toy;