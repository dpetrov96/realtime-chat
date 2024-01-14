const isNotEmpty = (value: string) => value.trim() !== "";
const isEmail = (value: string) => value.includes("@");
const isString = (value: string) => typeof value === "string";

export function emailIsValid(email: string) {
  return isString(email) && isNotEmpty(email) && isEmail(email);
}

export function nameIsValid(name: string) {
  return isString(name) && isNotEmpty(name);
}

export function userDataIsValid(userData: { username: string; email: string }) {
  if (!userData) {
    return "No user data entered";
  }
  if (!nameIsValid(userData.username)) {
    return "Invalid name entered";
  }
  if (!emailIsValid(userData.email)) {
    return "Invalid email entered";
  }
  return "";
}

export function passwordIsValid(password: string) {
  return isString(password) && isNotEmpty(password) && password.length > 6;
}
