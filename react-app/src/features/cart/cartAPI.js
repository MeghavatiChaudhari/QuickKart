export const addToCart = (item) => {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8080/cart',{
      method:'Post',
      body:JSON.stringify(item),
      headers:{'content-type':'application/json'}
    })
    const data = await response.json()
    // console.log(data)
    resolve({data})
  }
  );
}

export const updateCart = (update) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`http://localhost:8080/cart/${update.id}`, {
        method: 'PATCH',
        body: JSON.stringify(update),
        headers: { 'content-type': 'application/json' }
      });
      const data = await response.json();
      resolve({ data });
    } catch (error) {
      reject(error); // Reject the promise if an error occurs
    }
  });
};

export const deleteItemFromCart = (itemId) => {
  return new Promise(async (resolve,reject) => {
    try {
      const response = await fetch(`http://localhost:8080/cart/${itemId}`, {
        method: 'DELETE',
        body: JSON.stringify(itemId),
        headers: { 'content-type': 'application/json' }
      });
      const data = await response.json();
      resolve({ data:{id:itemId} });
    } catch (error) {
      reject(error); // Reject the promise if an error occurs
    }
  });
};


export const fetchItemByUserId = (userId) => {
  return new Promise(async (resolve) =>{
    //todo:I will not hard code server url here
    const response = await fetch('http://localhost:8080/cart?user='+userId)
    const data = await response.json()
    resolve({data})
  }
  );
}

