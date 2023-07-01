import { Schema, model } from "mongoose";
import { AdminModel, IAdmin } from "./admin.interfece";
import bcrypt from "bcrypt";
import config from "../../../config";

const adminSchema = new Schema<IAdmin, AdminModel>(
  {
    phoneNumber: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      required: true,
      type: {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
      },
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

adminSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_sald_round)
  );

  next();
});

export const Admin = model<IAdmin, AdminModel>("Admin", adminSchema);
