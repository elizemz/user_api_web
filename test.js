const obj = {
  name: "John",
  age: 100,
  address: {
    apartment: 123,
  },
};

const b = JSON.parse(JSON.stringify(obj));
const c = structuredClone(obj);

c.name = "Bataa";
c.address.apartment = 90;
//shallow Clone
//deepClone
console.log(obj);
// console.log(b);
console.log(c);
