import { CompassDirection, exploreOne, Rover } from "./explorer";

test("exploreOne", () => {
  expect(
    exploreOne(new Rover(1, 2, CompassDirection.N), "LMLMLMLMM", 5, 5)
  ).toBe("1 3 N");
});

test("rover moves one", () => {
  const rover = new Rover(1, 2, CompassDirection.N);
  const fakeXLimit = 5;
  const fakeYLimit = 5;

  expect(rover.x).toBe(1);

  expect(rover.y).toBe(2);

  rover.moveOne(fakeXLimit, fakeYLimit);

  expect(rover.x).toBe(1);

  expect(rover.y).toBe(3);
});
