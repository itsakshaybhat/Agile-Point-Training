import Ajv from 'ajv'; //joi and yup
import Fastify from 'fastify';

const ajv = new Ajv({
    removeAdditional: 'all', 
    useDefaults: true, 
    coerceTypes: 'array'
})

// {
//   coerceTypes: 'array', // change data type of data to match type keyword
//   useDefaults: true, // replace missing properties and items with the values from corresponding default keyword
//   removeAdditional: true, // remove additional properties if additionalProperties is set to false, see: https://ajv.js.org/guide/modifying-data.html#removing-additional-properties
//   uriResolver: require('fast-uri'),
//   addUsedSchema: false,
//   // Explicitly set allErrors to `false`.
//   // When set to `true`, a DoS attack is possible.
//   allErrors: false
// }

const errorHandler = (err: { statusCode?: number; validation?: unknown; validationContext?: unknown }, _req: unknown, reply: unknown) => {
    const statusCode = err.statusCode;
    let res;

    const { validation, validationContext } = err;

    if(validation){
        res = {
            message: `A validation error occured when validation the ${validationContext}`, errors: validation
        }
    } else {
        res = {
            message: 'An error occurred...'
        }
    }
}

