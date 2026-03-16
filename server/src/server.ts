import app from "./app";
import { db } from "./config/db";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    const conn = await db.getConnection();
    console.log("MySQL connected");
    conn.release();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to DB", error);
    process.exit(1);
  }
};

startServer();