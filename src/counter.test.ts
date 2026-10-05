import { test } from "node:test";
import assert from "node:assert/strict";
import { Counter } from "./counter.js";

test("starts at 0 by default", () => {
  assert.equal(new Counter().count, 0);
});

test("increments and decrements by step", () => {
  const c = new Counter({ step: 2 });
  assert.equal(c.increment(), 2);
  assert.equal(c.increment(), 4);
  assert.equal(c.decrement(), 2);
});

test("respects min and max bounds", () => {
  const c = new Counter({ initial: 0, min: 0, max: 2 });
  c.decrement();
  assert.equal(c.count, 0);
  c.increment(); c.increment(); c.increment();
  assert.equal(c.count, 2);
});

test("reset returns to initial value", () => {
  const c = new Counter({ initial: 5 });
  c.increment();
  assert.equal(c.reset(), 5);
});

test("rejects invalid options", () => {
  assert.throws(() => new Counter({ step: 0 }), RangeError);
  assert.throws(() => new Counter({ min: 5, max: 1 }), RangeError);
  assert.throws(() => new Counter({ initial: 10, max: 5 }), RangeError);
});
