exports.updateProductStatusPayload = {
  type: 'object',
  properties: {
    _id: {
      type: 'string',
      required: true
    },
    kibochat: {
      type: 'boolean',
      required: false
    },
    kiboengage: {
      type: 'boolean',
      required: false
    },
    kibocommerce: {
      type: 'boolean',
      required: false
    }
  }
}
