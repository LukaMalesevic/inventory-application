const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SteroidSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    category: { type: Schema.Types.ObjectId, ref: "categories", required: true },
    price: { type: Number },
    number_in_stock: {type: Number },
});


SteroidSchema.virtual("url").get(function() {
    return `/home/${this._id}`;
})

module.exports = mongoose.model("Steroid", SteroidSchema);