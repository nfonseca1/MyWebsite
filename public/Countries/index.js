var url = "https://restcountries.eu/rest/v2/all";
var searchFunction = "";
var interval;

var all = document.querySelector(".all");
var specific = document.querySelector(".specific");
var criteria = document.querySelector("#criteria");
var searchText = document.querySelector("#searchText");
var search = document.querySelector("#search");
var results = document.querySelector(".results");

search.addEventListener("click", SetupPath);
criteria.addEventListener("change", function(){
	if(criteria.value == "name"){
		searchText.placeholder = "ex: Austria";
		searchText.value = "";
	} else if(criteria.value == "iso"){
		searchText.placeholder = "ex: usa";
		searchText.value = "";
	} else if(criteria.value == "currency"){
		searchText.placeholder = "ex: usd";
		searchText.value = "";
	} else if(criteria.value == "language"){
		searchText.placeholder = "ex: en";
		searchText.value = "";
	} else if(criteria.value == "capital"){
		searchText.placeholder = "ex: Budapest";
		searchText.value = "";
	} else if(criteria.value == "phone"){
		searchText.placeholder = "ex: 1";
		searchText.value = "";
	} else {
		searchText.placeholder = "ex: Europe";
		searchText.value = "";
	}
})

function SetupPath(){

	if(criteria.value == "name"){
		url = "https://restcountries.eu/rest/v2/name/" + searchText.value;
	} else if(criteria.value == "iso"){
		url = "https://restcountries.eu/rest/v2/alpha/" + searchText.value;
	} else if(criteria.value == "currency"){
		url = "https://restcountries.eu/rest/v2/currency/" + searchText.value;
	} else if(criteria.value == "language"){
		url = "https://restcountries.eu/rest/v2/lang/" + searchText.value;
	} else if(criteria.value == "capital"){
		url = "https://restcountries.eu/rest/v2/capital/" + searchText.value;
	} else if(criteria.value == "phone"){
		url = "https://restcountries.eu/rest/v2/callingcode/" + searchText.value;
	} else {
		url = "https://restcountries.eu/rest/v2/region/" + searchText.value;
	}

	MakeRequest(url, function(obj){
		GetCountries(obj);
	})
}

function MakeRequest(url, callback){

	// Create xmlhttprequest object
    var xmlhttp = null;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
        //make sure that Browser supports overrideMimeType
        if (typeof xmlhttp.overrideMimeType != 'undefined') { xmlhttp.overrideMimeType('text/xml'); }

    } else if (window.ActiveXObject) {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    } else {
        alert('Perhaps your browser does not support xmlhttprequests?');
    }

    // Create an HTTP GET request
    xmlhttp.open('GET', url, true);

    // Set the callback function
    xmlhttp.onreadystatechange = function () {
    	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    		// Output the results
    		//alert(xmlhttp.responseText);
        	//var myObj = eval(xmlhttp.responseText);
        	var myObj = eval('(' + xmlhttp.responseText + ')');
        	//debugger
        	
        	callback(myObj, 200);

        } else if(xmlhttp.status == 400 || xmlhttp.status == 404){
        	callback({}, xmlhttp.status);
        }
    };

    xmlhttp.send(null);
}

function GetCountries(myObj){
	var names = [];

	if(!Array.isArray(myObj)){
		obj = [];
		obj.push(myObj);
	} else {
		obj = myObj;
	}

	var html = "";
	var html = "<h3>Results: </h3><div></div>";
	html += "<table class='table table-striped'>";
	html += "<thead><th>Flag</th>"+
	"<th class='thead name'>Name</th>"+
	"<th class='thead capital'>Capital</th>"+
	"<th class='thead region'>Region</th>"+
	"<th class='thead population'>Population</th>"+
	"<th class='thead area'>Area(sqmi)</th>"+
	"<th class='thead language'>Primary Language</th>"+
	"<th class='thead currency'>Primary Currency</th></thead>"+
	"<th class='thead'></th></thead>";
	html += "<tbody>";

	for(let i = 0; i < obj.length; i++){
		html += "<tr>";

		var flag = obj[i].flag;
		var name = obj[i].name;
		var capital;
		if(obj[i].capital == '' || obj[i].capital == null){ 
			capital = "N/A" 
		} else { 
			capital = obj[i].capital 
		}
		var region = obj[i].region;
		var population = obj[i].population;
		var area;
		if(obj[i].area == '' || obj[i].area == null){ 
			area = "N/A" 
		} else { 
			area = obj[i].area
		}
		var language = obj[i].languages[0].name;
		var currency;
		if(obj[i].currencies[0].code == '(none)' || obj[i].currencies[0].code == null){ 
			currency = obj[i].currencies[1].code;
		} else { 
			currency = obj[i].currencies[0].code;
		}

		html += "<td><img src=" + flag + " class='flag'></td>";
		html += "<td>" + name + "</td>";
		html += "<td>" + capital + "</td>";
		html += "<td>" + region + "</td>";
		html += "<td>" + population + "</td>";
		html += "<td>" + area + "</td>";
		html += "<td>" + language + "</td>";
		html += "<td>" + currency + "</td>";
		html += "<td><button class='more yellowBtn'>More</button></td>";
		html += "</tr>";

		names.push(name);
	}

	html += "</tbody></table>";
	results.innerHTML = html;

	var moreBtns = document.querySelectorAll(".more");
	for(let i = 0; i < moreBtns.length; i++){
		moreBtns[i].addEventListener("click", function(){
			Specific(obj[i])
		})
	}
}

