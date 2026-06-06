import { model, Schema } from 'mongoose';

const sessionSchema = new Schema({
  userId: Schema.Types.ObjectId,
  accessToken: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
  accessTokenValidUntil: {
    type: Date,
    required: true,
  },
  refreshTokenValidUntil: {
    type: Date,
    required: true,
  },
}, { timestamps: true });

const Session = model('Session', sessionSchema);

export default Session;
