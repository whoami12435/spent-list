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


showData();