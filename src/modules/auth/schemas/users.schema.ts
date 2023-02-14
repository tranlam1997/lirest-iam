import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { User } from "../interfaces/users.interface";
import bcrypt from "bcryptjs";

export const UserSchema = new mongoose.Schema<User>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dateOfBirth: Date,
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  subjectId: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});
// hash password before saving to database
UserSchema.pre("save", function(next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  if (!user.isModified("password")) return next();
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
})
UserSchema.plugin(mongoosePaginate);

export default mongoose.models.Users || mongoose.model("Users", UserSchema);
