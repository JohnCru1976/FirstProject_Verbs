// Creation of a class to manage the verbs testing
function Verbs(verbs, numTestP){    
    let testedVerbs = [];
    let totalVerbs = verbs.length;
    let actualVerb;
    let actualPosition;
    this.position = function(){
       return (testedVerbs.length) + "/" + numTestP;
    };
    this.checkComplete = function(){
       return testedVerbs.length >= numTestP;
    };
    this.newVerb = function(){
        actualPosition = Math.floor(Math.random()*totalVerbs); 
        while(testedVerbs.some((elem) => elem == actualPosition) && testedVerbs.length < numTestP){
            actualPosition = Math.floor(Math.random()*totalVerbs);
        }
        if(testedVerbs.length < numTestP){
            actualVerb = verbs[actualPosition];
            testedVerbs.push(actualPosition);
            return actualVerb;
        }
        return undefined;
    };
    this.assesVerb = function(){

    };
    this.getActualVerb = function(){
        return actualVerb;
    };
    this.getActualposition = function(){
        return actualPosition;
    };
}

const verbsArray = [
    {infinitive:"be", past:"was/were", participle:"been"},
    {infinitive:"have", past:"had", participle:"had"},
    {infinitive:"cut", past:"cut", participle:"cut"},
    {infinitive:"know", past:"knew", participle:"known"}
]

let verbManaging;

window.onload = function (){
    document.getElementById("num_verbs").max = verbsArray.length;
    showSection(1);
}

function showSection (n){
    // Shows only the section pass as n parameter
    let section1 = document.getElementById("start_section");
    let section2 = document.getElementById("verbs_section");
    let section3 = document.getElementById("final_result");
    section1.hidden = true;
    section2.hidden = true;
    section3.hidden = true;
    if(n==1){section1.hidden = false;}
    if(n==2){
        section2.hidden = false;
        verbManaging = new Verbs(verbsArray, document.getElementById("num_verbs").value);
        clickNextButton();
    }
    if(n==3){section3.hidden = false;}
}

function clickNextButton(){
    if(verbManaging.checkComplete()){
        showSection(3);
        return;
    }
    verbManaging.newVerb();
    let verbPosition = document.getElementById("verb_number");
    verbPosition.innerHTML = verbManaging.position();
    let verb = verbManaging.getActualVerb();
    let randomTense = Math.floor(Math.random()*3);
    switch(randomTense){
        case 0:
            document.getElementById("infinitive").value = verb["infinitive"];
            break;
        case 1:
            document.getElementById("past").value  = verb["past"];
            break;
        case 2:
            document.getElementById("participle").value  = verb["participle"];
            break;           
    }
}
       








