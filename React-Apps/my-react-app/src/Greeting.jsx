import react from 'react';

let greeting;

const customStyle = {
  color:'',
  border:''
}
const date = new Date();
const time = new Date().getHours();

if(time < 12){
  greeting = "Good Morning";
  customStyle.color = "blue";
  customStyle.border = "1px solid blue";
}else if(time < 20){
  greeting = "Good Afternoon";
  customStyle.color = "green";
  customStyle.border = "2px solid green";
}else{
  greeting = "Good Evening";
  customStyle.color = "red";
  customStyle.border = "3px solid red";
}


function Greeting(){
    return (
        <div>
            <h1 style={customStyle}>{greeting}</h1>
            <p>This is a simple React component.</p>
        </div>
    );
};

export default Greeting;

