const randomNameGenerator = function() {
  let name = [
    "abandoned",
    "able",
    "absolute",
    "adorable",
    "adventurous",
    "academic",
    "acceptable",
    "acclaimed"
  ];
  let nameIndex = Math.floor(Math.random() * name.length);
  let name2 = [
    "people",
    "history",
    "way",
    "art",
    "world",
    "information",
    "map",
    "family",
    "government",
    "health"
  ];
  let name2Index = Math.floor(Math.random() * name2.length);

  return name[nameIndex] + "  " + name2[name2Index];
};

export default randomNameGenerator;
