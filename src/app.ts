import express, { Application, NextFunction, Request, Response } from "express";
import routes from "./app/routes";
import cors from "cors";
import httpStatus from "http-status";
import globalErrorHandler from "./app/middlewares/globalErrorHandlers";

import cookieParser from "cookie-parser";

const app: Application = express();

app.use(cors());
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/", routes);

app.get("/", (req: Request, res: Response) => {
  res.send("Wellcome to Cow Hut");
});

app.use(globalErrorHandler);

app.use(async (req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "Route not found.",
      },
    ],
  });
  next();
});

export default app;
