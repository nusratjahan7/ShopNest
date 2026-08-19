import app from "./app";
import connectDB from "./config/db";
import env from "./config/env";

const startServer = async (): Promise<void> => {
  await connectDB();

  app.listen(env.PORT, () => {
    console.log(
      `ShopNest backend running on port ${env.PORT} [${env.NODE_ENV}]`
    );
  });
};

startServer();
