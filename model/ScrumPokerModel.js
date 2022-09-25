const mongoose = require("mongoose");

const ScrumPokerSchema = mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    roomId: {
      type: String,
      required: true,
      trim: true,
    },
    storyPoint: {
        type: String,
        required: true,
    }
  },
  {
    timestamps: true,
  }
);

// // this function would run for each document before saving it
// UserSchema.pre("save", async function preSave(next) {
//   const user = this;
//   if (!user.isModified("password")) return next();
//   try {
//     const hash = await bcrypt.hash(user.password, SALT_ROUNDS);
//     user.password = hash;
//     return next();
//   } catch (error) {
//     return next(error);
//   }
// });

// // method would be available for each document to compare the provided password
// UserSchema.methods.comparePassword = async function comparePassword(candidate) {
//   return bcrypt.compare(candidate, this.password);
// };

module.exports = mongoose.model("ScrumPoker", ScrumPokerSchema);
