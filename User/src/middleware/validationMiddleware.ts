import { Request, Response, NextFunction } from "express";
import { ObjectSchema, Schema } from "joi";

export const validateBody = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction): any => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
};

export const validateParams = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): any => {
    const { error } = schema.validate(req.params);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
};
