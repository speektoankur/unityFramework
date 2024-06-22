const foods: String[] = ['apple', 'pomagernate', 'orange'];

foods.forEach(val => {
    if(val.length%2==0){
        console.log("Food length is even " + val);
    }
    else{
        console.log("Food length is odd " + val);
    }
});