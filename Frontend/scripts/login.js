document.querySelector("form").addEventListener('submit',async(e)=>{
    e.preventDefault()
    let email=document.getElementById("email").value
    let password=document.getElementById("password").value
    let res=await fetch("https://doctor-patient-booking-system.onrender.com/user/login",{
        method:"POST",
        headers:{
            "Content-Type":"Application/json"
        },
        body:JSON.stringify({
            email,password
        })
    })
    res=await res.json()
    alert(res.msg)
    if(res.type!=undefined){
    localStorage.setItem("token",res.token)
    localStorage.setItem("type",res.type)
    localStorage.setItem("name",res.name)
    window.location=`../pages/${res.type}.html`
    }
})