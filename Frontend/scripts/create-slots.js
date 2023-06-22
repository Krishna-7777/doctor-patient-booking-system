var currentDate = new Date();
    var formattedDate = currentDate.toISOString().split('T')[0];
    document.getElementById('date').setAttribute('min', formattedDate);

    document.getElementById('date').addEventListener('change', function () {
        var selectedDate = new Date(this.value);
        if (selectedDate.toDateString() === currentDate.toDateString()) {
            var formattedTime = currentDate.toTimeString().slice(0, 5);
            document.getElementById('start').setAttribute('min', formattedTime);
            document.getElementById('end').setAttribute('min', formattedTime);
        } else {
            document.getElementById('start').removeAttribute('min');
            document.getElementById('end').removeAttribute('min');
        }
    });

document.querySelector("form").addEventListener('submit',async(e)=>{
    e.preventDefault()
    let date=document.getElementById("date").value
    let start=document.getElementById("start").value
    let end=document.getElementById("end").value
    let payload={
        date,start,end
    }
    let res=await fetch("https://doctor-patient-booking-system.onrender.com/doctor/slot",{
        method:"POST",
        headers:{
            "Content-Type":"Application/json",
            "Authorization":localStorage.getItem("token")
        },
        body:JSON.stringify(payload)
    })
    res=await res.json()
    alert(res.msg)
    window.location.reload()
})