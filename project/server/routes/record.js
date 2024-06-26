import express, { response } from "express";

// This will help us connect to the database
import db from "../db/connection.js";

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";


// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path.
const router = express.Router();

router.post("/users", async (req, res) => {
  try {
    
    // Define the user object with the provided data
    const newUser = {
      username: req.body.username,
      password: req.body.password,
      groups: req.body.groups
        // Initialize groups as an empty array
    };
    
    let collection = await db.collection("allUsers");
    // Insert the user object into the "users" collection
    let result = await collection.insertOne(newUser);
    
    // Respond with the inserted user object
    res.status(201).json({ message: "User added successfully", user: newUser });
    console.log("added user");
  } catch (error) {
    console.log("did not add user");
    console.error("Error adding user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/username/:username", async (req, res) => {
  let collection = db.collection("allUsers");
  let query = { username: req.params.username};
  let result = await collection.findOne(query);
  if (!result) {
    res.status(404).send("Not found"); // Send a bad request status if username not found
  } else {
    res.send(result).status(200);
  }
});


router.get("/:username/:group" , async (req , res) => {
  let collection = db.collection("allUsers");
  let query = {username : req.params.username , "groups._id" : req.params.group};
  let result = await collection.findOne(query);
  if (!result) {
    res.status(404).send("Not found"); // Send a bad request status if username not found
  } else {
    res.send(result).status(200);
  }
});

router.get("/user/:username/:password", async (req, res) => {
  let collection = db.collection("allUsers");
  let query = { username: req.params.username , password : req.params.password};
  let result = await collection.findOne(query);
  if (!result) {
    res.status(404).send("Not found"); // Send a bad request status if username not found
  } else {
    res.send(result).status(200);
  }
});


// Route to delete user
router.delete("/delete/:username", async (req, res) => {
    let collection = db.collection("allUsers");
    let query = { username : req.params.username };
    let result = await collection.deleteOne(query);
    if (result.deletedCount === 0){
      res.send(result).status(404);
      console.log("No documents matched the query. Deleted 0 documents.");
    } else {
      res.send(result).status(200);
      console.log("Successfully deleted one document.");
    }
  
});

router.patch("/update/addAccount/:username" , async (req , res) => {
  let updateDb = null;
    try {
    const username = req.params.username;
    let collection = db.collection("allUsers");
    const objAdd = req.body.newAccount;

    const query = {username : username};
    const update = {
      $push: {
        groups : objAdd
      }
    };

    updateDb = await collection.updateOne(query , update);
    console.log(updateDb);
    if (updateDb.modifiedCount === 0){
      throw new Error("Failed to add group");
    }
    updateDb.groupID = req.body.newAccount._id;
    res.status(200).send(updateDb);
  } catch (error) {
    console.error(error);
    res.status(500).send(updateDb);
  }

});

router.patch("/update/balance/:groupID" , async (req , res) => {
  let updateDb = null;

  try {
    const group = req.params.groupID;
    const balance = req.body.balance;

    let collection = db.collection("allUsers");
    
    const query = {
      "groups._id": group // Match documents where groups array contains an object with the specified _id
    };
    
    const update = {
      $set: {
        "groups.$[group].balance": balance // Update the balance field of the matched group(s)
      },
    };
    
    const arrayFilters = [
      { "group._id": group } // Filter to identify the group(s) to update based on the _id
    ];
    
    updateDb = await collection.updateMany(query, update, { arrayFilters });
    
    if (updateDb.modifiedCount === 0) {
      throw new Error("Failed to update group balance");
    }

    // Respond with success
    res.status(200).send(updateDb);
  } catch (error) {
    console.error(error);
    res.status(500).send(updateDb);
  }
});

router.get("/find/user/group/:group", async (req, res) => {
  let collection = db.collection("allUsers");
  let query = {"groups._id" : req.params.group};
  console.log(req.params.group);
  let result = await collection.findOne(query);
  if (!result) {
    res.status(404).send("Not found"); // Send a bad request status if username not found
  } else {
    res.send(result).status(200);
  }
});



router.patch("/reset-password", async (req, res) => {
  const { username, newPassword } = req.body;

  try {

    const updateResult = await db.collection("allUsers").updateOne(
      { username },
      { $set: { password: newPassword } }
    );

    if (updateResult.matchedCount === 0) {
        throw new Error("User not found");
    }

    res.status(200).json({ message: "Password has reset successfully" });
  } catch (error) {

    console.error("Error resetting password:", error);
    res.status(400).json({ message: error.message });

  }
});

router.patch("/add/transaction/:groupID" , async (req , res) => {
  const transaction  = req.body.transaction;
  const groupID = req.params.groupID;

  try {

    const collection = db.collection("allUsers");

    const query = {
      "groups._id" : groupID
    }

    const update = {
      $push : {
        "groups.$.transactions" : {
          $each: [transaction],
          $position : 0
        }
      }
    };

    const updateDb = await collection.updateMany(query , update);

    if (updateDb.modifiedCount === 0){
      throw new Error("Did not add transaction");
    }
    
    res.status(200).send(updateDb);
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to update");
  }


});


export default router;
