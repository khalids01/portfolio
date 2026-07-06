declare module "chromium" {
  const chromium: {
    path?: string;
    install: () => Promise<void>;
  };

  export default chromium;
}
