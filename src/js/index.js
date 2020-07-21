import search from "../model/Search";
import * as searchView from "../view/searchView";
import { renderLoader, clearLoader } from "../model/base";
import { recipeId } from "../js/recipe";
import * as recipeView from "../view/recipeView";
import List from "../model/List";
import  Likes from "../model/Likes";
import * as listView from '../view/listView';
import * as likesView from '../view/likesView';
// var results=new search("pizza");
// results.getResults();

const state = {};

async function ctrlSearch() {
  // 1.GET VALUE FROM UI
  const search_key = document.querySelector(".search__field").value;
  // const search_key="pizza";
  if (search_key) {
    //2.put it in to a function

    state.result = new search(search_key);
    //3.UPDATE IN UI

    renderLoader(searchView.elements.resultList);

    state.final_result = await state.result.getResults();

    // console.log(final_result);

    searchView.clearInputField();

    clearLoader();

    searchView.clearHtml();

    searchView.renderHtml(state.final_result);
  } else {
    alert("please insert a search key");
  }
}

document.querySelector(".search").addEventListener("submit", (e) => {
  e.preventDefault();
  ctrlSearch();
});

searchView.elements.resultsPages.addEventListener("click", (e) => {
  //  const page=e.target.closest(".btn-inline");
  //  console.log(page)
  const page = parseInt(e.target.closest(".btn-inline").dataset.goto);
  searchView.clearHtml();
  searchView.renderHtml(state.final_result, page);
});
const controlRecipe = async () => {
  renderLoader(searchView.elements.recipe);
  const hashKey = window.location.hash.replace("#", "");
  searchView.highlightSelected(hashKey);
  //1.changes in UI
  if (hashKey) {
    //2.put key into the class constructor
    state.recipe = new recipeId(hashKey);

    try{
   
    window.r = state.recipe;

    //3.call the getRecipeId method
    await state.recipe.getRecipeById();
    state.recipe.parseIngredients();
    // console.log(state.recipe);
    //4.call servings and times
    state.recipe.calcIn();
    state.recipe.calservings();
    clearLoader();
    recipeView.clearRecipeContainer();
    recipeView.renderRecipe(state.recipe,state.likes.isLiked(hashKey));
    

    }
    catch(err){
      alert(err);
    }
  }
};

window.addEventListener("click", () => {});
window.addEventListener("hashchange", controlRecipe);

const controlList=()=>{
   
  if(!state.list){
    state.list=new List();
  }

  // Add Each ingredients to the list
  state.recipe.ingredients.forEach(el=>{
       const item=state.list.addItem(el.count,el.unit,el.ingredient)
       listView.renderItem(item);
  }
    );
  




}
//Handle the shopping list

searchView.elements.shopping.addEventListener('click',e=>{
  const id=e.target.closest('.shopping__item').dataset.itemid;

//Handle the  delete button
if(e.target.matches('.shopping__delete, .shopping__delete *')){
  state.list.deleteItem(id);
  //delete from UI
  listView.deleteItem(id);
}
//Handle the count update

else if (e.target.matches('.shopping__count-value')) {
         const val = parseFloat(e.target.value, 10);
        state.list.updateCount(id, val);
      
        
    }




});
// TEsting

const controlLikes=()=>{
    
if(!state.likes) state.likes= new Likes();
const currentID=state.recipe.id;
//user not Likes the current recipe
if(!state.likes.isLiked(currentID)){
  //addLike to the State
  const newLike=state.likes.addLike(
    currentID,
    state.recipe.title,
    state.recipe.publisher,
    state.recipe.image);

  //Toggle the like Btn

   likesView.toggleLike(true);

   likesView.renderLike(newLike);

  

}
// user likes the recipe already
else{

//remove from the data
 state.likes.deleteLike(currentID);

//Toggle the Like Btn
 
likesView.toggleLike(false);

likesView.deleteLike(currentID);
}

//

likesView.toggleLikeMenu(state.likes.getLikeLength());  


}

// Handle delete and update list item events
// searchView.elements.shopping.addEventListener('click', e => {
//   const id = e.target.closest('.shopping__item').dataset.itemid;
//  console.log(id)

//   // Handle the delete button
//   if (e.target.matches('.shopping__delete, .shopping__delete *')) {
//       // Delete from state
//       state.list.deleteItem(id);

//       // Delete from UI
//       listView.deleteItem(id);

//   // Handle the count update
//   } else if (e.target.matches('.shopping__count-value')) {
//       const val = parseFloat(e.target.value, 10);
//       state.list.updateCount(id, val);
//   }
// });

// get data from the LOcalStroage

window.addEventListener('load',()=>{


  state.likes= new Likes();

  state.likes.readStorage();

  likesView.toggleLikeMenu(state.likes.getLikeLength());  

  state.likes.likes.forEach(like=>likesView.renderLike(like));



});

searchView.elements.recipe.addEventListener('click',e=>{

 if(e.target.matches('.btn-decrease,.btn-decrease *')){
  //  alert("dec pressed");
   if(state.recipe.servings>1){
   //btn-decrese is clicked
   state.recipe.updateServings('dec');
   recipeView.renderUpdateServings(state.recipe);
 }
}
 else if(e.target.matches('.btn-increase,.btn-increase *')){

  //  alert("inc pressed");
  //btn-increase is clicked

  state.recipe.updateServings('inc');
  recipeView.renderUpdateServings(state.recipe);
 }
else if(e.target.matches('.shopping-btn,.shopping-btn *')){
  
  // state.recipe.ingredients.forEach(el=>listView.renderItem(el));
  controlList();
}

else if(e.target.matches('.recipe__love ,.recipe__love *')){
  
  controlLikes();
  
 

}
 
}

);


