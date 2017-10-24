var mongoose = require('mongoose');
const { Schema } = mongoose;

const BookingSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  dateRequested: String,
  location: {
    street1: String,
    street2: String,
    street3: String,
    city: String,
    state: String,
    zipcode: String,
    country: String
  },
  confirmed: Boolean,
  paid: Boolean
});

BookingSchema.methods.addressHTML = function() {
  return 'hey!';
};
mongoose.model('Booking', BookingSchema);

module.exports = mongoose.model('Booking');
