import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Articles extends Document {
    @Prop({ type: String })
    title: string;

    @Prop({ type: String })
    slug: string;

    @Prop({ type: String })
    description: string;

    @Prop({ type: Date })
    createdAt: Date;

    @Prop({ type: Date })
    updatedAt: Date;
}

export const articleSchema = SchemaFactory.createForClass(Articles);
