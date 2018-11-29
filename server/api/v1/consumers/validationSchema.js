exports.updateProductStatusPayload = {
  type: 'object',
  properties: {
    _id: {
      type: 'string',
      required: true
    },
    kiboChat: {
      type: 'boolean',
      required: false
    },
    kiboEngage: {
      type: 'boolean',
      required: false
    },
    kiboCommerce: {
      type: 'boolean',
      required: false
    }
  }
}
