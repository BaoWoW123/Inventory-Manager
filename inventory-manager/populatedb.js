#! /usr/bin/env node
  
  // Get arguments passed on command line
  const userArgs = process.argv.slice(2);
  
  const Car = require("./models/car");
  const Make = require("./models/make");
  
  const makes = [];
  const cars = [];
  
  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false); // Prepare for Mongoose 7
  
  const mongoDB = userArgs[0];
  
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createCars();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }
  
  // We pass the index to the ...Create functions so that, for example,
  // genre[0] will always be the Fantasy genre, regardless of the order
  // in which the elements of promise.all's argument complete.
  async function genreCreate(index, name) {
    const genre = new Genre({ name: name });
    await genre.save();
    console.log(`Added genre: ${name}`);
  }
  
  async function makeCreate(index, name, year_founded) {
    const makedetail = { name:name, year_founded:year_founded};
    if (name != false) makedetail.name = name;
    if (year_founded != false) makedetail.year_founded = year_founded;
  
    const make = new Make(makedetail);
  
    await make.save();
    makes[index] = make;
    console.log(`Added make: ${name} ${year_founded}`);
  }
  
  async function carCreate(index, make, model, bodyType, price, year, description, stock) {
    const cardetail = {
      make: make,
      model: model,
      bodyType: bodyType,
      price: price,
      year: year,
      description: description,
      stock: stock,
    };

    const car = new Car(cardetail);
    await car.save();
    cars[index] = car;
    console.log(`Added car: ${make, model}`);
  }
  
  async function createMakes() {
    console.log("Adding makes");
    await Promise.all([
      makeCreate(0,'Honda', 1948),
      makeCreate(1,'Toyota', 1937),
    ]);
  }
  
  async function createCars() {
    console.log("Adding cars");
    await Promise.all([
      carCreate(0,
        "Honda",
        "Civic",
        "Sedan",
        18000,
        2018,
        'Description for Honda Civic',
        'Available',
      ),
      carCreate(1,
        "Honda",
        "Civic",
        "Sedan",
        18000,
        2018,
        'Description for Honda Civic',
        'Unavailable',
      ),
    ]);
  }