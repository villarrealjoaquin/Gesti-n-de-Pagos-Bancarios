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
    if (isNaN(id)) {
      return {
        status: HttpStatus.BAD_REQUEST,
        data: {
          message: "Invalid user id",
        },
      };
    }
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
    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      payments: user.payments,
    };
    return {
      status: HttpStatus.OK,
      data: userWithoutPassword,
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
    const created = await prisma.user.create({
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
    if (isNaN(id)) {
      return {
        status: HttpStatus.BAD_REQUEST,
        data: {
          message: "Invalid user id",
        },
      };
    }
    const existsUser = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!existsUser) {
      return {
        status: HttpStatus.NOT_FOUND,
        data: {
          message: "User not found",
        },
      };
    }
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
    const userWithoutPassword = {
      id: updated.id,
      name: updated.name,
      email: updated.email,
      payments: updated.payments,
    };
    return {
      status: HttpStatus.OK,
      data: userWithoutPassword,
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
