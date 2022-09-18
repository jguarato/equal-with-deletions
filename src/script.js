console.clear();

const {
  core: { describe, it, expect, run },
  prettify
} = window.jestLite;

function equalWithDeletions(n, m) {
  const backspaceDeletions = function (text) {
    let newText;
    let position = text.indexOf("#");

    if (position === 0) {
      newText = text.slice(1);
    } else if (position > 0) {
      let modifiedText = text.slice(0, position - 1);
      modifiedText += text.slice(position + 1);
      newText = backspaceDeletions(modifiedText);
    } else {
      newText = text;
    }

    return newText;
  };

  const deleteDeletions = function (text) {
    let newText;
    let position = text.lastIndexOf("%");

    if (position === text.length - 1) {
      newText = text.slice(0, text.length - 1);
    } else if (position >= 0) {
      let modifiedText = text.slice(0, position);
      modifiedText += text.slice(position + 2);
      newText = deleteDeletions(modifiedText);
    } else {
      newText = text;
    }

    return newText;
  };

  let nWithDeletions = backspaceDeletions(n);
  nWithDeletions = deleteDeletions(nWithDeletions);

  let mWithDeletions = backspaceDeletions(m);
  mWithDeletions = deleteDeletions(mWithDeletions);

  return nWithDeletions === mWithDeletions;
}

// These are the tests you are trying to make pass, if you choose to use the test suite.

describe("equalWithDeletions", (strOne, strTwo) => {
  it("checks if ", () => {
    expect(equalWithDeletions("pine####apple", "%%%%pineapple")).toBe(true);
    expect(equalWithDeletions("blue%%%%%berry", "blue")).toBe(true);
    expect(equalWithDeletions("w#ate%%%%%%rmelon", "sk##ate%b%o%a%r%d")).toBe(
      true
    );
    expect(equalWithDeletions("you %ff#nn#ailed it", "you failed it")).toBe(
      false
    );
  });
});

prettify.toHTML(run(), document.body);
