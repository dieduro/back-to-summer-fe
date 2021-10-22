export const ERROR_CODES = {
  EMAIL_ALREADY_EXISTS: "auth/email-already-exists",
  EMAIL_ALREADY_IN_USE: "auth/email-already-in-use",
  INSUFFICIENT_PERMISSION: "auth/insufficient-permission",
  INTERNAL_ERROR: "auth/internal-error",
  INVALID_ARGUMENT: "auth/invalid-argument",
  INVALID_EMAIL: "auth/invalid-email",
  INVALID_PASSWORD: "auth/invalid-password",
  WRONG_PASSWORD: "auth/wrong-password",
  USER_NOT_FOUND: "auth/user-not-found",
};

export const handleAuthError = (errorCode) => {
  let message;
  console.log(errorCode)
  switch (errorCode) {
    case ERROR_CODES.USER_NOT_FOUND:
    case ERROR_CODES.INVALID_EMAIL:
    case ERROR_CODES.INVALID_PASSWORD:
    case ERROR_CODES.WRONG_PASSWORD:
      message =
        "No pudimos iniciar sesión.\n Verificá que tus credenciales sean correctas";
      break;
    case ERROR_CODES.EMAIL_ALREADY_EXISTS:
    case ERROR_CODES.EMAIL_ALREADY_IN_USE:
      message =
        "Ese email no está disponible. Probablemente ya exista un usuario asociado a él.";
      break;
    default:
      message = "Hubo un error. Por favor, reintentá";
      break;
  }
  return message;
};
