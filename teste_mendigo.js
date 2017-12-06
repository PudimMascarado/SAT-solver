fs = require('fs')
var fileName = "hole1.cnf"
// como ele manda ler o nome de um arquivo, mudei a sintaxe pra ele ler o nome só

function readClauses(text){
   arrayC = []
   // arrayC é o array de arrays, clauses é um array que é modificado
   clauses = []
   var act = ""
   for(var i = 0; i < problema.length; i++){
       if(problema[i][0] != 'c' && problema[i][0] != 'p' && problema[i] !== null){
           if(problema[i].endsWith(0)){
             for(var e = 0; e < (problema[i].length)-1; e++){
               if(problema[i][e] !== " "){
                 if(problema[i][e] == "-"){
                   act += problema[i][e]
                 }
                 else{
                   act += problema[i][e]
                   clauses.push(act)
                   act = ""
                 }
               }
             }
             arrayC.push(clauses)
             var clauses = []
           }
           else{
             for(var e = 0; e < (problema[i].length); e++){
               if(problema[i][e] !== " "){
                 if(problema[i][e] == "-"){
                   act += problema[i][e]
                 }
                 else{
                   act += problema[i][e]
                   clauses.push(act)
                   act = ""
                 }
               }
             }
           }

       }
       }
       return arrayC
   }



  function readVariables(clauses){
    var vars = []
    for(i = 0; i < clauses.length; i++){
      for(e = 0; e < clauses[i].length; e++){
        var n = Math.abs(clauses[i][e])
        if(!(isInArray(n, vars))){
          vars.push(n)
        }
      }
    }
    newvars = []
    for(j = 0; j < vars.length; j++){
      newvars[j] = 0
    }
    return newvars;
  }

function checkProblemSpecifications (text, clauses, variables) {
    for(i = 0; i < text.length; i++){
        if(text[i].startsWith("p")){
            quant = text[i].split(' ')
            var quantC = quant[3]
            var quantV = quant[2]
        }
    }
    if(clauses.length == quantC && variables.length == quantV) 
        return true;
    return false
    
  }

function readFormula(fileName) {
    text = fs.readFileSync("../sat-master/" + fileName, 'utf8')
    text = text.split("\n")
    let clauses = readClauses(text)
    let variables = readVariables(clauses)
    let result = { 'clauses': [], 'variables': [] }
    specOk = checkProblemSpecifications(text, clauses, variables)
    if(specOk) {
        result.clauses = clauses
        result.variables = variables
    }
    console.log(result)
    return result;
    
  }

function isInArray(n, array){
    for(k = 0; k < array.length; k++){
      if(array[k] === n){
        return true;
      }
    }
    return false;
}
function nextAssignment (currentAssignment) {
    var testados = []
    let arrayTeste = currentAssignment
    arrayFinal = new Array(quantV)
    testados = new Array(quantV)
    for(var i = 0; i < quantV; i++){
    	if(i == (quantV - 1)){
    		testados[i] = 1
    	} else {
    		testados[i] = 0
    	}
    }
    for(var e = (quantV - 1); e != 0; e--){
    	arrayFinal[e] = arrayTeste[e] + testados[e]
    	if(arrayFinal[0] > 1){
    		arrayFinal[0] = 0
    	} else if(arrayFinal[e] == 2){
    		arrayFinal[e] = 0
    		arrayTeste[(e-1)] = arrayTeste[(e - 1)] + 1
    	}
    }
}
