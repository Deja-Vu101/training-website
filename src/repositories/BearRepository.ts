import { injectable } from 'inversify';
import { Bear, IBear } from '../models/bear';

@injectable()
export class BearRepository {
    public async findAll(): Promise<IBear[]> {
        return Bear.find();
    }

    public async findById(id: string): Promise<IBear | null> {
        return Bear.findById(id);
    }

    public async create(bearData: IBear): Promise<IBear> {
        const bear = new Bear(bearData);
        return bear.save();
    }

    public async delete(id: string): Promise<boolean> {
        const result = await Bear.findByIdAndDelete(id);
        return result !== null;
    }

    public async update(id: string, bearData: IBear): Promise<IBear | null> {
        return Bear.findByIdAndUpdate(id, bearData, { new: true });
    }

    public async patch(id: string, bearData: Partial<IBear>): Promise<IBear | null> {
        return Bear.findByIdAndUpdate(id, { $set: bearData }, { new: true });
    }
}
