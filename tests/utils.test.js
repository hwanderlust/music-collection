const {
  capitalize,
  createEnum,
  getQuotes,
  sendSingleMessage,
  sendGroupMessages,
  toggleAndSetProperty,
} = require("../src/utils");

describe("Util Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createEnum()", () => {
    it("returns a frozen empty object for non-array inputs", () => {
      expect(createEnum()).toEqual({});
      expect(createEnum(null)).toEqual({});
      expect(createEnum(123)).toEqual({});
      expect(createEnum("test test")).toEqual({});
      expect(createEnum({})).toEqual({});
    });
    it("returns a frozen key-val object with the input", () => {
      expect(createEnum(["a", "better", "crazy cows"])).toEqual({
        a: "a",
        better: "better",
        "crazy cows": "crazy cows",
      });
      expect(createEnum([1, 2, 3])).toEqual({ 1: 1, 2: 2, 3: 3 });
    });
  });

  describe("capitalize()", () => {
    it("returns an empty string for non-string inputs", () => {
      expect(capitalize()).toBe("");
      expect(capitalize(null)).toBe("");
      expect(capitalize(123)).toBe("");
      expect(capitalize([])).toBe("");
      expect(capitalize({})).toBe("");
    });
    it("returns the input but with the starting character as capitalized/uppercase", () => {
      expect(capitalize("a")).toBe("A");
      expect(capitalize("better")).toBe("Better");
      expect(capitalize("cancel culture")).toBe("Cancel culture");
    });
  });

  describe("getQuotes()", () => {
    it("returns an array for non-string inputs", () => {
      expect(getQuotes()).toEqual([]);
      expect(getQuotes(null)).toEqual([]);
      expect(getQuotes(123)).toEqual([]);
      expect(getQuotes([])).toEqual([]);
      expect(getQuotes({})).toEqual([]);
    });
    it("returns all text between pairs of quotation marks without the marks", () => {
      expect(getQuotes("Hello, 'Brian'")).toEqual(["Brian"]);
      expect(getQuotes('"I love you"')).toEqual(["I love you"]);
      expect(getQuotes("'24k'" + " by " + '"Bruno Mars"')).toEqual([
        "24k",
        "Bruno Mars",
      ]);
    });
  });

  describe("toggleAndSetProperty()", () => {
    it("returns undefined when missing inputs", () => {
      expect(toggleAndSetProperty()).toBe(undefined);
      expect(toggleAndSetProperty(1)).toBe(undefined);
      expect(toggleAndSetProperty(1, 2)).toBe(undefined);
    });
    it("returns undefined when input types are incorrect", () => {
      expect(toggleAndSetProperty(1, "property", "value")).toBe(undefined);
      expect(toggleAndSetProperty({}, 1, "value")).toBe(undefined);
    });
    it("calls Object.defineProperties twice", () => {
      const spy = jest.spyOn(Object, "defineProperties");
      toggleAndSetProperty({}, "property", 123);
      expect(spy).toBeCalledTimes(2);
    });
    it("sets the new value", () => {
      const dummy = new DummyObj();
      toggleAndSetProperty(dummy, "test", 123);
      expect(dummy.test).toBe(123);
    });
    it("prevents the ability to edit the defined property afterwards", () => {
      const dummy = new DummyObj();
      toggleAndSetProperty(dummy, "test", 123);
      expect(dummy.test).toBe(123);
      dummy.test = [{ a: 1 }];
      expect(dummy.test).toBe(123);
    });
  });

  describe("sendSingleMessage()", () => {
    it("calls console.log", () => {
      const spy = jest.spyOn(console, "log");
      sendSingleMessage();
      expect(spy).toBeCalled();
    });
    it("calls console.log with added empty lines", () => {
      const spy = jest.spyOn(console, "log");
      sendSingleMessage("hello");
      expect(spy).toBeCalledWith(`\nhello\n`);
    });
  });

  describe("sendGroupMessages()", () => {
    it("calls console.log for each msg + 2", () => {
      const spy = jest.spyOn(console, "log");
      const messages = ["hello", "world", "hi", "bye"];
      sendGroupMessages(messages);
      expect(spy).toBeCalledTimes(messages.length + 2);
    });
    it("calls console.log only if input is an array", () => {
      const spy = jest.spyOn(console, "log");
      sendGroupMessages(null);
      expect(spy).toBeCalledTimes(0);
    });
  });
});

function DummyObj() {
  this.test = "test value";
}
