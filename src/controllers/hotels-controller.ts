import { AuthenticatedRequest } from "@/middlewares";
import hotelService from "@/services/hotels-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  try {
    const hotels = await hotelService.listHotels(req.userId);
    res.status(httpStatus.OK).send(hotels);
  } catch (err) {
    console.log(err);
    if(err.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
    res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function getHotelRooms(req: AuthenticatedRequest, res: Response) {
  try {
    const id = Number(req.params.hotelId);
    const rooms = await hotelService.listRoomsByHotelId(id);
    res.status(httpStatus.OK).send(rooms);
  } catch (err) {
    console.log(err);
    if(err.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
    res.sendStatus(httpStatus.NOT_FOUND);
  }
}
