const socket = io("https://doctor-patient-booking-system.onrender.com/");
const videoDiv = document.getElementById("videoDiv");
const myPeer = new Peer();

const video = document.createElement("video");
video.muted = true;

const userConnected = {};

navigator.mediaDevices
  .getUserMedia({
    video: true,
    audio: true,
  })
  .then((stream) => {
    addStream(video, stream);

    myPeer.on("call", (call) => {

      call.answer(stream);

      const video = document.createElement("video");
      call.on("stream", (userStream) => {
        addStream(video, userStream);
      });
    });

    socket.on("user-join", (userID) => {
      connectNewUser(userID, stream);
    });
  })
  .catch((err) => {
    console.log(err);
  });

socket.on("user-disconnected", (userID) => {
  if (userConnected[userID]) {
    userConnected[userID].close();
  }
});

myPeer.on("open", (id) => {
  const RoomID = localStorage.getItem("RoomID");
  socket.emit("join-room", RoomID, id);
});

const connectNewUser = (userID, stream) => {

  const call = myPeer.call(userID, stream);
  const video = document.createElement("video");

  call.on("stream", (userStream) => {
    addStream(video, userStream);
  });

  call.on("close", () => {
    video.remove();
  });

  userConnected[userID] = call;
};

const addStream = (video, stream) => {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
  videoDiv.append(video);
};


function hangup(){
    let type=localStorage.getItem("type")
    if(type=='doctor'){
        window.location="./doctor.html"
    }else if(type=="user"){
        window.location="./user.html"
    }
}