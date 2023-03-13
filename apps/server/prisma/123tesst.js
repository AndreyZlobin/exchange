const mongoose = require('mongoose');

const ordersSchema = mongoose.Schema({
  id: {
    type: Number,
  },
  custom_id: {
    type: Number,
  },
  provider: {
    type: String,
    required: true,
  },
  status: {
    type: String,
  },
  fiat_amount: {
    type: Number,
  },
  payment_system: {
    type: String,
  },
  crypto_type: {
    type: String,
  },
  rate_provider: {
    type: Number,
  },
  crypto_amount_provider: {
    type: Number,
  },
  rate_deal: {
    type: Number,
  },
  crypto_amount_deal: {
    type: Number,
  },
  crypto_amount_broker: {
    type: Number,
  },
  profit: {
    type: Number,
  },
  deal_id: {
    type: Number,
  },
  callback_urls: {
    type: Object,
    default: {}
  },
  requisites: {
    type: String,
  },
  broker: {
    type: String,
  },
  client_name: {
    type: String,
  },
  created: {
    type: Number,
  },
  updated: {
    type: Number,
  },
  timeout: {
    type: Number,
  },
  status_history: {
    type: Object,
    default: []
  },
  notes: {
    type: Object,
    default: {
      paid: false,
      problem: false,
    }
  },
  finish_wallet: {
    type: String,
  },
  finish_tx_after: {
    type: Number,
  },
  finished_by: {
    type: String,
  },
  finish_error: {
    type: String,
  },
  cancel_reason: {
    type: String,
  },
  max_claims_attempts: {
    type: Boolean,
  },
  handler: {
    type: String,
    default: 'risex',
  }
});

ordersSchema.pre('save', async function (next) {
  const order = this;

  if (this.isNew) {
    let amount = await Orders.countDocuments({});

    order.created = Date.now();
    order.id = amount + 1;
  }
  order.updated = Date.now();
  if (order.isModified('status')) {
    order.status_history = [...order.status_history, { status: order.status, time: Date.now() }];
  }
  next();
});

const Orders = mongoose.model('Orders', ordersSchema);

module.exports = Orders;
