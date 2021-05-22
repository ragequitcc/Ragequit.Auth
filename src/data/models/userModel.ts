import { Schema } from 'mongoose';

const UserSchema = new Schema({
  _id: {
    type: String
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  pass: {
    type: String,
    required: true
  },
}, {_id: false});

export default UserSchema;