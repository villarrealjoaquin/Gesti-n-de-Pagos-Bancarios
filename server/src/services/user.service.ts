import { PrismaClient, User } from "@prisma/client";
import { HttpStatus } from "../utils/http-status-enum";

const prisma = new PrismaClient();

class UserService {
  async getAllUsers(): Promise<User[]> {
    return prisma.user.findMany({
      include: {
        payments: true,
      },
    });
  }

  async getUserById(id: number) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        payments: true,
      },
    });
    if (!user) {
      return {
        status: HttpStatus.NOT_FOUND,
        data: {
          message: "User not found",
        },
      };
    }
    return {
      status: HttpStatus.OK,
      data: user,
    };
  }

  async createUser(user: Omit<User, "id">) {
    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (userAlreadyExists) {
      return {
        status: HttpStatus.CONFLICT,
        data: {
          message: "User already exists",
        },
      };
    }

    const created = prisma.user.create({
      data: user,
      include: {
        payments: true,
      },
    });

    if (!created) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        data: {
          message: "Error creating user",
        },
      };
    }
    return {
      status: HttpStatus.CREATED,
      data: created,
    };
  }

  async updateUser(id: number, data: Partial<User>) {
    const updated = await prisma.user.update({
      where: {
        id,
      },
      data,
      include: {
        payments: true,
      },
    });

    if (!updated) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        data: {
          message: "Error updating user",
        },
      };
    }

    return {
      status: HttpStatus.OK,
      data: updated,
    };
  }

  async deleteUser(id: number) {
    const deleted = await prisma.user.delete({
      where: {
        id,
      },
      include: {
        payments: true,
      },
    });

    if (!deleted) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        data: {
          message: "Error deleting user",
        },
      };
    }

    return {
      status: HttpStatus.OK,
      data: deleted,
    };
  }

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        payments: true,
      },
    });
  }
}

export default new UserService();
