export const createJobApplyValidationSchema = {
  positionName: true,
  candidateName: {
    notEmpty: {
      errorMessage: "Full Name is required.",
    },
    isString: {
      errorMessage: "Name must be a valid string.",
    },
    trim: true,
  },
  email: {
    notEmpty: {
      errorMessage: "Email Address is required.",
    },
    isEmail: {
      errorMessage: "Invalid email format.",
    },
    trim: true,
  },
  location: {
    optional: true,
    isString: {
      errorMessage: "Location must be a valid string.",
    },
    trim: true,
  },
  yearsOfExperience: {
    optional: {
      options: { nullable: true }, // Allows empty or null input
    },
    isInt: {
      options: { min: 0, max: 35 }, // Ensures the value is between 0 and 35
      errorMessage: "Years of experience must be a number between 0 and 35.",
      if: (value) => value !== null && value !== "", // Only apply isInt if value is not empty or null
    },
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
    trim: true,
  },
  resume: {
    custom: {
      options: (value, { req }) => {
        // Check if a file was uploaded
        if (!req.file) {
          throw new Error("Resume is required.");
        }
        // Allow PDF, DOC, and DOCX files
        const allowedMimeTypes = [
          'application/pdf',
          'application/msword', // .doc
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // .docx
        ];

        if (!allowedMimeTypes.includes(req.file.mimetype)) {
          throw new Error("Only PDF, DOC, and DOCX files are allowed.");
        }

        // Validate file size (e.g., limit to 5MB)
        const maxFileSize = 5 * 1024 * 1024; // 5MB
        if (req.file.size > maxFileSize) {
          throw new Error("File size must be less than 5MB.");
        }

        return true; // Validation passed
      },
    },
  },
}

export const createContactValidationSchema = {
  clientName: {
    notEmpty: {
      errorMessage: "Full Name is required.",
    },
    isString: {
      errorMessage: "Name must be a valid string.",
    },
    trim: true,
  },
  phone: {
    optional: { options: { nullable: true, checkFalsy: true } }, // Skip validation if null, undefined, or empty
    isMobilePhone: {
      options: ["any"], // Accepts any valid mobile phone format
      errorMessage: "Invalid phone number format.",
    },
    trim: true,
  },
  email: {
    notEmpty: {
      errorMessage: "Email Address is required.",
    },
    isEmail: {
      errorMessage: "Invalid email format.",
    },
    trim: true,
  },
  budget: {
    optional: { options: { nullable: true, checkFalsy: true } }, // Skip validation if null, undefined, or empty
    isNumeric: {
      errorMessage: "Budget must be a valid number.",
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
    trim: true,
  },
};