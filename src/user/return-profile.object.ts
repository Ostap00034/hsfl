import { Prisma } from '@prisma/client';

export const ReturnUserProfile: Prisma.UserSelect = {
  id: true,
  email: true,
  fio: true,
  role: true,
  point: true,
  mo: true,
  Post: true,
};
