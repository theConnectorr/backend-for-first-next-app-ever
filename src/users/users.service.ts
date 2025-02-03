import { Injectable } from "@nestjs/common"
import { CreateUserDto } from "./dtos/create-user.dto"
import { UpdateUserDto } from "./dtos/update-user.dto"

@Injectable()
export class UsersService {
  constructor() {}

  users = [
    {
      id: 1,
      email: "user1@amk.com",
      roles: ["Admin"],
      password: "user1",
    },
    {
      id: 2,
      email: "user2@amk.com",
      roles: ["Normal"],
      password: "user2",
    },
    {
      id: 3,
      email: "user3@amk.com",
      roles: ["Normal"],
      password: "user3",
    },
    {
      id: 4,
      email: "kylekhoitv@gmail.com",
      roles: ["Normal"],
      password: "user4",
    },
  ]

  findAll() {
    return this.users
  }

  findOne(id: number) {
    return this.users.find((user) => user.id === id)
  }

  findOneByEmail(email: string) {
    return this.users.find((user) => user.email === email)
  }

  createOne(createUserDto: CreateUserDto) {
    const newUser = {
      id: this.users.length + 1,
      ...createUserDto,
    }

    this.users.push(newUser)

    return newUser
  }

  updateOne(id: number, updateUserDto: UpdateUserDto) {
    const updatingUserIndex = this.users.findIndex((user) => user.id === id)

    if (updatingUserIndex === -1) throw new Error("User not found")

    this.users[updatingUserIndex] = {
      ...this.users[updatingUserIndex],
      ...updateUserDto,
    }
  }

  deleteOne(id: number) {
    const deleteUser = this.users.find((user) => user.id === id)

    if (deleteUser === undefined) throw new Error("User not found")

    this.users = this.users.filter((user) => user.id !== deleteUser.id)

    return deleteUser
  }
}
