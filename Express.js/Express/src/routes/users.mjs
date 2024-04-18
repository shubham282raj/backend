import { Router } from "express";
import {
  query,
  validationResult,
  //   body,
  matchedData,
  checkSchema,
} from "express-validator";
import { mock_users } from "../utils/constants.mjs";
import { create_user_val_schema } from "../utils/validation_schemas.mjs";
import { resolve_user_id } from "../utils/middlewares.mjs";
import { User } from "../mongoose/schemas/user.mjs";

const router = Router();

router.get(
  "/api/users",
  query("sort").isString().notEmpty().withMessage("Seems empty"),
  (req, res) => {
    const result = validationResult(req);

    const {
      query: { sort },
    } = req;

    if (!sort) {
      return res.send(mock_users);
    } else {
      const sorted_users = mock_users.sort((a, b) => {
        if (sort === "asc") {
          return a.name > b.name ? 1 : -1;
        } else if (sort === "desc") {
          return a.name < b.name ? 1 : -1;
        } else {
          return res.status(400).send({ msg: "Invalid Sort Query" });
        }
      });
      return res.send(sorted_users);
    }
  }
);

router.post(
  "/api/users",
  checkSchema(create_user_val_schema),
  async (req, res) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).send(result.array());
    }

    const data = matchedData(req);
    
    try {
      const newUser = new User(data);
      const savedUser = await newUser.save();
      return res.status(201).send(savedUser);
    } catch (err) {
      console.log(err);
      return res.sendStatus(400);
    }
  }
);

router.get("/api/users/:id", resolve_user_id, (req, res) => {
  const { find_user_index } = req;

  const find_user = mock_users[find_user_index];

  if (!find_user) {
    return res.sendStatus(404);
  } else {
    return res.send(find_user);
  }
});

router.put("/api/users/:id", resolve_user_id, (req, res) => {
  const { body, find_user_index, parsed_id } = req;

  mock_users[find_user_index] = {
    ...body,
    id: parsed_id,
  };

  console.log(mock_users);
  return res.sendStatus(200);
});

router.patch("/api/users/:id", resolve_user_id, (req, res) => {
  const { body, find_user_index, parsed_id } = req;

  mock_users[find_user_index] = {
    ...mock_users[find_user_index],
    ...body,
    id: parsed_id,
  };

  console.log(mock_users);
  return res.sendStatus(200);
});

router.delete("/api/users/:id", resolve_user_id, (req, res) => {
  const { find_user_index } = req;

  mock_users.splice(find_user_index, 1);

  console.log(mock_users);
  return res.sendStatus(200);
});

export default router;
