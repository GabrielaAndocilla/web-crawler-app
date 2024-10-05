
import { DataTypes, Model } from 'sequelize';
import sequelize from '..';

  export interface UserInteractionAttributes {
    id?: number;
    page_number: string;
    title_words_limit: string;
    filter_type: string;

    updatedAt?: Date;
    createdAt?: Date;
  }

  class UserInteraction extends Model<UserInteractionAttributes> implements UserInteractionAttributes {
    public id!: number;
    public page_number!: string;
    public title_words_limit!: string;
    public filter_type!: string;

    public readonly updatedAt!: Date;
    public readonly createdAt!: Date;

  }

  export class PageMetrics extends UserInteraction{
    public page_number!: string;
    public quantity!: number;
  }
  export class LimitWordMetric extends UserInteraction{
    public title_words_limit!: string;
    public quantity!: number;
  }

  export class TypeMetrics extends UserInteraction{
    public filter_type!: string;
    public quantity!: number;

  }

  UserInteraction.init(  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.NUMBER,
    },
    page_number: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    title_words_limit: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    filter_type: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }, {
    sequelize,
    modelName: 'UserInteraction',
  });
  export default UserInteraction;
