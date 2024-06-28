const { user: User, contact: Contact } = require("../models");
const { Sequelize, Op, QueryTypes } = require("sequelize");
const db = require("../models");

const addUser = async (req, res) => {
  try {
    const payload = req.body;
    const data = await User.create(payload);
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: [
        "id",
        ["lastName", "last_name"],
        [Sequelize.literal("COUNT(id) OVER ()"), "total"],
      ], // attributes means only those cols will be returned
    });
    res.status(200).json({ data: users });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: {
          [Op.eq]: req.params.id,
        },
      },
    });
    res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const payload = req.body;
    const data = await User.update(payload, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

const rawQuery = async (req, res) => {
  try {
    // const users = await db.sequelize.query("SELECT * FROM `users`", {
    //   type: QueryTypes.SELECT,

    //   model: User     // if this line written then it will include all validation & constraints done on model
    // });

    // const users = await db.sequelize.query(
    //   "SELECT * FROM users WHERE firstName = :fname",
    //   {
    //     replacements: { fname: "Ekta" },
    //     type: QueryTypes.SELECT,
    //   }
    // );

    const users = await db.sequelize.query(
      "SELECT * FROM users WHERE firstName = $fname",
      {
        bind: { fname: "Ekta" },
        type: QueryTypes.SELECT,
      }
    );

    res.status(200).json({ data: users });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

const oneToOne = async (req, res) => {
  try {
    // const newUser = await User.create({ firstName: "Bhavna", lastName: "Soni" });
    // if (newUser?.id) {
    //   await Contact.create({
    //     current_address: "Bengaluru",
    //     permanent_address: "Champa",
    //     UserId: newUser.id
    //   });
    //   res.status(200).json({ data: newUser });
    // }

    const user = await User.findAll({
      include: [
        {
          model: Contact,
          as: "contact_details",
          attributes: ["current_address", "permanent_address"],
        },
      ],
      attributes: ["firstName", "lastName"],
    });
    res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

const oneToMany = async (req, res) => {
  try {
    const user = await User.findOne({
      include: [
        {
          model: Contact,
          as: "contact_details",
          attributes: ["current_address", "permanent_address"],
        },
      ],
      attributes: ["firstName", "lastName"],
      where: {
        id: 1,
      },
    });
    res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

const userParanoid = async (req, res) => {
  try {
    const user = await User.restore({
      where: {
        id: 1,
      },
    });
    res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

module.exports = {
  addUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  rawQuery,
  oneToOne,
  oneToMany,
  userParanoid,
};
