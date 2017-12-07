var asyncAdd = (a, b) => {

  return new Promise( (resolve,reject) =>{
    setTimeout( () =>{
      if (typeof a === 'number' && typeof b === 'number'){
        resolve(a+b);
      }
      else {
        reject('Arguements must be numbers');
      }
    }, 1500);
  });

};

asyncAdd(5, 3).then( (res) =>{
  console.log("The sum is:",res);
  return asyncAdd(res, 33);
}).then((res)=>{
  console.log('Second promise:',res);
}).catch((errorMessage) => {
  console.log(errorMessage);
});

// var somePromise = new Promise( (resolve, reject) => {
//
//   setTimeout(()=>{
//       //resolve('Hey this works');
//       reject("Oops something went wrong!");
//   },2500);
//
// });
//
// somePromise.then((message) =>{
//   console.log(`Success ${message}`);
// }, (errorMessage) =>{
//   console.log("Error:",errorMessage);
// })
