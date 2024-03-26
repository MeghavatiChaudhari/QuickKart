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

export const fetchProductsById = (id) => {
  return new Promise(async (resolve) =>{
    //todo:I will not hard code server url here
    const response = await fetch(`http://localhost:8080/products/${id}`);
    const data = await response.json()
    console.log(data)
    resolve({data})
  }
  );
}


export function fetchProductsByFilters(filter,sort,pagination){
 
  // filter={"category":["smartphone","laptops"]}
  // sort={_sort:'price',_order="desc"}
 //pagination = {_page:1,_limit=10}
  // todo : on server we will support multi value
  let queryString='';
  for(let key in filter){
   const categoryValues = filter[key];
   if(categoryValues.length){
    const lastCategoryValue=categoryValues[categoryValues.length-1];
    queryString+=`${key}=${lastCategoryValue}&`
    // console.log(queryString)
   }
  }
  for (let key in sort) {
    if (key === '_sort') {
      // Check if sorting is descending
      if (sort[key].startsWith('-')) {

        console.log(sort[key]+"yehekey")
        // If descending, directly append to the query string
        queryString += `_sort=${sort[key].substring(1)}&`; // Remove the '-' sign
        
      } else {
        // If not descending, append '-' to indicate descending order
        queryString += `_sort=-${sort[key]}&`;
      }
    } else {
      // For other keys, append normally
      queryString += `${key}=${sort[key]}&`;
    }
  }

  let isFirstParam = true;
for (let key in pagination) {
    if (!isFirstParam) {
        queryString += '&';
    }
    queryString += `${key}=${pagination[key]}`;
    isFirstParam = false;
    console.log(queryString);
}

  return new Promise(async(resolve,reject)=>{
try{

  const response = await fetch('http://localhost:8080/products?'+queryString);
      const data = await response.json()
      // const totalItems= await response.headers.get('X-Total-Count')
      const totalItems=100;
      console.log(totalItems)
      resolve({ data:{products:data,totalItems:totalItems} });
}
    // we can use URLSearchParams(filter) method also.
    catch (error) {
      reject(error);
    }
    
  })
}



export const fetchCategories = () => {
  return new Promise(async (resolve) =>{
    //todo:I will not hard code server url here
    const response = await fetch('http://localhost:8080/Category')
    const data = await response.json()
    resolve({data})
  }
  );
}


export const fetchBrands = () => {
  return new Promise(async (resolve) =>{
    //todo:I will not hard code server url here
    const response = await fetch('http://localhost:8080/brands')
    const data = await response.json()
    resolve({data})
  }
  );
}












  