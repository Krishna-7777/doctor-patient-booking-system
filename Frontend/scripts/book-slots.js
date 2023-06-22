;(async()=>{
    let res=await fetch("https://doctor-patient-booking-system.onrender.com/user/slots",{
        headers:{
            "Content-Type":"Application/json",
            "Authorization":localStorage.getItem("token")
        }
    })
    res=await res.json()
    if(res.length){
    let table = ``;

for (let i = 0; i < res.length; i++) {
    const row = res[i];
    table += `
      <tr>
        <td>${(row.date.split("T"))[0]}</td>
        <td>${row.start}</td>
        <td>${row.end}</td>
        <td>${row.doctor.name}</td>
        <td>${row.doctor.speciality}</td>
        <td> <button onClick="Book('${row._id}')">Book Now</button></td>
      </tr>
    `;
}
    localStorage.setItem("tdata",table)

document.querySelector("tbody").innerHTML=table
}else{
    document.querySelector("table").innerHTML="<h3>No Slots Found, Please check for slots after some time.</h3>"
}

})()

async function Book(id){
    let book = await fetch(`https://doctor-patient-booking-system.onrender.com/user/bookslot/${id}`,{
        method:"POST",
        headers:{
            "Content-Type":"Application/json",
            "Authorization":localStorage.getItem("token")
        }
    })
    book=await book.json()
    alert(book.msg)
    window.location.reload()
}