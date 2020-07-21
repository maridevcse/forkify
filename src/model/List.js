import uniqid from 'uniqid';
export default class List{
    constructor(){
        this.item=[]
    }
    addItem(count,unit,ingredient){
        const items={
        id:uniqid(),
        count,
        unit,
        ingredient
    }

        this.item.push(items);
        return items;
    }

    deleteItem(id){
        const i=this.item.findIndex(el=>el.id===id);
        this.item.splice(i,1);
    }
    updateCount(id,newCount){
        this.item.find(el=>el.id===id).count=newCount;
    }
    
}