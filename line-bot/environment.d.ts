declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CHANNEL_ACCESS_TOKEN: string;
      CHANNEL_SECRET: string;
      LIFF_URL: string;
      PUBLIC_URL: string;
      PORT: string;
    }
  }
}

export {};
