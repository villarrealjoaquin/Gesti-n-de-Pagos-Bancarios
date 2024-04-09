import app from "./app";

const PORT = process.env.PORT || 4000;

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      POSTGRES_URL: string;
      JWT_SECRET: string;
      JWT_EXPIRES_IN: string;
      FRONTEND_URL_BASE: string;
    }
  }

  namespace Express {
    interface Request {
      user: {
        id: number;
        name: string;
        email: string;
      };
    }
  }
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
