export function error(message) {
  console.log(message);
  switch (message) {
    case "auth/weak-password":
      return "Password should be at least 6 characters";
    case "auth/user-not-found":
      return "User not found";
    case "auth/email-already-in-use":
      return "User already exists";
    case "auth/wrong-password":
      return "email or password is incorrect";

    default:
      return "something went wrong";
  }
}
