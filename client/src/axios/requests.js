import axios from "./axios";

export const userRegister = async (email, password) => {
  try {
    const res = await axios.post("/create-user", {
      email: email,
      password: password,
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const userLogin = async (email, password) => {
  try {
    const res = await axios.post("/login", {
      email: email,
      password: password,
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const userUpdateRegister = async (id, is_completed) => {
  try {
    const res = await axios.put(`/complete-user/${id}`, {
      is_completed: is_completed,
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const userCreateProfile = async (
  id,
  first_name,
  last_name,
  birth_date,
  gender,
  weight,
  height,
  activity
) => {
  try {
    const res = await axios.post(`/create-profile/${id}`, {
      first_name: first_name,
      last_name: last_name,
      birth_date: birth_date,
      gender: gender,
      weight: weight,
      height: height,
      activity: activity,
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const getProducts = async (id) => {
  try {
    const res = await axios.get(`/get-products/${id}`);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const createProduct = async (
  id,
  name,
  category,
  image,
  quantity,
  um,
  calories,
  protein,
  fat,
  carbs
) => {
  try {
    const res = await axios.post(`/create-product/${id}`, {
      name: name,
      category: category,
      image: image,
      quantity: quantity,
      um: um,
      calories: calories,
      protein: protein,
      fat: fat,
      carbs: carbs,
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const deleteProduct = async (product_id) => {
  try {
    const res = await axios.delete(`/delete-product/${product_id}`);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const updateProduct = async (
  product_id,
  name,
  category,
  image,
  quantity,
  um,
  calories,
  protein,
  fat,
  carbs
) => {
  try {
    const res = await axios.put(`/edit-product/${product_id}`, {
      name: name,
      category: category,
      image: image,
      quantity: quantity,
      um: um,
      calories: calories,
      protein: protein,
      fat: fat,
      carbs: carbs,
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};
