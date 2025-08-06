module.exports = {
  apps: [
    {
      name: "bluematrix",
      script: "npm",
      args: "run dev",
      env: {
        NODE_ENV: "development",
      },
    },
  ],
};