// IMPORTS
const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
dotenv.config();
// CREDENTIALS
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DATABASE = process.env.DB_DATABASE;
const DB_PORT = process.env.DB_PORT;
const PORT = process.env.PORT;
// DB setup
const db = mysql.createPool({
  connectionLimit: 100,
  host: DB_HOST, //This is your localhost IP
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT,
});
//remember to include .env in .gitignore file

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

db.getConnection((err, connection) => {
  if (err) throw err;
  console.log("DB connected successful: " + connection.threadId);
});

// ***** API ****** //

// CREATE USER
app.post("/create-user", async (req, res) => {
  const email = req.body.email;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const is_completed = false;
  db.getConnection(async (err, connection) => {
    if (err) throw err;
    const sqlSearch = "SELECT * FROM users WHERE email = ?";
    const search_query = mysql.format(sqlSearch, [email]);
    const sqlInsert = "INSERT INTO users VALUES (0,?,?,?)";
    const insert_query = mysql.format(sqlInsert, [
      email,
      hashedPassword,
      is_completed,
    ]);
    // ? will be replaced by values
    // ?? will be replaced by string
    await connection.query(search_query, async (err, result) => {
      if (err) throw err;
      console.log("------> Search Results");
      console.log(result.length);
      if (result.length !== 0) {
        connection.release();
        console.log("------> Email already exists");
        // res.sendStatus(409);
        res.send({ error: "This email is not supported!" });
      } else {
        await connection.query(insert_query, async (err, result) => {
          // connection.release();
          if (err) throw err;
          console.log("--------> Created new User");
          console.log(result.insertId);
          // res.sendStatus(201);
          await connection.query(search_query, (err, result) => {
            connection.release();
            if (err) throw err;
            console.log("--------> Created new User");
            // res.sendStatus(201);
            const { user_id, email, is_completed } = result[0];
            res.send({
              user: {
                id: user_id,
                email: email,
                is_completed: is_completed === 0 ? false : true,
              },
            });
          });
        });
      }
    }); //end of connection.query()
  }); //end of db.getConnection()
}); //end of app.post()

// COMPLETE USER
app.put("/complete-user/:user_id", async (req, res) => {
  const user_id = req.params["user_id"];
  const is_completed = req.body.is_completed;
  // const is_completed = false;
  db.getConnection(async (err, connection) => {
    if (err) throw err;
    const sqlInsert = "UPDATE users SET is_completed = ? WHERE user_id = ?";
    const sqlSearch = "SELECT * from users WHERE user_id = ?";
    const insert_query = mysql.format(sqlInsert, [is_completed, user_id]);
    const search_query = mysql.format(sqlSearch, [user_id]);
    // ? will be replaced by values
    // ?? will be replaced by string

    await connection.query(insert_query, async (err, result) => {
      // connection.release();
      if (err) throw err;
      console.log("--------> Updated Profile Status");

      // res.send(result);

      await connection.query(search_query, (err, result) => {
        connection.release();
        if (err) throw err;

        const { user_id, email, is_completed } = result[0];
        res.send({
          user: {
            id: user_id,
            email: email,
            is_completed: is_completed === 0 ? false : true,
          },
        });
      });
    });
  }); //end of db.getConnection()
}); //end of app.put()

// LOGIN (AUTHENTICATE USER)
app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.getConnection(async (err, connection) => {
    if (err) throw err;
    const sqlSearch = "Select * from users where email = ?";
    const search_query = mysql.format(sqlSearch, [email]);
    await connection.query(search_query, async (err, result) => {
      connection.release();

      if (err) throw err;
      if (result.length == 0) {
        console.log("--------> User does not exist");
        res.sendStatus(404);
      } else {
        const hashedPassword = result[0].password;
        //get the hashedPassword from result
        if (await bcrypt.compare(password, hashedPassword)) {
          console.log("---------> Login Successful");
          const { user_id, email, is_completed } = result[0];
          res.send({
            user: {
              id: user_id,
              email: email,
              is_completed: is_completed === 0 ? false : true,
            },
          });
        } else {
          console.log("---------> Password Incorrect");
          res.send("Password incorrect!");
        } //end of bcrypt.compare()
      } //end of User exists i.e. results.length==0
    }); //end of connection.query()
  }); //end of db.connection()
}); //end of app.post()

// CREATE PROFILE INFO
app.post("/create-profile/:user_id", (req, res) => {
  const user_id = req.params["user_id"];
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const birth_date = req.body.birth_date;
  const gender = req.body.gender;
  const weight = req.body.weight;
  const height = req.body.height;
  const activity = req.body.activity;
  db.getConnection(async (err, connection) => {
    if (err) throw err;
    const sqlInsert = "INSERT INTO users_profile VALUES (?,?,?,?,?,?,?,?)";
    const search_query = mysql.format(sqlInsert, [
      user_id,
      first_name,
      last_name,
      birth_date,
      gender,

      weight,
      height,
      activity,
    ]);
    await connection.query(search_query, async (err, result) => {
      connection.release();

      if (err) throw err;

      res.send(`The informations have been posted!`);
    }); //end of connection.query()
  }); //end of db.connection()
}); //end of app.post()

// GET PROFILE INFO
app.get("/get-profile/:user_id", (req, res) => {
  const user_id = req.params["user_id"];
  db.getConnection(async (err, connection) => {
    if (err) throw err;
    const sqlSearch = "SELECT * FROM users_profile WHERE user_id = ?";
    const search_query = mysql.format(sqlSearch, [user_id]);
    await connection.query(search_query, async (err, result) => {
      connection.release();

      if (err) throw err;
      if (result.length !== 0) {
        res.send(result);
      } else {
        res.send("WRONG ID!");
      }
    }); //end of connection.query()
  }); //end of db.connection()
}); //end of app.get()

