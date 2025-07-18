import LOGIN from "../model/LoginInfo.js";

// console.log("\x1b[32m%s\x1b[0m", "Looping"); //error handling

export const LoginController = {
  async handelLogic(req, res) {
    const { name, value } = req.body;

    try {
      const instant = await LOGIN.create({
        Name: name,
        Value: value,
        OTP: req.OTPGenerate,
        Verified: true,
        ExpiresAt: req.TTLGenerate,
      });
      return res.status(200).send("Created", instant);
    } catch (err) {
      console.error("Error : ", err.message);
      return res.status(500).send("this: ", err);
    }
  },
};
