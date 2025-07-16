// models/User.ts
import mongoose, { Schema, Document, models } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  image?: string;
  role?: string;
  createdAt?: Date;
}

const UserSchema: Schema = new Schema<IUser>({
  name: String,
  email: { type: String, required: true, unique: true },
  image: String,
  role: { type: String, default: 'user' },
  createdAt: { type: Date, default: Date.now },
});

export default models.User || mongoose.model<IUser>('User', UserSchema);

// // models/User.ts
// import mongoose, { Schema, Document, models, Model } from 'mongoose';

// export interface IUser extends Document {
//   name: string;
//   email: string;
//   image?: string;
//   role?: string;
//   createdAt?: Date;
// }

// const UserSchema: Schema = new Schema<IUser>({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   image: String,
//   role: { type: String, default: 'user' },
//   createdAt: { type: Date, default: Date.now },
// });

// const User: Model<IUser> = (models.User as Model<IUser>) || mongoose.model<IUser>('User', UserSchema);

// export default User;