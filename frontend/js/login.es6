let login = (username, password) => {
  if (username !== "admin" || password !== "password") {
    console.log("bad login info");
  }
}

// login("admin", "passssword");

export { login };
