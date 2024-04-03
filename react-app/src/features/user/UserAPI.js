// A mock function to mimic making an async request for data
export const fetchLoggedInUserOrders = (userId) => {
  return new Promise(async (resolve) =>{
    const response = await fetch(`http://localhost:8080/orders/?user.id=${userId}`);

    const result = await response.json()
    resolve({result})
  }
  );
}
