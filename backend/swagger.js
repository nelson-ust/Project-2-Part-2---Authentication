const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Your API",
        version: "1.0.0",
      },
    },
    apis: ["./routes/*.js"], // Check this path to ensure it matches your route location
  };
  
  const swaggerSpec = swaggerJSDoc(options);
  
  module.exports = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  };
  