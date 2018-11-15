exports.updateProductStatusPayload = {
  type: 'object',
  properties: {
    userId: {
      type: 'string',
      required: true
    },
    companyId: {
      type: 'string',
      required: true
    },
    kiboPush: {
      type: 'boolean',
      required: true
    },
    kiboEngage: {
      type: 'boolean',
      required: true
    },
    kiboCommerce: {
      type: 'boolean',
      required: true
    }
  }
}
