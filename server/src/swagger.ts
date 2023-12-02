import swaggerJsdoc, { Options, SwaggerDefinition } from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Ajo Savings Api',
      version: '1.0.0',
      description: 'Describes all the available  APIs on the Ajo-savings app',
    },
  },
  apis: ['src/routes/*.ts'], // Path to your route files
}

const specs = swaggerJsdoc(options)

export default specs
