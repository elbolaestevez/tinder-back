import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class Profile extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  postedBy: MongooseSchema.Types.ObjectId;

  @Prop([String])
  artist: string[];

  @Prop([String])
  movies: string[];
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
