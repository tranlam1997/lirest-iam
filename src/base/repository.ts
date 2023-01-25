import { NotFoundException } from '@src/errors/exceptions/not-found-exception';
import { Model } from 'mongoose';

export default function BaseRepository<T extends object>(model: Model<T>): any {
  const primaryKey = '_id';
  return {
    async create(data: any): Promise<T> {
      return new model(data).save();
    },

    async createOrUpdate(entity: any): Promise<T> {
      let document: any = await model.findOne({
        [primaryKey]: entity[primaryKey],
      });

      if (document === null) {
        document = await new model(entity).save();
      } else {
        await document.set(entity).save();
      }

      return document;
    },

    async findById(id: string, options: any = {}, populates: string[] = []): Promise<T> {
      const document: any = await model.findById(id, null, { ...options, lean: true }).exec();

      if (document && populates.length) {
        for (const path of populates) {
          await document.populate(path).execPopulate();
        }
      }

      if (!model) {
        throw new NotFoundException(`Not found id: ${id}`);
      }
      return document;
    },

    async findOne(
      params: { [key: string]: any } = {},
      options: { [key: string]: any } = {},
      populates: string[] = [],
    ): Promise<T> {
      const document: any = await model.findOne(params as any, {}, { ...options, lean: true });

      if (document && populates.length) {
        for (const path of populates) {
          await document.populate(path).execPopulate();
        }
      }

      return document;
    },

    async find(
      params: object = {},
      options: any = {},
      populates: string[] = [],
      sort: { [key: string]: any } = {},
    ): Promise<T[]> {
      const documents: any[] = await model
        .find(params, null, { ...options, lean: true })
        .sort(sort)
        .exec();

      if (populates.length) {
        for (const path of populates) {
          for (const document of documents) {
            await document.populate(path).execPopulate();
          }
        }
      }

      return documents;
    },

    async findAll(
      filter: any = {},
      options: any = {},
      limit = 0,
      sort: { [key: string]: any } = {},
    ): Promise<Array<T>> {
      const query = model
        .find(filter, null, { ...options, lean: true })
        .limit(limit)
        .sort(sort);
      return query.exec();
    },

    getModel() {
      return model;
    },

    async removeAll(filter: any = {}) {
      return model.deleteMany(filter).exec();
    },

    async removeById(id: string) {
      return model.findByIdAndDelete(id).exec();
    },

    async updateById(id: any, doc: any, options?: any) {
      return model.updateOne({ [primaryKey]: id }, doc, options);
    },

    async updateOne(conditions: any, doc: any, options?: any) {
      return model.findOneAndUpdate(conditions, doc, { new: true, ...options }).exec();
    },

    async updateMany(conditions: any, doc: any, options?: Record<string, any>) {
      return model.updateMany(conditions, doc, { new: true, ...options }).exec();
    },

    async insertMany(doc: any) {
      return model.insertMany(doc);
    },

    async count(filter: any = {}) {
      return model.countDocuments(filter);
    },
  };
}
