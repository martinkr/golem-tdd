const { setupServer } = require("msw/node");
const { http, HttpResponse } = require("msw");
const {
  getAggregatedOrders,
} = require("../services/aggregation-service/index");

const request = require("supertest");
const { app } = require("../services/aggregation-service/index");

// Testdaten
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

const products = [
  { id: 1, name: "Keyboard" },
  { id: 2, name: "Mouse" },
  { id: 3, name: "Monitor" },
];

const orders = [
  { id: 100, userId: 1, productId: 1 },
  { id: 101, userId: 2, productId: 2 },
  { id: 102, userId: 2, productId: 3 },
];

// Mock server
const server = setupServer(
  http.get("http://localhost:3001/users", () => {
    return HttpResponse.json(users);
  }),
  http.get("http://localhost:3002/products", () => {
    return HttpResponse.json(products);
  }),
  http.get("http://localhost:3003/orders", () => {
    return HttpResponse.json(orders);
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());

beforeAll(() => server.listen({ onUnhandledRequest: "bypass" }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

const expectation = {
  id: 100,
  user: { id: 1, name: "Alice" },
  product: [{ id: 1, name: "Keyboard" }],
};

// Test
test("getAggregatedOrders(userId) liefert nur die Bestellungen eines spezifischen Users", async () => {
  const result = await getAggregatedOrders(1);
  expect(result).toHaveLength(1);
  expect(result[0]).toEqual(expectation);
});

test("GET /aggregation gibt die Bestellungen eines spezifischen Users zurück", async () => {
  const result = await request(app)
    .get("/aggregation")
    .query({ userId: 1 })
    .expect(200);
  expect(result.body).toHaveLength(1);
  expect(result.body[0]).toEqual(expectation);
});
