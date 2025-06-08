module.exports = {
  apps: [
    {
      name: "gestor-encuestas",
      script: "dist/src/main.js",
      env: {
        NODE_ENV: "production",
        PORT: 4000,
        CORS_ORIGIN: "localhost",
        DB_HOST: "localhost",
        DB_PORT: 5432,
        DB_USER: "app",
        DB_PASSWORD: "1234",
        DB_NAME: "gestor-encuestas-db",
        DB_LOGGING: "false",
        GLOBAL_PREFIX: "api",
        SWAGGER_ENABLED: false,
      },
      time: true,
    },
  ],
};
