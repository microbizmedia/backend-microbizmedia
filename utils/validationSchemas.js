export const createUserValidationSchema = {
  clientName:true,
  email: {
    notEmpty: {
      errorMessage: "Email is required.",
    },
    isEmail: {
      errorMessage: "Invalid email format.",
    },
    trim: true,
  },
  message: {
    isLength: {
      options: {
        min: 3,
        max: 1000,
      },
      errorMessage:
        "Message must be at least 3 characters with a max of 1000 characters.",
    },
  }
}