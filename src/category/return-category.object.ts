import { Prisma } from '@prisma/client';

export const ReturnCategoryObject: Prisma.CategorySelect = {
  id: true,
  title: true,
  Criterie: true,
};
