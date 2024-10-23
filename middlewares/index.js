async function secMiddleware(req,res,next){
     console.log('For security purpose ke liye ');

   next();
}


module.exports ={
    secMiddleware,
}
