let data =
JSON.parse(localStorage.getItem("money")) || [];


function addData(){

alert("JS ทำงานแล้ว");


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
new Date().toISOString().split("T")[0]

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


data.forEach((x,index)=>{


table.innerHTML += `

<tr>

<td>${x.date}</td>

<td>${x.title}</td>

<td>${x.category}</td>

<td>${x.amount}</td>

<td>${x.note}</td>

<td>
<button onclick="deleteData(${index})">
ลบ
</button>
</td>

</tr>

`;

});


}



function deleteData(index){

data.splice(index,1);


localStorage.setItem(
"money",
JSON.stringify(data)
);


showData();

}





showData();