function Specific(country){

	var all = document.querySelector(".all");
	all.classList.toggle("hide");
	specific.classList.toggle("show");

	var html = "";
	html += "<button class='back blueBtn'>Back</button>";

	html += "<div class='row'>";
	html += "<div class='col-6'>";
	html += "<table class='title-row'><tr><td><img src=" + country.flag + " class='flag-large'></td>";
	html += "<td><h3>" + country.name + "</h3></td></tr></table>";

	html += "<table class='info-row'>";
	html += "<tr><td class='col-left'>Native Name</td><td class='col-right'>" + country.nativeName + "</td></tr>";
	html += "<tr><td class='col-left'>Country Code</td><td class='col-right'>" + country.alpha2Code + " " + country.alpha3Code + "</td></tr>";
	html += "<tr><td class='col-left'>Region</td><td class='col-right'>" + country.region + "</td></tr>";
	html += "<tr><td class='col-left'>Sub Region</td><td class='col-right'>" + country.subregion + "</td></tr>";
	html += "<tr><td class='col-left'>Population</td><td class='col-right'>" + country.population + "</td></tr>";
	html += "<tr><td class='col-left'>Coordinates</td><td class='col-right'>" + country.latlng[0] + 
	" latitude " + country.latlng[1] + " longitude</td></tr>";
	html += "<tr><td class='col-left'>Area</td><td class='col-right'>" + country.area + " square miles</td></tr>";
	html += "<tr><td class='col-left'>Borders</td><td class='col-right'>";
	country.borders.forEach(function(border){
		html += border + " ";
	})
	html += "</td></tr>";
	html += "<tr><td class='col-left'>Capital</td><td class='col-right'>" + country.capital + "</td></tr>";
	html += "<tr><td class='col-left'>Currencies</td><td class='col-right'>";
	country.currencies.forEach(function(cur){
		html += cur.code + " ";
	})
	html += "</td></tr>";
	html += "<tr><td class='col-left'>Languages</td><td class='col-right'>";
	country.languages.forEach(function(lang){
		html += lang.name + " ";
	})
	html += "</td></tr>";
	html += "<tr><td class='col-left'>Call Code(s)</td><td class='col-right'>";
	country.callingCodes.forEach(function(code){
		html += code + " ";
	})
	html += "</td></tr>";
	html += "</table>";

	html += "</div class='col-6'>";

	html += "<div class='col-6'>";
	//html += "<h5>Population</h5>";
	//html += "<table class='info-row'>";
	//for (let i = 2004; i < 2019; i++) {
	//	
	//}
	//html += "<tr><td class='col-left'>2018 Population</td><td class='col-right pop-total'></td></tr>";
	//html += "<tr><td class='col-left'>Male Population</td><td class='col-right pop-males'></td></tr>";
	//html += "<tr><td class='col-left'>Female Population</td><td class='col-right pop-females'></td></tr></table>";
	//html += "</div class='col-6'>";

	html += "<div class='col-6'>";
	html += '<div class="post-info-map map">'+
                '<iframe width="100%" height="100%" frameborder="0" style="border:0"'+
                        'src="https://www.google.com/maps/embed/v1/place?q='+country.name+'&key=AIzaSyCeX3-b79Y5vuookIt2PoSfao9sJ5Odgc8"'+
                        'allowfullscreen></iframe>'+
            '</div>';
    html += '</div>';
    html += '</div>';

    specific.innerHTML = html;

    var back = document.querySelector(".back");
    back.addEventListener("click", function(){
    	all.classList.toggle("hide");
    	specific.classList.toggle("show");
    	specific.innerHTML = "";
    })

    var popTotal = document.querySelector(".pop-total");
    var popMales = document.querySelector(".pop-males");
    var popFemales = document.querySelector(".pop-females");
    var age = document.querySelector(".age");
    var yearMin = document.querySelector(".year-min");
    var yearMax = document.querySelector(".year-max");
    var gender = document.querySelector("#gender");
    var custom = document.querySelector(".custom-pop");
    var customBtn = document.querySelector(".customBtn");
    var customTable = document.querySelector(".custom-table");

    var name = ConvertName(country.nativeName);
	GetPopulation(country, null, null, null, function(arr){
		popTotal.textContent = arr[0].total;
		popMales.textContent = arr[0].males;
		popFemales.textContent = arr[0].females;
	});

    customBtn.addEventListener("click", function(){
    	GetPopulation(country, yearMin.value, yearMax.value, age.value, function(arr){
    		var html = "";
    		html += "<table class='info-row'>";
    		if(yearMax.value != '' && yearMax.value != null){
    			html += "<thead><th></th><th>Total</th><th>Males</th><th>Females</th></thead>";
    			for(let i = 0; i < arr.length; i++){
    				html += "<tr>";
    				var popYear;
    				if(yearMin.value == ''){ 
    					popYear = (parseInt(2018) + parseInt(i)); 
    				} else { 
    					popYear = (parseInt(yearMin.value) + parseInt(i))
    				}
    				html += "<td class='col-left'>" + (popYear) + "</td><td class='col-right'>" + arr[i].total + "</td>";
    				html += "<td class='col-right'>" + arr[i].totalMales + "</td>";
    				html += "<td class='col-right'>" + arr[i].totalFemales + "</td>";
    				html += "</tr>";
    			}
    		} else {
    			var popYear;
	    		if(yearMin.value == ''){ popYear = 2018; } else { popYear = yearMin.value}
	    		if(age.value != ''){ popYear += " - " + age.value + "y.o."}
	    		html += "<tr><td class='col-left'>" + popYear + " Population</td><td class='col-right'>" + arr[0].total + " </td></tr>";
	    		html += "<tr><td class='col-left'>Male Population</td><td class='col-right'>" + arr[0].males + "</td></tr>";
	    		html += "<tr><td class='col-left'>Female Population</td><td class='col-right'>" + arr[0].females + "</td></tr>";
	    		html += "</table>";
    		}

    		customTable.innerHTML = html;
    	})
    })
}

