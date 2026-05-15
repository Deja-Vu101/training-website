import { Schema, model } from 'mongoose';

interface IBear {
    name: string;
    age: number;
    height: number;
    weight: number;
    gender: 'male' | 'female';
    description?: string;
    hibernationTime: number;
    dateAdded: Date;
}

const bearSchema = new Schema<IBear>({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    height: {
        type: Number,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female'],
    },
    description: String,
    hibernationTime: {
        type: Number,
        required: true,
    },
    dateAdded: {
        type: Date,
        default: Date.now,
    },
});

export const Bear = model<IBear>('Bear', bearSchema);
export type { IBear };
