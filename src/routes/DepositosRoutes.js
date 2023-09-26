const express = require("express");
const routes = express.Router();
const DepositoController = require("../controllers/DepositoController");
const { validarToken } = require("../middleware/auth");

routes.get("/depositos", validarToken, DepositoController.listarDepositos); //lista todos os depositos , rota de teste
routes.post("/depositos", validarToken, DepositoController.criarDeposito);
routes.patch(
  "/depositos/:id",
  validarToken,
  DepositoController.atualizarDeposito
);
routes.patch(
  "/depositos/:id/status",
  validarToken,
  DepositoController.atualizarStatusDeposito
);
routes.get("/depositos/:id", validarToken, DepositoController.listarDepositoId);
routes.delete(
  "/depositos/:id",
  validarToken,
  DepositoController.excluirDeposito
);

module.exports = routes;
