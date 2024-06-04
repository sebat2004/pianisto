const pgp = require("pg-promise")(/* options */);
const db = pgp(process.env.DATABASE_URL);

class User {
  constructor() {
    this.id = 1;
    this.email = "";
    this.password = "";
  }

  async getUserById(id) {
    try {
      const response = await db.one("SELECT * from users WHERE id = $1;", [id]);
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async createUser(email, password) {
    try {
      const response = await db.one(
        "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *;",
        [email, password]
      );
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async updateUser(id, email, password) {
    try {
      const response = await db.one(
        "UPDATE users SET email = $2, password = $3 WHERE id = $1 RETURNING *;",
        [id, email, password]
      );
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async deleteUser(id) {
    try {
      const response = await db.one(
        "DELETE FROM users WHERE id = $1 RETURNING id;",
        id
      );
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

module.exports = User;
