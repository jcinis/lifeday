/**
 * Lifeday Calculator
 *
 * @author j@cin.is
 */

// UTILITY FUNCTIONS :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

function formatDOB(str) {
	let m = str.match(/^(\d{2})(\d{2})(\d{4})$/);
  if(m){
    str = m[1]+"/"+m[2]+"/"+m[3];
  }
  return str;
}

function validDOB(dob){
	let m = dob.match(/^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/);
  return m ? true : false;
}

function lifeDay(dob, toDay) {
  toDay = toDay ? toDay : moment().format('YYYY-MM-DD');

  // The number of days since your birthday + 1 (so that your birthday counts as day #1)
  return moment(toDay).diff(moment(dob), "days") + 1;
}

function storeDOB(str){
  return window.localStorage.setItem("dob",str);
}

function fetchDOB(str){
  return window.localStorage.getItem("dob");
}


// MAIN APPLICATION ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

const el = document.getElementById("lifeday");
const dayEl = document.getElementById("day");
const formEl = document.getElementById("setdob");
const dobEl = document.getElementById("dob");
const resultsEl = document.getElementById("results");
const settingsBtnEl = document.getElementById("settings-btn");

showResults = function(){
  el.className = "";
  resultsEl.className="fade-in";
}

hideResults = function(){
  el.className="settings";
  resultsEl.className="fade-out";
}

toggleResults = function(){
  if(el.className == "settings"){
    showResults();
  } else {
    hideResults();
  }
  return false;
}

setLifeday = function(dob){
  const ld = lifeDay(moment(dob));
  dayEl.innerHTML = ld;
  document.title = "Ld:"+ld;
}

validateDOB = function(e) {
  let str = formatDOB(dobEl.value);
  dobEl.value = str;
  if(validDOB(str)) {
    formEl.className = "valid";
    storeDOB(str);
  } else {
    formEl.className = "";
    storeDOB("");
  }
  return false;
}

submitDOB = function(e){
  if(formEl.className == 'valid'){
    setLifeday(dobEl.value);
    showResults();
  }
	return false;
}


// BIND EVENTS :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

dobEl.onkeyup = validateDOB;
dobEl.onchange = validateDOB;
formEl.onsubmit = submitDOB;
settingsBtnEl.onclick = toggleResults;


// LOAD STORED DOB :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

let dob = fetchDOB();
if(dob){
  dobEl.value = dob;
  validateDOB();
  submitDOB();
}