function ConvertName(country){
	name = country.toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
    return name;
}

function GetPopulation(country, year, yearMax, age, callback){
	if(year == '' || year == null){ year = 2018; }

	var name1 = ConvertName(country.nativeName);
	var url1 = "http://api.population.io:80/1.0/population/"+year+"/"+name1+"/";
	var name2 = ConvertName(country.name);
	var url2 = "http://api.population.io:80/1.0/population/"+year+"/"+name2+"/";

	var success;

	if(yearMax != '' && yearMax != null){
		var arr = [];
		var log = [];
		success = function(myObj, year, yearMax){
			console.log("success " + year);
			if(!log.includes(year)){
				log.push(year);
				var yearObj = {
					total: 0,
					totalMales: 0,
					totalFemales: 0
				}
			
				for(let i = 0; i < myObj.length; i++){
					if(age == '' || age == null){
						console.log("success " + myObj[i].total);
						console.log("yearObj" + yearObj.total);
						yearObj.total += myObj[i].total;
						yearObj.totalMales += myObj[i].males;
						yearObj.totalFemales += myObj[i].females;
					} else if(myObj[i].age == age){
						yearObj.total += myObj[i].total;
						yearObj.totalMales += myObj[i].males;
						yearObj.totalFemales += myObj[i].females;
						break;
					}
				}
				if(year == yearMax){
					console.log(year + " " + yearMax);
					arr.push(yearObj);
					callback(arr);
					return;
				} else {
					console.log(yearObj.total);
					arr.push(yearObj);
					countYear++;
					getData();
				}
			}
		}
		var countYear = year;
		var countMaxYear = yearMax;
		var getData = function(){
			console.log("getData " + countYear);
			url1 = "http://api.population.io:80/1.0/population/"+countYear+"/"+name1+"/";
			url2 = "http://api.population.io:80/1.0/population/"+countYear+"/"+name2+"/";
			MakeRequest(url1, function(myObj, status){
				if(status == 400 || status == 404){
					MakeRequest(url2, function(myObj, status){
						if(status == 400 || status == 404){
							callback({total: "N/A", males: "N/A", females: "N/A"});
						} else {
							success(myObj, countYear, countMaxYear);
						}
					})
				} else {
					success(myObj, countYear, countMaxYear);
				}
			})
		}
		getData();
		
	} else {
		success = function(myObj){
			var total = 0;
			var totalMales = 0;
			var totalFemales = 0;

			for(let i = 0; i < myObj.length; i++){
				if(age == '' || age == null){
					total += myObj[i].total;
					totalMales += myObj[i].males;
					totalFemales += myObj[i].females;
				} else {
					if(myObj[i].age == age){
						total = myObj[i].total;
						totalMales = myObj[i].males;
						totalFemales = myObj[i].females;
						break;
					}
				}
			}
			callback([{total: total, males: totalMales, females: totalFemales}]);
		}

		MakeRequest(url1, function(myObj, status){
			if(status == 400 || status == 404){
				MakeRequest(url2, function(myObj, status){
					if(status == 400 || status == 404){
						success(myObj);
					} else {
						success(myObj);
					}
				})
			} else {
				success(myObj);
			}
		})
	}
}