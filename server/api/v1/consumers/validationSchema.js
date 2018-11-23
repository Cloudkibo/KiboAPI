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
