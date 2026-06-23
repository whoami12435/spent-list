let data =
JSON.parse(localStorage.getItem("money")) || [];



function addData(){


let item = {

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



document.getElementById("title").value="";
document.getElementById("amount").value="";
document.getElementById("category").value="";
document.getElementById("note").value="";



showData();

}







function showData(){


let table =
document.getElementById("table");


table.innerHTML="";


let filter =
document.getElementById("filter").value;



let monthIncome=0;
let monthExpense=0;

let totalIncome=0;
let totalExpense=0;



let now =
new Date()
.toISOString()
.substring(0,7);




data.forEach((x,index)=>{


let amount =
Number(x.amount);



if(x.type=="income"){

totalIncome += amount;


if(x.date.startsWith(now)){
monthIncome += amount;
}

}


else{


totalExpense += amount;


if(x.date.startsWith(now)){
monthExpense += amount;
}

}




if(!filter || x.date==filter){



table.innerHTML += `


<tr>


<td>${x.date}</td>


<td>${x.title}</td>


<td>${x.category}</td>


<td class="${x.type}">

${x.type=="income"?"+":"-"}
${amount}

</td>


<td>${x.note || "-"}</td>


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
monthIncome.toFixed(2)+" บาท";



document.getElementById("monthExpense")
.innerHTML =
monthExpense.toFixed(2)+" บาท";



document.getElementById("balance")
.innerHTML =
(totalIncome-totalExpense).toFixed(2)+" บาท";

}





function deleteData(index){


if(confirm("ลบรายการนี้ไหม?")){


data.splice(index,1);



localStorage.setItem(
"money",
JSON.stringify(data)
);



showData();


}

}








// NOTES


let notes =
JSON.parse(localStorage.getItem("notes")) || [];





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



document.getElementById("noteText").value="";



showNotes();

}







function showNotes(){


let box =
document.getElementById("notes");



if(!box)return;



box.innerHTML="";



notes.forEach((n,i)=>{


box.innerHTML += `


<div class="item">


${n.text}

<br>

<small>${n.date}</small>


<button onclick="deleteNote(${i})">

ลบ

</button>


</div>


`;

});


}




function deleteNote(i){


notes.splice(i,1);



localStorage.setItem(
"notes",
JSON.stringify(notes)
);



showNotes();


}





showNotes();

showData();
