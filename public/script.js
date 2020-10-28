window.addEventListener('load',function(){
    console.log('hello from script.js')

    let sentences = ["❤ You look so great! ❤","❤ What a lovely day! ❤","❤ Super! ❤"];

    
    // step 1 add event listener
    let button = document.getElementById('button-log');
    button.addEventListener('click',()=>{

        // step 2 grab input value
        let HappyInfo = document.getElementById('happy-text').value;
        console.log(HappyInfo);
        let name = document.getElementById('happy-name').value;
        console.log(name);


   // make a fetch request - send to server
        // step 3  creating obj
        let happyObj_send = {  
            "Happiness" : HappyInfo,
            "name" : name
        };
        console.log(happyObj_send);

        // setp 4, create json, stringify obj to json
        let HappyObjJSON = JSON.stringify(happyObj_send);
        console.log(HappyObjJSON)

      
        

        //step 5 fetch - post/send data to server, pass url and pass object
        fetch('/happyData',{
            //this is a post
            method: 'POST',
            // type of data 
            headers:{'Content-Type':'application/json'},
            // put the obj to this body
            body: HappyObjJSON
        })
        //client side response
        .then(res=>res.json())
        .then(data=>{
            console.log("Howay!")
            console.log(data)
            
        })
         // random show sentence
         let randomSentenceIndex = Math.floor(Math.random()*sentences.length);
         let randomSentence = sentences[randomSentenceIndex]
         console.log(randomSentence);
 
         document.getElementById('greet').textContent = randomSentence;
        
        // alert("Wonderful day!!");

    })

    document.getElementById('button-request').addEventListener('click',()=>{
        console.log("pressed button");
        fetch('/getHappiness')
        .then(res=>res.json())
        .then(data=>{
            console.log(data.data);
            document.getElementById('inspirations').innerHTML = '';
            for(let i = 0;i <data.data.length; i++){
                let string = data.data[i].Happy;
                let elt = document.createElement('p')
                elt.innerHTML = string;
                document.getElementById('inspirations').appendChild(elt);

            }



        })



    })
   
})
