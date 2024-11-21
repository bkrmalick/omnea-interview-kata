export enum CompassDirection {
  N = "N",
  E = "E",
  S = "S",
  W = "W",
}

export enum RotationDirection {
  R = "R",
  L = "L",
}

export class Rover {
  x: number;
  y: number;
  dir: CompassDirection;

  constructor(x: number, y: number, dir: CompassDirection) {
    this.x = x;
    this.y = y;
    this.dir = dir;
  }

  moveOne(xLimit: number, yLimit: number) {
    console.log("moveOne ", this.dir);
    let newX = this.x;
    let newY = this.y;

    if (this.dir === CompassDirection.N) {
      newY += 1;
    } else if (this.dir === CompassDirection.E) {
      newX += 1;
    } else if (this.dir === CompassDirection.S) {
      newY -= 1;
    } else if (this.dir === CompassDirection.W) {
      newX -= 1;
    } else {
      throw new Error("invalid direction"); // unreachable
    }

    if (newX > xLimit || newX < 0 || newY > yLimit || newY < 0) {
      throw new Error(
        `instructions resulting in invalid coords (${this.x},${this.y})`
      );
    }

    this.x = newX;
    this.y = newY;
  }

  turnTo(rotDir: RotationDirection) {
    console.log("turnTo", rotDir);
    // ["N", "E", "S", "W"]

    // R or L

    const possibleCompassDirections = Object.keys(CompassDirection);
    let currIndex = possibleCompassDirections.indexOf(this.dir);

    if (rotDir === RotationDirection.L) {
      currIndex -= 1;
      if (currIndex < 0) {
        currIndex = possibleCompassDirections.length - 1;
      }
    } else if (rotDir === RotationDirection.R) {
      currIndex += 1;
      if (currIndex > possibleCompassDirections.length) {
        currIndex = 0;
      }
    } else {
      throw new Error("invalid turn direction");
    }

    const retVal = Object.values(CompassDirection).at(currIndex);

    if (retVal === undefined) {
      throw new Error("new direction invalid");
    }

    this.dir = retVal;
  }

  positionString(): string {
    return `${this.x} ${this.y} ${this.dir}`;
  }
}

const toRotationDirection = (inp: string): RotationDirection => {
  if (inp === "R") {
    return RotationDirection.R;
  } else if (inp === "L") {
    return RotationDirection.L;
  }
  throw new Error(`invalid turn direction string ${inp}`);
};

export const exploreOne = (
  r: Rover,
  ins: string,
  xLimit: number,
  yLimit: number
): string => {
  for (let char of ins.split("")) {
    if (char === "M") {
      r.moveOne(xLimit, yLimit);
    } else {
      r.turnTo(toRotationDirection(char));
    }
  }

  return r.positionString();
};
