"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const accountController_1 = require("../controllers/accountController");
const homeRouter = express_1.default.Router();
// GET Accounts
homeRouter.get('/', accountController_1.getAccounts);
homeRouter.get('/:id', accountController_1.getAccount);
// POST Account
homeRouter.post('/', accountController_1.createAccount);
// DELETE Account
homeRouter.delete("/:id", accountController_1.deleteAccount);
// UPDATE Account
homeRouter.patch("/:id", accountController_1.updateAccount);
exports.default = homeRouter;
