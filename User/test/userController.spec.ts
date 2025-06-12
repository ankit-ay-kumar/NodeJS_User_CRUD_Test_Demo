import { Request, Response } from "express";
import * as userController from "../src/controller/userController";
import { UserData } from "../src/model/userModel";
import { UserMessages } from "../src/enums/messages.enum";

jest.mock("../src/model/userModel");
const mockReqest = (body = {}, params = {}) =>
  ({
    body,
    params,
  } as Request);

const mockResponse = (): Response => {
  const res = {} as any;
  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn().mockReturnThis();
  return res;
};

describe("userController unit test cases", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("createUser method should create user", async () => {
    const userRequest = [{ age: 32, email: "vijay@cg.com", name: "Vijay", department: "Engineering" }];
    const userResponse = {
      message: UserMessages.USER_CREATED,
      users: userRequest,
    };

    const req = mockReqest(userRequest);
    const res = mockResponse();

    (UserData.insertMany as jest.Mock).mockResolvedValue(userRequest);

    await userController.createUser(req, res);

    expect(UserData.insertMany).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(userResponse);
  });

  test("createUser method should return user creation failed error", async () => {
    const userObj = [{ name: "Vijay", email: "vijay@cg.com", age: 32, department: "Engineering" }];
    const req = mockReqest(userObj);
    const res = mockResponse();

    (UserData.validate as jest.Mock).mockReturnValue({ error: null });
    (UserData.insertMany as jest.Mock).mockRejectedValue(new Error(UserMessages.CREATE_USER_FAILED));

    await userController.createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: UserMessages.CREATE_USER_FAILED });
  });

  test("updateUser method should update the user if the user exists", async () => {
    const userID = "6836e77e989262b75caa8c9d";
    const userRequest = { name: "Ramesh", email: "ramesh@cg.com", age: 40, department: "R&D" };
    const userResponse = {
      message: UserMessages.USER_UPDATED,
      user: userRequest,
    };

    const req = mockReqest(userRequest, { id: userID });
    const res = mockResponse();

    (UserData.findByIdAndUpdate as jest.Mock).mockResolvedValue(userRequest);

    await userController.updateUser(req, res);
    expect(UserData.findByIdAndUpdate).toHaveBeenCalledWith(userID, userRequest, { new: true });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(userResponse);
  });

  test("updateUser method should return http 404 if the user doesn'texists", async () => {
    const updatedUser = { name: "Ramesh", email: "ramesh@cg.com", age: 40, department: "R&D" };
    const req = mockReqest(updatedUser, { id: "6836e77e989262b75caa8c9d" });
    const res = mockResponse();

    (UserData.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

    await userController.updateUser(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: UserMessages.USER_NOT_FOUND });
  });

  test("updateUser method should return http 500 when user id is provided and internal error occurs", async () => {
    const updatedUser = { name: "Ramesh", email: "ramesh@cg.com", age: 40, department: "R&D" };
    const req = mockReqest(updatedUser, { id: "6836e77e989262b75caa8c9d" });
    const res = mockResponse();

    (UserData.findByIdAndUpdate as jest.Mock).mockRejectedValue(new Error(UserMessages.UPDATE_USER_FAILED));

    await userController.updateUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: UserMessages.UPDATE_USER_FAILED });
  });

  test("deleteUser method should delete user record if the user exists", async () => {
    const userID = "6836e77e989262b75caa8c9d";
    const userRequest = { name: "Ramesh", email: "ramesh@cg.com", age: 40, department: "R&D" };
    const userResponse = {
      message: UserMessages.USER_DELETED,
      user: userRequest,
    };

    const req = mockReqest(userRequest, { id: userID });
    const res = mockResponse();

    (UserData.findByIdAndDelete as jest.Mock).mockResolvedValue(userRequest);

    await userController.deleteUser(req, res);
    expect(UserData.findByIdAndDelete).toHaveBeenCalledWith(userID);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(userResponse);
  });

  test("deleteUser method should return http 404 if the user doesn'texists", async () => {
    const deletedUser = { name: "Ramesh", email: "ramesh@cg.com", age: 40, department: "R&D" };
    const req = mockReqest(deletedUser, { id: "6836e77e989262b75caa8c9d" });
    const res = mockResponse();

    (UserData.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

    await userController.deleteUser(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: UserMessages.USER_NOT_FOUND });
  });

  test("deleteUser method should return http 500 when user id is provided and internal error occurs", async () => {
    const deletedUser = { name: "Ramesh", email: "ramesh@cg.com", age: 40, department: "R&D" };
    const req = mockReqest(deletedUser, { id: "6836e77e989262b75caa8c9d" });
    const res = mockResponse();

    (UserData.findByIdAndDelete as jest.Mock).mockRejectedValue(new Error(UserMessages.DELETE_USER_FAILED));

    await userController.deleteUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: UserMessages.DELETE_USER_FAILED });
  });

  test("getUser method should return list of users", async () => {
    const req = mockReqest();
    const res = mockResponse();
    const userList = [
      { id: "6836e77e989262b75caa8c9d", name: "Rahul", email: "rahul@cg.com", age: 32, department: "Engineering" },
      { id: "7736e77e556662b75caa8c4a", name: "Sachin", email: "sachin@cg.com", age: 30, department: "R&D" },
      { id: "9936e77e776685b75caa8c7w", name: "Dinesh", email: "dinesh@cg.com", age: 36, department: "Operation" },
      { id: "9936e77e776685b75caa8c7w", name: "Gagan", email: "gagan@cg.com", age: 36, department: "Finance" },
    ];

    (UserData.find as jest.Mock).mockResolvedValue(userList);

    await userController.getUser(req, res);
    expect(UserData.find).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(userList);
  });

  test("getUser method should return 204", async () => {
    const req = mockReqest();
    const res = mockResponse();
    const userList: any[] = [];

    (UserData.find as jest.Mock).mockResolvedValue(userList);

    await userController.getUser(req, res);
    expect(UserData.find).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(204);
  });

  test("getUser method should return http 500 if no user id is provided", async () => {
    const req = mockReqest();
    const res = mockResponse();

    (UserData.find as jest.Mock).mockRejectedValue(new Error(UserMessages.GET_USERS_FAILED));

    await userController.getUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: UserMessages.GET_USERS_FAILED });
  });

  test("getUser method should return user details for valid user id", async () => {
    const userID = "6836e77e989262b75caa8c9d";
    const req = mockReqest({}, { id: userID });
    const res = mockResponse();
    const userObj = { id: userID, name: "Rahul", email: "rahul@cg.com", age: 32, department: "Engineering" };

    (UserData.findById as jest.Mock).mockResolvedValue(userObj);

    await userController.getUser(req, res);

    expect(UserData.findById).toHaveBeenCalledWith(userID);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(userObj);
  });

  test("getUser method should return http 500 when user id is provided and internal error occurs", async () => {
    const userID = "6836e77e989262b75caa8c9d";
    const req = mockReqest({}, { id: userID });
    const res = mockResponse();

    (UserData.findById as jest.Mock).mockRejectedValue(new Error(UserMessages.GET_USER_FAILED));

    await userController.getUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: UserMessages.GET_USER_FAILED });
  });

  test("getUser method should return http 404 if user doesn't exist", async () => {
    const userID = "6836e77e989262b75caa8c9d";
    const req = mockReqest({}, { id: userID });
    const res = mockResponse();

    (UserData.findById as jest.Mock).mockResolvedValue(null);

    await userController.getUser(req, res);
    expect(UserData.findById).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: UserMessages.USER_NOT_FOUND });
  });
});
