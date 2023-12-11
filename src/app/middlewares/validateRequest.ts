import { Request, Response } from "express";
import { NextFunction } from "express-serve-static-core";
import { AnyObject } from "mongoose";
import { AnyZodObject, ZodEffects } from "zod";

const validateRequest =
  (schema: AnyObject | ZodEffects<AnyZodObject>) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
        cookies: req.cookies,
      });
      return next();
    } catch (error) {
      next(error);
    }
  };

export default validateRequest;
