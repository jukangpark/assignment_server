const isHeroku = process.env.NODE_ENV === "production";

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Express Service with Swagger!",
      version: "1.0.0",
      description: "A REST API using swagger and express.",
    },
    servers: [
      {
        url: "http://localhhost:9000",
      },
    ],
    apis: ["./router/*.ts"],
  },
  apis: [],
};

export default options;
