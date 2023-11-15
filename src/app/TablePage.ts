export class TablePage{
 public totalCount:number
 public id:number
 public rows : Array<any>
 

 constructor(totalCount:number , rows:Array<any>,)
 {
  this.totalCount = totalCount;
  this.rows = rows;
  
 }
}

export class TablePageId{
 public id:number
  
 
  constructor( id:number)
  {
   this.id = id;
  }
 }