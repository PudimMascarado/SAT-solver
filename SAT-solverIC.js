fs = require('fs')
var fileName = "hole2.cnf"
// como ele manda ler o nome de um arquivo, mudei a sintaxe pra ele ler o nome só
console.log(solve(fileName))

function solve(fileName){
  var text = readFormula(fileName);
  return doSolve(text.clauses, text.assignment);
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

function doSolve (clauses, assignment) {
  let isSat = false
  while((!isSat) && assignment != null){
    console.log(assignment)
    for(var i = 0; i < clauses.length; i++){
      for(var e = 0; e < clauses[i].length; e++){
        var booleana = assignment[(Math.abs(parseInt(clauses[i][e])) - 1)]
        if(booleana == 0){
          if(parseInt(clauses[i][e]) > 0){
            clauses[i][e] = false
          } else {
            clauses[i][e] = true
          }
        } else {
          if(parseInt(clauses[i][e]) < 0){
            clauses[i][e] = false
          } else {
            clauses[i][e] = true
          }
        }
      }
      var arrayz = new Array(clauses.length)
      var boolean = false
    for(var i = 0; i < clauses.length; i++){
        for(var e = 0; e < clauses[i].length; e++){
      boolean = boolean || clauses[i][e]
          }
          arrayz[i] = boolean 
        }
    }
    var resposta = true
    for(var i = 0; i < clauses.length; i++){
      resposta = resposta && arrayz[i] 
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