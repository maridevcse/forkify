import axios from 'axios';
export class recipeId{
  constructor(id){
      this.id=id;
  }

 async getRecipeById(){
    try{
    const res =await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
    let inside=res.data.recipe;
    this.publisher=inside.publisher;
    this.title=inside.title;
    this.ingredients=inside.ingredients;
    this.source=inside.source_url;
    this.image=inside.image_url;
    this.ingredientsLength=this.ingredients.length;
    
    // console.log(res.data.recipe.ingredients.length);
    }
    catch(error){
        alert("something went wrong :-(");
    }
 }
  calcIn(){
      const ingredients=this.ingredients.length;
      const timetocook=Math.ceil(ingredients/3);
      this.time=timetocook*15;  

  }
 calservings(){
     this.servings=4;
 }
 parseIngredients(){
    //1.Changing the words
    const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
    const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
    const units = [...unitsShort, 'kg', 'g'];
    const newIngredients=this.ingredients.map(el=>{
      var ingredient=el.toLowerCase();
      unitsLong.forEach((el,i)=>{
            ingredient=ingredient.replace(el,unitsShort[i]);
      });

        ingredient=ingredient.replace(/\s*\(.*?\)\s*/g, ' ');
        // console.log(ingredient);
        const arrIng=ingredient.split(" ");
        const unitIndex=arrIng.findIndex(el2=>units.includes(el2));
        let objUnit;
        if(unitIndex>-1){
            //There is an Item with unit
            const arrCount=arrIng.slice(0,unitIndex); 
            let count;
            if(arrCount===1){
                count=eval(arrCount[0].replace('-','+'));
            }
            else{
                count=eval(arrIng.slice(0,unitIndex).join('+'));
            }
            objUnit={
                count,
                unit:arrIng[unitIndex],
                ingredient:arrIng.slice(unitIndex+1).join(' ')  
            }
        }
        else if(parseInt(arrIng[0],10)){
            //there is a number not a unit
           objUnit={
               count:parseInt(arrIng[0],10),
               unit:'',
               ingredient:arrIng.slice(1).join(" ")
           }
        }
        else if(unitIndex===-1){
            //there is no unit
            objUnit={
                count:'1',
                unit:'',
                ingredient
            }
        }
      

        return objUnit;   
    }); 
      this.ingredients=newIngredients;
 }

 updateServings(type){

     const newServings=type === 'inc'? this.servings+1 : this.servings-1;
     
     this.ingredients.forEach(inc=>{
         inc.count*=(newServings/this.servings);
     });

     this.servings=newServings;

 }

}