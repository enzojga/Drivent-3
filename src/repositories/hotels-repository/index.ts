import { prisma } from "@/config";

async function findMany() {
  return prisma.hotel.findMany();
}

async function findHotelRooms(id: number) {
  return prisma.hotel.findFirst({
    where: {
      id,
    },
    include: {
      Rooms: true,
    }
  });
}

const hotelsRepository = {
  findMany,
  findHotelRooms
};

export default hotelsRepository;
