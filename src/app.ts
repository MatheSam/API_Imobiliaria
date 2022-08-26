import "reflect-metadata";
import "express-async-errors";
import express from "express";
import { usersRouter } from "./routers/users";
import { handleError } from "./middlewares/errors.mid";
import { loginRouter } from "./routers/login";
import { categoriesRouter } from "./routers/categories";
import { propertiesRouter } from "./routers/properties";
import { schedulesRouter } from "./routers/schedules";

const app = express();
app.use(express.json());

app.use("/users", usersRouter);
app.use("/login", loginRouter);
app.use("/categories", categoriesRouter);
app.use("/properties", propertiesRouter);
app.use("/schedules", schedulesRouter);

app.use(handleError);

export default app;
