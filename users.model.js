import sequelize from "../db";
import {
  DataTypes
} from "sequelize";
import companyModel from "../Companies/company.model";

const userModel = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  auth0_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false
  },
  full_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  profile_image: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  phone_number: {
    type: DataTypes.STRING,
    unique: true
  },
  approved_by_customer_admin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  prefer_contact: {
    type: DataTypes.ENUM,
    values: ["phone_number", "email"],
    defaultValue: "email",
  },
});

companyModel.hasMany(userModel, {
  foreignKey: {
    name: "company_id",
    allowNull: false
  },
});
userModel.belongsTo(companyModel, {
  foreignKey: "company_id",
});
userModel.sync();

export default userModel;