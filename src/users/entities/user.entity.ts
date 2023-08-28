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

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  birthday: Date;

  @Prop()
  genre: string;

  @Prop()
  searchGenre: string;

  @Prop()
  description: string;

  @Prop([Number])
  ageRange: number[];

  @Prop({ type: Object }) // Use 'Object' type for complex object
  location: Location;

  @Prop()
  city: string;

  @Prop({ default: false })
  isAdmin: boolean;

  @Prop({ required: true })
  images: string[];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Profile' })
  postedBy: MongooseSchema.Types.ObjectId;

  @Prop()
  distance: number;

  @Prop()
  artistPreference: number;

  @Prop()
  moviePreference: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
