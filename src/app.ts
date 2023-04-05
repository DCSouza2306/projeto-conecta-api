import express from "express";
import { connectDb, disconnectDB, loadEnv } from "@/config";
import cors from "cors";
import { Express } from "express";

import { bookRoutes, groupRoutes, userRoutes } from "@/routers";

loadEnv();

const app = express();

app.use(cors())
.use(express.json())
.use("/group", groupRoutes)
.use("/books", bookRoutes)
.use("/user", userRoutes);

export function init(): Promise<Express> {
 connectDb();
 return Promise.resolve(app);
}

export async function close(): Promise<void> {
 await disconnectDB();
}

export default app;
