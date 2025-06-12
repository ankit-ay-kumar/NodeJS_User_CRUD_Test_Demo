import { Request, Response } from "express";
import { UserData } from "../model/userModel";
import { UserMessages } from "../enums/messages.enum";
// import { redisClient } from "../config/redisConfig";

// const USER_CACHE_PREFIX = "users:";
// const USER_LIST_CACHE_KEY = "users:list";

export const getUser = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  if (id) {
    // get specific user by id if user id is provided in request param
    try {
      // const cacheKey = `${USER_CACHE_PREFIX}${id}`;
      // const cachedUser = await redisClient.get(cacheKey);

      // if (cachedUser) {
      //   return res.status(200).json(JSON.parse(cachedUser));
      // }

      const user = await UserData.findById(req.params.id);

      if (!user) return res.status(404).json({ error: UserMessages.USER_NOT_FOUND });

      // await redisClient.set(cacheKey, JSON.stringify(user), { EX: 3600 });
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ error: UserMessages.GET_USER_FAILED });
    }
  } else {
    // get all users if no user id is provided in request param
    try {
      // const cachedList = await redisClient.get(USER_LIST_CACHE_KEY);
      // if (cachedList) {
      //   return res.status(200).json(JSON.parse(cachedList));
      // }

      const userList = await UserData.find();

      if (userList.length === 0) return res.status(204).send();
      // await redisClient.set(USER_LIST_CACHE_KEY, JSON.stringify(userList), { EX: 3600 });
      res.status(200).json(userList);
    } catch (err) {
      res.status(500).json({ error: UserMessages.GET_USERS_FAILED });
    }
  }
};

export const createUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const users = await UserData.insertMany(req.body);
    // await redisClient.del(USER_LIST_CACHE_KEY);
    res.status(201).json({ message: UserMessages.USER_CREATED, users });
  } catch (err) {
    res.status(500).json({ error: UserMessages.CREATE_USER_FAILED });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const user = await UserData.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!user) return res.status(404).json({ error: UserMessages.USER_NOT_FOUND });

    // const cacheKey = `${USER_CACHE_PREFIX}${req.params.id}`;
    // await redisClient.set(cacheKey, JSON.stringify(user), { EX: 3600 });
    // await redisClient.del(USER_LIST_CACHE_KEY);

    res.status(200).json({ message: UserMessages.USER_UPDATED, user });
  } catch (err) {
    res.status(500).json({ error: UserMessages.UPDATE_USER_FAILED });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const user = await UserData.findByIdAndDelete(req.params.id);

    if (!user) return res.status(404).json({ error: UserMessages.USER_NOT_FOUND });

    // const cacheKey = `${USER_CACHE_PREFIX}${req.params.id}`;
    // await redisClient.del(cacheKey);
    // await redisClient.del(USER_LIST_CACHE_KEY);

    res.status(200).json({ message: UserMessages.USER_DELETED, user });
  } catch (err) {
    res.status(500).json({ error: UserMessages.DELETE_USER_FAILED });
  }
};
