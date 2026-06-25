let data=[];


// โหลดข้อมูลจาก Firebase

async function loadData(){

const querySnapshot =
await getDocs(collection(db,"money"));


data=[];


querySnapshot.forEach((doc)=>{

data.push({
id:doc.id,
...doc.data()
});

});


showData();

}



async function addData(){


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



await addDoc(
collection(db,"money"),
item
);



document.getElementById("title").value="";
document.getElementById("amount").value="";
document.getElementById("category").value="";
document.getElementById("note").value="";


loadData();


}





function showData(){


let table =
document.getElementById("table");


table.innerHTML="";



let totalIncome=0;
let totalExpense=0;



data.forEach((x,index)=>{


let amount =
Number(x.amount);



if(x.type=="income")
totalIncome+=amount;

else
totalExpense+=amount;



table.innerHTML+=`


<tr>

<td>${x.date}</td>

<td>${x.title}</td>

<td>${x.category}</td>

<td>

${x.type=="income"?"+":"-"}
${amount.toFixed(2)}

</td>

<td>${x.note}</td>


<td>

<button onclick="deleteData('${x.id}')">

ลบ

</button>


</td>


</tr>


`;

});



document.getElementById("balance")
.innerHTML =
(totalIncome-totalExpense)
.toFixed(2)+" บาท";


}





async function deleteData(id){


if(confirm("ลบรายการนี้ไหม?")){


await deleteDoc(
doc(db,"money",id)
);



loadData();


}

}





loadData();
