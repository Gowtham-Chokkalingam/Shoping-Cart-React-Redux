// Addto cart
export const ADD = (item) => {
  return {
    type: "ADD_CART",
    payload: item,
  };
};

// Remove cart
export const DELETE = (id) => {
  return {
    type: "REMOVE_CART",
    payload: id,
  };
};

// Remove indivdul item
export const REMOVE = (item) => {
  return {
    type: "REMOVE_ONE_ITEM",
    payload: item,
  };
};