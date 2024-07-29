import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AuthorDocument = Author & Document;

@Schema({ timestamps: true })
export class Author {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ default: false })
  isActive: boolean;

  @Prop({ type: [String], default: [] })
  posts: string[];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop()
  lastLogin: Date;
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
