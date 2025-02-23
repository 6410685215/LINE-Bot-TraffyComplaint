declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CHANNEL_ACCESS_TOKEN: string;
      CHANNEL_SECRET: string;
      LIFF_URL: string;
      PORT: string;
    }
  }
}

export {};