// EDIT PROFILE INFO
app.put("/edit-profile/:user_id", (req, res) => {
  const user_id = req.params["user_id"];
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const weight = req.body.weight;
  const activity = req.body.activity;

  db.getConnection(async (err, connection) => {
    if (err) throw err;
    const sqlSearch =
      "UPDATE users_profile SET first_name = ?, last_name = ?, weight = ?,  activity = ? WHERE user_id = ?";
    const search_query = mysql.format(sqlSearch, [
      first_name,
      last_name,
      weight,
      activity,
      user_id,
    ]);
    await connection.query(search_query, async (err, result) => {
      connection.release();

      if (err) throw err;

      res.send(result);
    }); //end of connection.query()
  }); //end of db.connection()
}); //end of app.put()

// GET PRODUCTS
app.get("/get-products/:user_id", (req, res) => {
  const user_id = req.params["user_id"];
  db.getConnection(async (err, connection) => {
    if (err) throw err;
    const sqlSearch = "SELECT * FROM products WHERE user_id = ?";
    const search_query = mysql.format(sqlSearch, [user_id]);
    await connection.query(search_query, async (err, result) => {
      connection.release();

      if (err) throw err;
      if (result.length !== 0) {
        console.log(result);
        res.send(result);
      } else {
        res.send("WRONG ID!");
      }
    }); //end of connection.query()
  }); //end of db.connection()
}); //end of app.get()

// CREATE PRODUCT
app.post("/create-product/:user_id", (req, res) => {
  const user_id = req.params["user_id"];
  const name = req.body.name;
  const category = req.body.category;
  const image = req.body.image;
  const quantity = req.body.quantity;
  const um = req.body.um;
  const calories = req.body.calories;
  const protein = req.body.protein;
  const fat = req.body.fat;
  const carbs = req.body.carbs;

  db.getConnection(async (err, connection) => {
    if (err) throw err;
    const sqlInsert = "INSERT INTO products VALUES (0,?,?,?,?,?,?,?,?,?,?)";
    const search_query = mysql.format(sqlInsert, [
      user_id,
      name,
      category,
      image,
      quantity,
      um,
      calories,
      protein,
      fat,
      carbs,
    ]);
    await connection.query(search_query, async (err, result) => {
      connection.release();

      if (err) throw err;

      res.send(`Product ADDED!`);
    }); //end of connection.query()
  }); //end of db.connection()
}); //end of app.post()

// DELETE PRODUCT
app.delete("/delete-product/:product_id", (req, res) => {
  const product_id = req.params["product_id"];

  db.getConnection(async (err, connection) => {
    if (err) throw err;
    const sqlDelete = "DELETE from products WHERE product_id = ?";
    const search_query = mysql.format(sqlDelete, [product_id]);
    await connection.query(search_query, async (err, result) => {
      connection.release();

      if (err) throw err;

      res.send(`Product DELETED!`);
    }); //end of connection.query()
  }); //end of db.connection()
}); //end of app.post()

// EDIT PRODUCT
app.put("/edit-product/:product_id", (req, res) => {
  const product_id = req.params["product_id"];
  const name = req.body.name;
  const category = req.body.category;
  const image = req.body.image;
  const quantity = req.body.quantity;
  const um = req.body.um;
  const calories = req.body.calories;
  const protein = req.body.protein;
  const fat = req.body.fat;
  const carbs = req.body.carbs;
  db.getConnection(async (err, connection) => {
    if (err) throw err;
    const sqlSearch =
      "UPDATE products SET name = ?, category = ?, image = ?, quantity = ?, um = ?, calories = ?, protein = ?, fat = ?, carbs = ? WHERE product_id = ?";
    const search_query = mysql.format(sqlSearch, [
      name,
      category,
      image,
      quantity,
      um,
      calories,
      protein,
      fat,
      carbs,
      product_id,
    ]);
    await connection.query(search_query, async (err, result) => {
      connection.release();

      if (err) throw err;

      res.send(result);
    }); //end of connection.query()
  }); //end of db.connection()
}); //end of app.get()

// CREATE PLAN
app.post("/create-plan/:user_id", (req, res) => {
  const user_id = req.params["user_id"];
  const date_created = req.body.date_created;
  const date_ended = req.body.date_ended;
  const actual_weight = req.body.actual_weight;
  const final_weight = req.body.final_weight;
  const status = req.body.status;
  const total_calories = req.body.total_calories;
  const pdf_plan = req.body.pdf_plan;
  db.getConnection(async (err, connection) => {
    if (err) throw err;
    const sqlInsert = "INSERT INTO plans VALUES (0,?,?,?,?,?,?,?,?)";
    const search_query = mysql.format(sqlInsert, [
      user_id,
      date_created,
      date_ended,
      actual_weight,
      final_weight,
      status,
      total_calories,
      pdf_plan,
    ]);
    await connection.query(search_query, async (err, result) => {
      connection.release();

      if (err) throw err;

      res.send(`Plan Created!`);
    }); //end of connection.query()
  }); //end of db.connection()
}); //end of app.post()

// GET PLANS
app.get("/get-plans/:user_id", (req, res) => {
  const user_id = req.params["user_id"];
  db.getConnection(async (err, connection) => {
    if (err) throw err;
    const sqlSearch = "SELECT * FROM plans WHERE user_id = ?";
    const search_query = mysql.format(sqlSearch, [user_id]);
    await connection.query(search_query, async (err, result) => {
      connection.release();

      if (err) throw err;
      if (result.length !== 0) {
        res.send(result);
      } else {
        res.send("WRONG ID!");
      }
    }); //end of connection.query()
  }); //end of db.connection()
}); //end of app.get()

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});
