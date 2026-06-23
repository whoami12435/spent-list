let data =
JSON.parse(localStorage.getItem("money"))
|| [];



function addData(){


let item={

title:
title.value,

amount:
Number(amount.value),


type:
type.value,


category:
category.value,


note:
note.value,


date:
new Date()
.toISOString()
.split("T")[0]

};


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



data
.filter(x =>
!filter || x.date==filter
)

.forEach(x=>{


table.innerHTML+=`

<tr>


<td>${x.date}</td>


<td>${x.title}</td>


<td>${x.category}</td>


<td class="${x.type}">

${x.type=="income"?"+":"-"}
${x.amount}

</td>


<td>${x.note}</td>

<td>

<button onclick="deleteData(${data.indexOf(x)})">
ลบ
</button>

</td>


</tr>

`;

});


}
function deleteData(index){


let confirmDelete =
confirm("ต้องการลบรายการนี้ไหม?");


if(confirmDelete){


data.splice(index,1);


localStorage.setItem(
"money",
JSON.stringify(data)
);


showData();


}

}
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


document.getElementById("noteText").value="";


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
