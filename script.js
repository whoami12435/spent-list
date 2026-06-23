let data =
JSON.parse(localStorage.getItem("money"))
|| [];



function addData(){


let item={


title:
document.getElementById("title").value,


amount:
Number(document.getElementById("amount").value),


type:
document.getElementById("type").value,


category:
document.getElementById("category").value,


note:
document.getElementById("note").value,


date:
new Date()
.toISOString()
.split("T")[0]


};



if(!item.title || !item.amount){

alert("กรอกข้อมูลก่อน");

return;

}



data.push(item);



localStorage.setItem(
"money",
JSON.stringify(data)
);



showData();



}





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



// คิดยอดทั้งหมด

if(x.type=="income"){

totalIncome += x.amount;


if(x.date.startsWith(now)){

monthIncome += x.amount;

}


}

else{


totalExpense += x.amount;



if(x.date.startsWith(now)){

monthExpense += x.amount;

}


}





// ตาราง

if(!filter || x.date==filter){


table.innerHTML+=`

<tr>


<td>${x.date}</td>


<td>${x.title}</td>


<td>${x.category}</td>



<td class="${x.type}">


${x.type=="income"?"+":"-"}

${x.amount}


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





// Dashboard


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







function deleteData(index){


if(confirm("ต้องการลบรายการนี้ไหม?")){


data.splice(index,1);



localStorage.setItem(
"money",
JSON.stringify(data)
);



showData();


}


}









// =================
// NOTES
// =================


let notes =
JSON.parse(localStorage.getItem("notes"))
|| [];





function saveNote(){



let text =
document.getElementById("noteText").value;



if(!text)return;



notes.push({


text:text,


date:
new Date()
.toLocaleDateString()


});




localStorage.setItem(
"notes",
JSON.stringify(notes)
);




document.getElementById("noteText")
.value="";



showNotes();



}







function deleteNote(i){


notes.splice(i,1);



localStorage.setItem(
"notes",
JSON.stringify(notes)
);



showNotes();


}








function showNotes(){



let box =
document.getElementById("notes");



box.innerHTML="";



notes.forEach((n,i)=>{



box.innerHTML+=`


<div class="item">


<div>


${n.text}


<br>


<small>${n.date}</small>


</div>



<button onclick="deleteNote(${i})">

ลบ

</button>



</div>



`;



});



}





showNotes();

showData();
