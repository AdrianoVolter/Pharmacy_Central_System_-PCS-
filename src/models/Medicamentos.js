const { INTEGER, STRING, DATE, ENUM } = require("sequelize");
const connection = require("../database/connection");

const Medicamentos = connection.define(
  "medicamentos",
  {
    nome_medicamento: {
      type: STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 50],
          msg: "O nome do medicamento deve ter no mínimo 3 caracteres e no máximo 50 caracteres.",
        },
      },
    },
    nome_laboratorio: {
      type: STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 50],
          msg: "O nome do laboratório deve ter no mínimo 3 caracteres e no máximo 50 caracteres.",
        },
      },
    },
    dosagem: {
      type: INTEGER,
      allowNull: false,
      validate: {
        isNumeric: {
          args: true,
          msg: "A dosagem deve ser um número.",
        },
      },
    },
    unidade_dosagem: {
      type: STRING, //OBS
      allowNull: false,
      validate: {
        isIn: {
          args: [["mg", "mcg", "g", "mL", "%", "Outros"]],
          msg: "A unidade da dosagem deve ser mg, mcg, g, mL, % ou Outros.",
        },
      },
    },
    tipo_medicamento: {
      type: ENUM("Controlado", "Não Controlado"),
      allowNull: false,
      validate: {
        isIn: {
          args: [["Controlado", "Não Controlado"]],
          msg: "O tipo do medicamento deve ser Controlado ou Não Controlado.",
        },
      },
    },

    createdAt: {
      type: DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DATE,
      allowNull: false,
    },
    deleted_at: {
      type: DATE,
      allowNull: true,
    },
  },
  {
    paranoid: true,
  }
);

module.exports = Medicamentos;
