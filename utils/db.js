import mongoose from "mongoose";

const connection = {};

//*================= Connect To DB ========================
async function connect() {
  //*================CHECK CONDITIONS======================
  if (connection.isConnected) {
    console.log("already connected");
    return;
  }
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log("use previous connection");
      return;
    }
    await mongoose.disconnect();
  }
  //*=================NORMAL PROCESS=======================
  const db = await mongoose.connect(process.env.MONGODB_URI);
  console.log("new connection");
  connection.isConnected = db.connections[0].readyState;
}

//*============= Disconnect From DB ==============
async function disconnect() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === "production") {
      // await mongoose.disconnect();
      // connection.isConnected = false;
    } else {
      console.log("not disconnected");
    }
  }
}

function convertDocToObj(doc) {
  doc._id = doc._id.toString();

  if (doc.createdAt) {
    doc.createdAt = doc.createdAt && doc.createdAt.toString();
  }
  if (doc.updatedAt) {
    doc.updatedAt = doc.updatedAt && doc.updatedAt.toString();
  }

  if (doc.user) {
    doc.user = doc.user.toString();
  }
  if (doc.orderItems) {
    doc.orderItems = doc.orderItems.map((item) => {
      item._id = item._id.toString();
      return item;
    });
  }
  return doc;
}

const db = { connect, disconnect, convertDocToObj };
export default db;
