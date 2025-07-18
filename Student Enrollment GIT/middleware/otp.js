export default function OTPGeneration(req, res, next) {
  const otp = Math.floor(100000 + Math.random() * 900000);
  const TTL = new Date(Date.now() + 1 * 60 * 1000);
  req.OTPGenerate = otp;
  req.TTLGenerate = TTL;
  next();
}
