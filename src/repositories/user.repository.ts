import { prisma } from "../prisma";

export class UserRepository {
  static async findByEmail(email: string) {
    return await prisma.user.findUnique({ where: { email } });
  }

  static async createUser(name: string, email: string, password: string, role: string) {
    return await prisma.user.create({
      data: { name, email, password, role }
    });
  }

  static async updateUser(name: string, email: string, password: string, role: string) {
    return await prisma.user.update({
      data: { name, password, role },
      where: { email }
    });
  }
}