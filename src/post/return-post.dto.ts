import { Prisma } from '@prisma/client';

export const ReturnPostObject: Prisma.PostSelect = {
  id: true,
  title: true,
  point: true,
  user: true,
  criterie: true,
  category: true,
};
