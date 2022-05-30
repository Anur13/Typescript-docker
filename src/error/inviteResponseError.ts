import APIError from "./baseError";
import { errorStatusCodes } from "../common/error-codes";

export const inviteResponseError = {
  statusChangeError: function (message: string) {
    return new APIError("Invalid request", errorStatusCodes.BAD_REQUEST, message);
  },
};
