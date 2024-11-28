//global variables
let accessKey="b26c5b6584bae83742915c58";

let inputSearch=document.getElementById("inputSearch");
let currencyFromList=document.getElementById("currencyFromList");
let currencyToList=document.getElementById("currencyToList");
let convertBtn=document.getElementById("convertBtn");
let result=document.getElementById("result");
let amountFromList,amountToList,amountInputSearch;


// get elements function
async function getElement(){

  //fetch data from API
  let url = await fetch(`https://v6.exchangerate-api.com/v6/${accessKey}/latest/USD`);
    const res = await url.json();
    const resultConversionRate =res.conversion_rates;


    //loop to display results in select list
    for (const i in resultConversionRate) {
      currencyFromList.innerHTML+=`<option value="${resultConversionRate[i]}" id="${i}">${i}</option>`;
      currencyToList.innerHTML+=`<option value="${resultConversionRate[i]}" id="${i}">${i}</option>`;
    }

    //operation to convert
    convertBtn.onclick=()=>{
      amountFromList=+currencyFromList.value;
      amountToList=+currencyToList.value;
      amountInputSearch=+inputSearch.value;
    
      console.log("amountFromList",amountFromList);
      console.log("amountToList",amountToList);
      console.log("amountInputSearch",amountInputSearch);
    
      //to prevent input=0
      if (amountInputSearch!==0) {
        
        //to prevent choosing the same currency
        if (amountFromList!==amountToList){

          let currencyExchange=(amountInputSearch * amountFromList) * amountToList;
  
          //display the result in the DOM element
          result.value=currencyExchange;
        }else{
          swal({
            title: "Note!!",
            text: "Please enter Two difference currency",
            type: "warning",
            icon:"warning",
            closeOnClickOutside: false,

            buttons: {
              cancel: true,
              btn: {
                text: "Try Again!!",
                className: "btn convertBtn",
              },
            },

        })
      }
  }
  else{
      swal({
        title: "Note!!",
        text: "Please enter The Amount",
        type: "warning",
        icon:"warning",
        closeOnClickOutside: false,

        buttons: {
          cancel: true,
          btn: {
            text: "Try Again!!",
            className: "btn convertBtn",
          },
        },

    })
  }

}
}

getElement();