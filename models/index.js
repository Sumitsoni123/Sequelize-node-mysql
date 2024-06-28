const { Sequelize, DataTypes, Model } = require("sequelize");

const sequelize = new Sequelize("employeedb", "sumit", "root", {
  host: "localhost",
  logging: false, // it will disable printing sql logs
  dialect: "mysql",
  // connection pool
  pool: {
    max: 10, // Maximum number of connection in pool
    min: 0, // Minimum number of connection in pool
    acquire: 30000, // Maximum time, in milliseconds, that pool will try to get connection before throwing error
    idle: 10000, // Maximum time, in milliseconds, that a connection can be idle before being released
  },
});

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user")(sequelize, DataTypes);
db.contact = require("./contact")(sequelize, DataTypes, Model);

// one to one association
// db.user.hasOne(db.contact, {as: 'contact_details'});  // as is alias name (optional)
// db.contact.belongsTo(db.user);

// one to many association
db.user.hasMany(db.contact, { as: "contact_details" }); // as is alias name (optional)
db.contact.belongsTo(db.user);

// many to many association (through table automatically gets created)
// db.user.belongsToMany(db.contact, { through: "UserContact" });
// db.contact.belongsToMany(db.user, { through: "UserContact" });

db.sequelize.sync({ force: false });
module.exports = db;
