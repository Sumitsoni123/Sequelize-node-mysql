// ------------- 1st method of creating model --------------

// const { DataTypes } = require("sequelize");
// const sequelize = require("./index");

// const User = sequelize.define(
//   "User",
//   {
//     // Model attributes are defined here
//     firstName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     lastName: {
//       type: DataTypes.STRING,
//       // allowNull defaults to true
//     },
//   },
//   {
//     //-------------- Other model options go here (not req in this method of creating model) ---------------
//     // sequelize,
//     // modelName: 'User',
//     // timestampz: false, it will not create createdAt updatedAt default cols
//     // createdAt: false,  I don't want createdAt
//     // updatedAt: 'updateTimestamp',  (renaming col name) I want updatedAt to actually be called updateTimestamp
//   }
// );

// // `sequelize.define` also returns the model
// console.log(User === sequelize.models.User); // true

// ------------- 2nd method of creating model ---------------

// const { DataTypes, Model } = require("sequelize");
// const sequelize = require("./index");

// class User extends Model {}

// User.init(
//   {
//     // Model attributes are defined here
//     firstName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     lastName: {
//       type: DataTypes.STRING,
//       // allowNull defaults to true
//     },
//   },
//   {
//     // Other model options go here
//     sequelize, // We need to pass the connection instance
//     modelName: "User", // We need to choose the model name
//   }
// );

// // the defined model is the class itself
// console.log(User === sequelize.models.User); // true

// module.exports = User;

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      firstName: {
        type: DataTypes.STRING,
        // constraints are applied on DB level and so we need to drop table to sync changes
        allowNull: false,
        unique: true,
        // validation occurs at sequelize level
        validate: {
          isAlpha: true,
        },
        // this getter fn will run after data fetching
        get() {
          const rawValue = this.getDataValue("firstName");
          return rawValue ? rawValue.toUpperCase() : null;
        },
      },
      lastName: {
        type: DataTypes.STRING,
        // this setter fn will run after data pushing
        set(value) {
          this.setDataValue("lastName", value + " ji");
        },
      },
      fullName: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${this.firstName} ${this.lastName}`;
        },
        set(value) {
          throw new Error("Do not try to set the fullName value!");
        },
      },
    },
    {
      paranoid: true,             // to enable soft delete 
      deletedAt: "soft_delete",   // alisa name for col
    }
  );
  return User;
};
