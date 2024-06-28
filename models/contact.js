module.exports = (sequelize, DataTypes, Model) => {
  class Contact extends Model {}

  Contact.init(
    {
      // Model attributes are defined here
      current_address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      permanent_address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      UserId: DataTypes.INTEGER,
    },
    {
      // Other model options go here
      sequelize, // We need to pass the connection instance
      modelName: "Contact", // We need to choose the model name
    }
  );
  return Contact;
};
