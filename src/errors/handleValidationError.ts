import mongoose from "mongoose";
import { IGenericErrorMessage } from "../interfaces/error";
import { IGenericErrorResponse } from "../interfaces/common";
import httpStatus from "http-status";

const handleValidationError = (
  err: mongoose.Error.ValidationError
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = Object.values(err.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        message: el?.message,
      };
    }
  );
  const statusCode = httpStatus.BAD_REQUEST;
  return {
    statusCode,
    message: "Validation Error.",
    errorMessages: errors,
  };
};

export default handleValidationError;
