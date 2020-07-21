import axios from "axios";
export default class search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        try {
            // const vall=await axios("https://cors-anywhere.herokuapp.com/https://api.spoonacular.com/recipes/");

            const res = await axios(
                `https://forkify-api.herokuapp.com/api/search?q=${this.query}`
            );
            this.pos = res.data.recipes;
            // console.log(this.pos);

            return this.pos;
        } catch (err) {
            if(err.message.includes('Request failed with status code 400')){
                alert("Sorry Recipe not Found Please Search Another One");
            }
            else{
            alert(err);
            }
            // console.log(err.name);
            // console.log(err.message);
        }
    }
}
