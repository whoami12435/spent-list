function showData(){


let table =
document.getElementById("table");


table.innerHTML="";


let filter =
document.getElementById("filter").value;



let monthIncome = 0;
let monthExpense = 0;


let totalIncome = 0;
let totalExpense = 0;



let now =
new Date()
.toISOString()
.substring(0,7);





data.forEach((x,index)=>{



let amount =
Number(x.amount);



// กันข้อมูลเก่า
if(x.type=="income"){

totalIncome += amount;


if(x.date.startsWith(now)){
monthIncome += amount;
}


}
else if(x.type=="expense"){


totalExpense += amount;


if(x.date.startsWith(now)){
monthExpense += amount;
}


}






if(!filter || x.date==filter){


table.innerHTML+=`

<tr>


<td>${x.date}</td>


<td>${x.title}</td>


<td>${x.category}</td>



<td class="${x.type}">


${x.type=="income"?"+":"-"}

${amount}


</td>



<td>

${x.note || "-"}

</td>




<td>


<button onclick="deleteData(${index})">

ลบ

</button>


</td>



</tr>

`;

}


});





document.getElementById("monthIncome")
.innerHTML =
monthIncome + " บาท";



document.getElementById("monthExpense")
.innerHTML =
monthExpense + " บาท";



document.getElementById("balance")
.innerHTML =
(totalIncome-totalExpense)
+ " บาท";



}  
