import mongoose from 'mongoose';

const MenuSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Please a menu name'],
  },

  description: {
    type: String,
    required: [true, 'Please add a description of the menu'],
  },

  price: {
    type: Number,
    required: [true, 'Please add the cost of the menu'],
  },

  photo: {
    type: String,
    default: 'no-photo.jpg',
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },

  restaurant: {
    type: mongoose.Schema.ObjectId,
    ref: 'Restaurant',
    required: true,
  },
});

// Export the model
module.exports = mongoose.model('Menu', MenuSchema);
