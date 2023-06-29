import mongoose from "mongoose";
import { IGenericErrorMessage } from "../interfaces/error";
import httpStatus from "http-status";

const handleCastError = (error: mongoose.Error.CastError) => {
  console.log(error);
  const errors: IGenericErrorMessage[] = [
    {
      path: error.path,
      message: "Invalide Error.",
    },
  ];
  const statusCode = httpStatus.BAD_REQUEST;
  return {
    statusCode,
    message: "Case Error",
    errorMessages: errors,
  };
};

export default handleCastError;
