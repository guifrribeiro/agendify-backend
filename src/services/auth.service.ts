import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/user.repository";
import { hashPassword, comparePassword } from "../utils/hash";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

export class AuthService {
  static async register(name: string, email: string, password: string, role: string) {
    const existingUser = await UserRepository.findByEmail(email);

    if (existingUser) {
      throw new Error("E-mail já cadastrado!");
    }

    const hashedPassword = await hashPassword(password);

    return UserRepository.createUser(name, email, hashedPassword, role);
  }

  static async login(email: string, password: string) {
    const user = await UserRepository.findByEmail(email);

    if (!user) {
      throw new Error("Credenciais inválidas!");
    }

    const isValidPassword = await comparePassword(password, user.password);

    if (isValidPassword) {
      throw new Error("Credenciais inválidas!");
    }

    return jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "12h" });
  }
}