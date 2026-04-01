import Counter from '../models/Counter.js';

function generateSecret(length = 3) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let secret = '';

  for (let i = 0; i < length; i += 1) {
    secret += chars[Math.floor(Math.random() * chars.length)];
  }

  return secret;
}

async function generateCustomId(modelName, prefix) {
  const counter = await Counter.findByIdAndUpdate(
    modelName,
    { $inc: { seq: 1 } },
    { returnDocument: 'after', upsert: true }
  );

  const paddedSeq = String(counter.seq).padStart(4, '0');
  const secret = generateSecret();

  return `${prefix}-${secret}-${paddedSeq}`;
}

export default generateCustomId;