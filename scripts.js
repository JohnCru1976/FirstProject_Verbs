const verbsObject = [
    {infinitive:"be", past:"was/were", participle:"been"},
    {infinitive:"have", past:"had", participle:"had"},
    {infinitive:"cut", past:"cut", participle:"cut"},
    {infinitive:"know", past:"knew", participle:"known"}
]

window.onload = function (){
    document.getElementById("num_verbs").max = verbsObject.length;
    showSection(1);
}

function showSection (n){
    // Shows only the section pass as n parameter
    let section1 = document.getElementById("start_section");
    let section2 = document.getElementById("verbs_secction");
    let section3 = document.getElementById("final_result");
    section1.hidden = true;
    section2.hidden = true;
    section3.hidden = true;
    if(n==1){section1.hidden = false;}
    if(n==2){
        section2.hidden = false;
        verbTest();
    }
    if(n==3){section3.hidden = false;}
}

const numVerbsRemain = function(num){return num;};

function verbTest(){
    let numVerbsIni;
    let numVerbsRemain;        
    let textLabel = document.getElementById("verb_number");

    if(document.getElementById("num_verbs").value > verbsObject.length){
        numVerbsIni = verbsObject.length;        
    }else{
        numVerbsIni = document.getElementById("num_verbs").value;
    }
    

    // Loop to test all verbs
    // Math.ceil(Math.random()*4); (Numero aleatorio del 1 al 4)
    
    textLabel.innerHTML = numVerbsRemain(4);
        

    
    
}





