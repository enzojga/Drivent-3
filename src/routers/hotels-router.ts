import { getHotelRooms, getHotels } from "@/controllers";
import { authenticateToken, validateParams } from "@/middlewares";
import { createIdHotelSchema } from "@/schemas";
import { Router } from "express";

const hotelsRouter = Router();

hotelsRouter
  .use("/*", authenticateToken)
  .get("/", getHotels)
  .get("/:hotelId", validateParams(createIdHotelSchema), getHotelRooms);

export { hotelsRouter };
