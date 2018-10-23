/**
 * Lifeday Calculator
 *
 * @author j@cin.is
 */

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

function setCookie(str) {
	document.cookie = "dob="+str;
}

function getCookie(){
	let m = document.cookie.match(/dob\=((0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4})/);
  return m ? m[1] : "";
}

// MAIN APPLICATION ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

const dayEl = document.getElementById("day");
const formEl = document.getElementById("setdob");
const dobEl = document.getElementById("dob");
const resultsEl = document.getElementById("results");
const settingsEl = document.getElementById("settings");

toggleResults = function(){
  if(resultsEl.className == "hide"){
    resultsEl.className = "";
  } else {
    resultsEl.className = "hide";
  }
  return false;
}
settingsEl.onclick = toggleResults;

let dob = fetchDOB();

setLifeday = function(dob){
	dayEl.innerHTML = lifeDay(moment(dob));
}

validateDOB = function(e) {

  let str = dobEl.value;

  if(validDOB(str)) {
    formEl.className = "valid";
    storeDOB(str);
  } else {
    formEl.className = "";
    storeDOB("");
  }

  return false;
}

dobEl.onkeyup = validateDOB;
dobEl.onchange = validateDOB;

dobEl.value = dob;
validateDOB();

submitDOB = function(e){

  setLifeday(dobEl.value);

	return false;
}
formEl.onsubmit = submitDOB;
