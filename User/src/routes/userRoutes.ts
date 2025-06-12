import express from "express";
import { createUser, getUser, updateUser, deleteUser } from "../controller/userController";
import { validateBody, validateParams } from "../middleware/validationMiddleware";
import { createUserSchema, updateUserSchema, userIDParamSchema } from "../schemaValidation/userSchemaValidation";

const router = express.Router();

router.get("/", getUser);
router.get("/:id", validateParams(userIDParamSchema), getUser);
router.post("/", validateBody(createUserSchema), createUser);
router.patch("/:id", validateParams(userIDParamSchema), validateBody(updateUserSchema), updateUser);
router.delete("/:id", validateParams(userIDParamSchema), deleteUser);

export default router;
