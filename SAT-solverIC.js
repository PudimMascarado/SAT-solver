fs = require('fs')
var fileName = "hole4.cnf"
// como ele manda ler o nome de um arquivo, mudei a sintaxe pra ele ler o nome só
console.log(solve(fileName))
//console.log(doSolve(readFormula(fileName).clauses, [0,0,0,0,1]))
function solve(fileName){
  var text = readFormula(fileName);
  return doSolve(text.clauses, text.variables);
}

function readClauses(text){
   arrayC = []
   clauses = []
   numeros = ["1","2","3","4","5","6","7","8","9","0"]
   var act = ""
   for(var i = 0; i < text.length; i++){
      if(text[i][0] != 'c' && text[i][0] != 'p' && text[i] !== null){
        if(text[i].endsWith(0)){
          for(var e = 0; e < (text[i].length)-1; e++){
            if(text[i][e] !== " "){
              if(text[i][e] == "-"){
                act += text[i][e]
              }
              else{
                if(isInArray(text[i][e+1],numeros)){
                  if((e+1) < (text[i].length)-1){
                    act += text[i][e]            
                  }
                  else{
                    act += text[i][e]                
                    clauses.push(act)
                    act = ""
                  }    
                }
                else{
                  
                  act += text[i][e]                
                  clauses.push(act)
                  act = ""
                  }
                }
              }
            }
            arrayC.push(clauses)
            var clauses = []
          }
        else{
          if(!text[i].endsWith(".")){
          text[i] += "."
          }
          for(var e = 0; e < (text[i].length-1); e++){
            if(text[i][e] !== " "){
              if(text[i][e] == "-"){
                act += text[i][e]
              }
              else{
                if(isInArray(text[i][e+1],numeros)){
                  if((e+1) < (text[i].length)-1){
                    act += text[i][e]            
                  }
                  else{
                    act += text[i][e]                
                    clauses.push(act)
                    act = ""
                  }    
                }
                else{
                  
                  act += text[i][e]                
                  clauses.push(act)
                  act = ""
                  }
                }
              }
            }
          }
        }
      
    } return arrayC
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
    var b = true
    stop = new Array(quantV)
    arrayFinal = new Array(quantV)
    testados = new Array(quantV)
    var quantV = currentAssignment.length
    for(var i = 0; i < quantV; i++){
        if(i == (quantV - 1)){
            testados[i] = 1
        } else {
            testados[i] = 0
        }
    }
    for(var e = (quantV - 1); e >= 0; e--){
        arrayFinal[e] = arrayTeste[e] + testados[e]
        if(arrayFinal[0] > 1){
            arrayFinal[0] = 0
        } else if(arrayFinal[e] == 2){
            arrayFinal[e] = 0
            arrayTeste[(e-1)] = arrayTeste[(e - 1)] + 1
        }
    }
    for(var i = 0; i < quantV; i++){
        stop[i] = 0
    }
    for(var k = 0; k < quantV; k++){
        if(arrayFinal[k] != stop[k]){
            b = false
        }
    }
    if(b){
        return null
    }
    return arrayFinal
}
var arrayClausulas = []
function doSolve (clauses, assignment) {
  let isSat = false
  while((!isSat) && assignment != null){
    //console.log("clauses:" + clauses)
    //console.log("assignment:" + assignment)
    arrayClausulas = readClauses(text) 
    //console.log(arrayClausulas)
    for(var i = 0; i < arrayClausulas.length; i++){
      for(var e = 0; e < arrayClausulas[i].length; e++){
        var booleana = assignment[(Math.abs(parseInt(arrayClausulas[i][e])) - 1)]
        //console.log(arrayClausulas[i][e])
        //console.log("booleana:" + booleana)
        //console.log("assignment:" + assignment)
        if(booleana == 0){ 
          if(parseInt(arrayClausulas[i][e]) > 0){
            arrayClausulas[i][e] = false
          } else {
            arrayClausulas[i][e] = true
          }
        } else {
          if(parseInt(arrayClausulas[i][e]) < 0){
            arrayClausulas[i][e] = false
          } else {
            arrayClausulas[i][e] = true
          }
        }
      }
    }
    // console.log("clauses: " + arrayClausulas)
      var arrayz = new Array(arrayClausulas.length)
      var boolean = false
    for(var z = 0; z < arrayClausulas.length; z++){
      boolean = false
        for(var c = 0; c < arrayClausulas[z].length; c++){
      boolean = boolean || arrayClausulas[z][c]
     // console.log("boolean:" + boolean)
     // console.log("clauses[z][c]:" + arrayClausulas[z][c]+ "\n\n")
          }
          arrayz[z] = boolean 
        }
    
    var resposta = true
    for(var f = 0; f < arrayClausulas.length; f++){
      resposta = resposta && arrayz[f]
    }
    if(resposta){
      isSat = true
    } else {
      assignment = nextAssignment(assignment)
    }
  }
  let result = {'isSat': isSat, satisfyingAssignment: null}
  if (isSat) {
    result.satisfyingAssignment = assignment
  }
  return result
}
