import { isRejected } from "@reduxjs/toolkit";

// A mock function to mimic making an async request for data
export const fetchAllProducts = (amount = 1) => {
  return new Promise(async (resolve) =>{
    //todo:I will not hard code server url here
    const response = await fetch('http://localhost:8080/products')
    const data = await response.json()
    resolve({data})
  }
  );
}

// export function fetchProductsByFilters(filter){
//   return new Promise(async(resolve)=>{
//     ///filter={"category":"smartphone"}
//     // todo : on server will be supprt multiple ctaegory supprt
//     let queryString='';
//     for(let key in filter){
//       queryString+=`${key}=${filter[key]}&`
//     }
//     // queryString = queryString.slice(0, -1);
//     console.log(queryString);
//     console.log(queryString)
//     // we can use URLSearchParams(filter) method also.
//     try{
//       const response=await fetch('http://localhost:8080/products?'+queryString)
//       const data= await response.json(); 
//       resolve({data})
//     }catch(error){
//           isRejected(error)
//     }
    
//   })
// }

export function fetchProductsByFilters(filter){
  return new Promise(async(resolve,reject)=>{
try{
  
  const queryString = new URLSearchParams(filter).toString();
  console.log(queryString)

  const response = await fetch('http://localhost:8080/products?' + queryString);
      const data = await response.json();
      resolve({ data });
}
    // we can use URLSearchParams(filter) method also.
    catch (error) {
      reject(error);
    }
    
  })
}













  