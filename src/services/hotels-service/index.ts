import { notFoundError, unauthorizedError } from "@/errors";
import hotelsRepository from "@/repositories/hotels-repository";
import { TicketStatus } from "@prisma/client";
import ticketService from "../tickets-service";

async function listHotels(id: number) {
  const ticket = await ticketService.getTicketByUserId(id);
    
  if(!ticket.id) {
    throw notFoundError();
  }
    
  if(ticket.TicketType.isRemote || !ticket.TicketType.includesHotel || ticket.status === TicketStatus.RESERVED) {
    throw unauthorizedError();
  }
  const hotels = await hotelsRepository.findMany();
  return hotels;
}

async function listRoomsByHotelId(id: number) {
  const rooms = await hotelsRepository.findHotelRooms(id);
  return rooms;
}

const hotelService = {
  listHotels,
  listRoomsByHotelId
};

export default hotelService;
