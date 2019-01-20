const products = [
    {
      id: 1,
      name: 'foo',
      price: 7
    },
    {
      id: 2,
      name: 'bar',
      price: 2
    },
    {
      id: 5,
      name: 'bazz',
      price: 1
    },
  ];
  
  const users = [
    {
       id: 1,
       name: 'moe'
    },
    {
       id: 2,
       name: 'larry'
    },
    {
       id: 3,
       name: 'curly'
    }
  ];
  
  // productId matches up with product in products
  // userId matches up with user in users
  const orders = [
    {
      id: 1,
      productId: 1,
      quantity: 3,
      userId: 1
    },
    {
      id: 2,
      productId: 1,
      quantity: 7,
      userId: 1
    },
    {
      id: 3,
      productId: 5,
      quantity: 70,
      userId: 3
    },
    {
      id: 4,
      productId: 5,
      quantity: 1,
      userId: 3
    }
  ];



// logs foo and bazz products
const productsPurchased = (orders, products) => {
    return orders
        .map(x => x.productId) //get list of productIds from orders
        .filter(function(curr, index, arr){
            if(arr.indexOf(curr) === index) return curr;     
        })//get unique productIds
        .map(function(curr){
			for(let i = 0; i < products.length; i++){
				if (products[i].id === curr) return products[i];
			}
		})//get products
}

//logs bazz product
const topSellingProductByQuantity = (orders, products) => {
    let productsSold = []; //this array will hold objects with productId and total quantities sold 
    orders
        .map(x => x.productId) //get list of productIds from orders
        .filter(function(curr, index, arr){
            if(arr.indexOf(curr) === index) return curr;     
        })//get unique productIds
        .forEach(function(curr){
			let totalQuantity = 0;
            for(let i = 0; i < orders.length; i++){
                if(curr === orders[i].productId){
                    totalQuantity += orders[i].quantity;
                }
            }
            productsSold.push({'id':curr, 'totalQuantity':totalQuantity});
        })//populate productsSold with productId and total quantities sold


    let bestSelling = productsSold.reduce(function(acc, curr){
		if(acc.totalQuantity < curr.totalQuantity) return curr;
		return acc;
	});//find best selling product, ties goes to first product sold

	//get product from products
	return products.filter(x => x.id === bestSelling.id);

}


//logs info on moe and curly
const usersWithOrders = function(users, orders){
    //similar to productsPurchased
    return orders
        .map(x => x.userId) //get list of userId from orders
        .filter(function(curr, index, arr){
            if(arr.indexOf(curr) === index) return curr;     
        })//get unique userIds
        .map(function(curr){
            for(let i = 0; i < users.length; i++){
                if(users[i].id === curr) return users[i]
            }
        })//get users
}