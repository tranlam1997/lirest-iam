import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { Client } from "./interfaces/clients.interface";


const ResourceSchema = new mongoose.Schema({
  name: String,
  attributes: [String],
  actions: [String]
}, {
  _id: false
});

export const ClientSchema = new mongoose.Schema<Client>({
  name: {
    type: String,
    required: true,
  },
  description: String,
  resources: [ResourceSchema]
});

ClientSchema.plugin(mongoosePaginate);

export default mongoose.model("Clients", ClientSchema);

