const kpiValueMapper = (data)=>{
    let kraArea=-1;
    let kra=-1;
    let kpi=-1;  
    let element = [];
   
    if(data!= undefined){
    for(let i=0; i<data.length; i++){
        
      if(data[i][1] != "" ){
        kra= kra + 1;
        kpi = 0;
      }
  
        if(data[i][0] != "" ){
        kraArea= kraArea + 1;
        kra= 0;
        kpi = 0;
      
      }
       else if(data[i][1] == "" ){
        kpi = kpi+1;
         
      }
      
      element.push([kraArea,kra,kpi])
    }}
      return element;
   
  }

  export{
    kpiValueMapper
  }