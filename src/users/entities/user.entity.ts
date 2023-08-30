import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

interface Location {
  latitude: number;
  longitude: number;
}

@Schema({ timestamps: true })
export class User extends Document {
  @Prop()
  name: string;

  @Prop({ required: true, unique: true, index: true })
  email: string;

  @Prop()
  birthday: Date;

  @Prop()
  genre: string;

  @Prop()
  searchGenre: string;

  @Prop()
  description: string;

  @Prop({ type: [Number], default: 0 })
  ageRange: number[];

  @Prop({ type: Object }) // Use 'Object' type for complex object
  location: Location;

  @Prop()
  city: string;

  @Prop({ default: false })
  isAdmin: boolean;

  @Prop()
  images: string[];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Profile' })
  postedBy: MongooseSchema.Types.ObjectId;

  @Prop({ default: 0 })
  distance: number;

  @Prop({ default: 0 })
  artistPreference: number;

  @Prop({ default: 0 })
  moviePreference: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
