/**
 * Lead.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    monto: {
        type: 'string',
        required: true
    },
    plazo: {
        type: 'string',
        required: true
    },
    phone: {
        type: 'string',
        required: true
    },
    email: {
        type: 'string',
        required: true
    },
    cuenta: {
        type: 'string',
        required: true
    },
    estatus: {
        type: 'string',
        required: true
    },
    dateBirth: {
        type: 'string',
        required: true
    },
    terms: {
        type: 'string', 
        required: true
    },
    privacy: {
        type: 'string', 
        required: true
    },
    dateRegister: {
        type: 'string',
        required: false
    },
    hourRegister: {
        type: 'string',
        required: false
    }

  },

};

