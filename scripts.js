// Creation of a class to manage the verbs testing
function Verbs(verbs, numTestP){    
    let testedVerbsId = [];
    let totalVerbs = verbs.length;
    let actualVerb;
    let actualPosition;
    let inputVerbs = [];
    let originalVerbs = [];
    this.restart = function(){
        testedVerbsId = [];
        inputVerbs = [];
        originalVerbs = [];
    };
    this.position = function(){
       return (testedVerbsId.length) + "/" + numTestP;
    };
    this.checkComplete = function(){
       return testedVerbsId.length >= numTestP;
    };
    this.newVerb = function(){
        actualPosition = Math.floor(Math.random()*totalVerbs); 
        while(testedVerbsId.some((elem) => elem == actualPosition) && testedVerbsId.length < numTestP){
            actualPosition = Math.floor(Math.random()*totalVerbs);
        }
        if(testedVerbsId.length < numTestP){
            actualVerb = verbs[actualPosition];
            testedVerbsId.push(actualPosition);
            return actualVerb;
        }
        return undefined;
    };
    this.assessVerb = function(infinitive, past, participle){
        let newInput = {};
        newInput.infinitive = infinitive;
        newInput.past = past;
        newInput.participle = participle;
        inputVerbs.push(newInput);
        originalVerbs.push(actualVerb);
    };
    this.getActualVerb = function(){
        return actualVerb;
    };
    this.getActualposition = function(){
        return actualPosition;
    };
    this.getInputVerbs = function(){
        return inputVerbs;
    };
    this.getOriginalVerbs = function(){
        return originalVerbs;
    };
     this.getTestedVerbsId = function(){
        return testedVerbsId;
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
    if(n==3){
        section3.hidden = false;
        gettingResult();
    }
}

function clickNextButton(){
    document.getElementById("infinitive").disabled = false;
    document.getElementById("past").disabled = false;
    document.getElementById("participle").disabled = false;
    if(verbManaging.getTestedVerbsId().length > 0){
        let inf = document.getElementById("infinitive").value;
        let pas = document.getElementById("past").value;
        let par = document.getElementById("participle").value;
        verbManaging.assessVerb(inf,pas,par);
        document.getElementById("infinitive").value = "";
        document.getElementById("past").value = "";
        document.getElementById("participle").value = "";
    }
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
            document.getElementById("infinitive").disabled = true;
            break;
        case 1:
            document.getElementById("past").value  = verb["past"];
            document.getElementById("past").disabled = true;
            break;
        case 2:
            document.getElementById("participle").value  = verb["participle"];
            document.getElementById("participle").disabled = true;
            break;           
    }
}

function gettingResult(){
    let stringResult;
    let correctVerbsArray = verbManaging.getOriginalVerbs();
    let answeredVerbsArray = verbManaging.getInputVerbs();
    let count = 0;
    stringResult = "<ol>";    
    for(let i = 0; i < correctVerbsArray.length;i++){
        stringResult += "<li>Correct: " + correctVerbsArray[i]["infinitive"] + 
                        " - " + correctVerbsArray[i]["past"] + 
                        " - " + correctVerbsArray[i]["participle"] + "<br>" + 
                        "Answered: " + answeredVerbsArray[i]["infinitive"] + 
                        " - " + answeredVerbsArray[i]["past"] + 
                        " - " + answeredVerbsArray[i]["participle"];
                        
        if (correctVerbsArray[i]["infinitive"] == answeredVerbsArray[i]["infinitive"] &&
        correctVerbsArray[i]["past"] == answeredVerbsArray[i]["past"] &&
        correctVerbsArray[i]["participle"] == answeredVerbsArray[i]["participle"]){
            stringResult += " (+1) </li>";
            count++;
        } else {
            stringResult += " (+0) </li>";
        }
        
    }
    stringResult += "</ol>" + "<br> <h3>" + count + " hits of " + correctVerbsArray.length + "<h3>";

    document.getElementById("results").innerHTML = stringResult;
}

function clickRestart(){
    verbManaging.restart();
    document.getElementById("num_verbs").max = verbsArray.length;
    showSection(1);
}
       








