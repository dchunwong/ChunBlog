var temp = document.body.getElementsByClassName("collapse");
var titles = [];
for(var i = 0; i < temp.length; i++){
	titles[i] = temp[i];
}
var contents = document.body.getElementsByClassName("content");
var dates = document.body.getElementsByClassName("date");

function collapse(e){
	var i = titles.indexOf(e.target);
	if(contents[i].style.display == "none" || dates[i].style.display == "none"){
		contents[i].style.display = "";
		dates[i].style.display = "";
		e.target.innerHTML = "&ndash;"

	}
	else{
		contents[i].style.display = "none";
		dates[i].style.display = "none";
		e.target.innerHTML = "+"

	}
}

for(var i = 0; i < titles.length; i++){
	titles[i].addEventListener("click", collapse);
}