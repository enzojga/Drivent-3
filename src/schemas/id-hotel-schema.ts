import Joi from "joi";

export const createIdHotelSchema = Joi.object({
  hotelId: Joi.number().required()
});
