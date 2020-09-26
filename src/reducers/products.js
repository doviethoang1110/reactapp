let initialState = [
  {
    id: 1,
    name: "iphone",
    price: 100,
  },
  {
    id: 2,
    name: "android",
    price: 200,
  },
  { id: 3, name: "nokia", price: 300 },
];
const products = (state = initialState, action) => {
  switch (action.type) {
    default:
      return [...state];
  }
};
export default products;
