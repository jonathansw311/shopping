process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("./app");
let items = require("./fakeDb");



beforeEach(function() {
  console.log('before each function')
});

afterEach(function() {
  
  //cleans up fakeDB after test is run
});
// end afterEach


//Get route test for all items
describe("GET /items", function() {
  test("Gets a list of items", async function() {
    const resp = await request(app).get(`/items`);
    expect(resp.statusCode).toBe(201);

    expect(resp.body).toEqual({items});
  });
});
//Get route test for one item
describe("GET /items/:name", function() {
  test("Gets a single item", async function() {
    const expectedData = {
      items: {
        name: "cheerios",
        price: 3.4,
      }}
    const resp = await request(app).get(`/items/cheerios`);
    expect(resp.statusCode).toBe(201);
    expect(resp.body).toEqual(expectedData);
  });

  test("Responds with 404 if can't find any items", async function() {
    const resp = await request(app).get(`/items/asdf`);
    expect(resp.statusCode).toBe(404);
  });
});
//Post route test to add item
describe("POST /items", function() {
  test("Creates a new item", async function() {
    const resp = await request(app)
      .post(`/items`)
      .send({
        name: "Pizza",
        price: 9.99
      });
    expect(resp.statusCode).toBe(201);
    expect(resp.body).toEqual({
      items: { name: "Pizza",
              price: 9.99 }
    });
  });
});

//Patch route test to change name from cheerios to frosted flakes
describe("PATCH /items/:name", function() {
  test("Updates a single item in the shopping list", async function() {
    const resp = await request(app)
      .patch(`/items/cheerios`)
      .send({
        name: "Frosted Flakes"
      });
    expect(resp.statusCode).toBe(201);
    const expectedData = {
     }
    expect(resp.body).toEqual( {items: {
      name: "Frosted Flakes",
      price: 3.4,}
    });
  });

  test("Responds with 404 if id invalid", async function() {
    const resp = await request(app).patch(`/items/asdf`);
    expect(resp.statusCode).toBe(404);
  });
});

//deltes frosted flakes test from fakeDB
describe("DELETE /items/:name", function() {
  test("Deletes a single a item", async function() {
    const resp = await request(app).delete(`/items/Frosted Flakes`);
    expect(resp.statusCode).toBe(201);
    expect(resp.body).toEqual({ message: "Deleted" });
  });
});