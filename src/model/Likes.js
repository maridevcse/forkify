export default class Likes{
    constructor(){
     this.likes=[]
    }

    addLike(id,title,author,img){
        const like={id,title,author,img}
        this.likes.push(like);
        this.persistData();
        return like;
    }
    deleteLike(id){
        const i=this.likes.findIndex(el=>el.id===id);
      
        this.likes.splice(i,1);
        this.persistData();
    }
    getLikeLength(){

        return this.likes.length;
    }
    isLiked(id){
        return this.likes.findIndex(el=>el.id===id)!==-1;
    }
    persistData(){
        localStorage.setItem('likes',JSON.stringify(this.likes))
    }
    readStorage(){
     const storage=JSON.parse(localStorage.getItem('likes'));
    //  Restoring Likes from the localStorage
     if(storage) this.likes=storage;
    }
}
