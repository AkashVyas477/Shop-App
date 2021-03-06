// export const DELETE_PRODUCT='DELETE_PRODUCT';
// export const CREATE_PRODUCT='CREATE_PRODUCT';
// export const UPDATE_PRODUCT='UPDATE_PRODUCT';

// export const deleteProduct =productId => {
//     return { type:DELETE_PRODUCT,pid:productId};

// };

// export const createProduct = (title, description,imageUrl,price) => {
//     return async dispatch => {
//         const response = await fetch('https://shoping-app-aaad1-default-rtdb.firebaseio.com/Products.json',{
//             metthod:'POST',
//             headers:{
//                 'Content-Type':'application/json'
//             },
//             body : JSON.stringify({title, description,imageUrl,price})
//         });

//         const resData = await response.json();
//          console.log ( resData);

//         dispatch( {type : CREATE_PRODUCT,
//             productData:{
//                 title,
//                 description,
//                 imageUrl,
//                 price
//         }
//     });
//     }
   
// }
// export const updateProduct =( id,title, description,imageUrl,price) => {
//     return {
//         type : UPDATE_PRODUCT,
//         pid:id,
//         productData:
//         {
//             title,
//             description,
//             imageUrl,
//             price
//     }};
// }

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

export const deleteProduct = productId => {
  return { type: DELETE_PRODUCT, pid: productId };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async dispatch => {
    // any async code you want!
    const response = await fetch('https://shoping-app-aaad1-default-rtdb.firebaseio.com/Products.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl,
        price
      })
    });

    const resData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        description,
        imageUrl,
        price
      }
    });
  };
};

export const updateProduct = (id, title, description, imageUrl) => {
  return {
    type: UPDATE_PRODUCT,
    pid: id,
    productData: {
      title,
      description,
      imageUrl
    }
  };
};