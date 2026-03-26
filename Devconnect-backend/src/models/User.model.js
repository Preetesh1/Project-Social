const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, select: false },
  username: { type: String, unique: true, sparse: true },
  avatar: { type: String, default: null },
  banner: { type: String, default: null },
  bio: { type: String, default: '', maxlength: 300 },
  headline: { type: String, default: '' },
  location: { type: String, default: '' },
  website: { type: String, default: '' },
  github: { type: String, default: '' },
  skills: [{ type: String }],
  experience: [{
    title: String,
    company: String,
    startDate: Date,
    endDate: Date,
    current: { type: Boolean, default: false },
    description: String,
  }],
  education: [{
    school: String,
    degree: String,
    field: String,
    startYear: Number,
    endYear: Number,
  }],
  connections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  connectionRequests: [{
    from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
    createdAt: { type: Date, default: Date.now },
  }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  isVerified: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  lastSeen: { type: Date, default: Date.now },
  profileViews: { type: Number, default: 0 },
  notifications: [{
    type: { type: String, enum: ['like', 'comment', 'connection', 'message', 'mention'] },
    from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    message: String,
    read: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  }],
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password') || !this.password) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = function(plain) {
  return bcrypt.compare(plain, this.password);
};

userSchema.methods.toSafeObject = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model('User', userSchema);
