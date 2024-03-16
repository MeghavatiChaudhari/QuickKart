// A mock function to mimic making an async request for data
export const fetchAllProducts = (amount = 1) => {
  return new Promise(async (resolve) =>{
    //todo:I will not hard code server url here
    const response = await fetch('http://localhost:8080/products')
    const result = await response.json()
    resolve({data})
  }
  );
}
