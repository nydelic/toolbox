import truncate from "./truncate";

const lorem = `Lorem ipsum dolor sit amet.
Vitae sapien pellentesque habitant morbi tristique.`;

it("returns expected results with example string", () => {
  // default args truncate
  const truncatedDefault = truncate(lorem, 17);
  expect(truncatedDefault).toBe("Lorem ipsum…");
  expect(truncatedDefault.length).toBe(12);

  // no word boundary truncate
  const truncatedNoWordBoundary = truncate(lorem, 17, false);
  expect(truncatedNoWordBoundary).toBe("Lorem ipsum dolo…");
  expect(truncatedNoWordBoundary.length).toBe(17);

  // word boundary truncate
  const truncatedWordBoundary = truncate(lorem, 17, true);
  expect(truncatedWordBoundary).toBe("Lorem ipsum…");
  expect(truncatedWordBoundary.length).toBe(12);

  // limit larger then original string
  const truncatedLarge = truncate(lorem, 999);
  expect(truncatedLarge).toBe(lorem);
  expect(truncatedLarge.length).toBe(79);
});
