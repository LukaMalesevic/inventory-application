#! /usr/bin/env node

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Steroid = require("./models/steroids");
const Category = require("./models/categories");

const steroids = [];
const categories = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createCategories();
  await createSteroids();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function steroidCreate(index, name, description, category, price, number_in_stock) {
  const steroid = new Steroid({ name: name, description: description, category: category, price: price, number_in_stock: number_in_stock });
  await steroid.save();
  steroids[index] = steroid;
  console.log(`Added steroid: ${name}`);
}

async function categoryCreate(index, name, description){
  const category = new Category({name: name, description: description});
  await category.save();
  categories[index] = category;
  console.log(`Added category: ${name}`);
}

async function createSteroids() {
  console.log("Adding steroids");
  await Promise.all([
    steroidCreate(0, "SARMS", "-5 years of life and massive strength", categories[0], 300, 20),
    steroidCreate(1, "Anadrol", "-2.5 years of life and insane muscle hypertrophy", categories[2], 300, 20),
    steroidCreate(2, "Tren", "-5 years of life and massive strength", categories[1], 300, 20),
  ]);
}

async function createCategories(){
  console.log("Adding categories");
  await Promise.all([
    categoryCreate(0, "Strenght", "Anabolics for improving strength"),
    categoryCreate(1, "Hyperthropy", "Anabolics for improving muscle grow/hypertrophy"),
    categoryCreate(2, "Endurance", "Anabolics for improving endurance for professional athletes")
  ])
}
