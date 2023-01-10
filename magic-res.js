$(document).ready(function () {
	var date_input = $('input[name="date"]'); //our date input has the name "date"
	var container =
		$(".bootstrap-iso form").length > 0
			? $(".bootstrap-iso form").parent()
			: "body";
	var options = {
		format: "yyyy-mm-dd",
		container: container,
		todayHighlight: true,
		autoclose: true,
		startDate: "+0d",
		endDate: "+90d",
	};
	date_input.datepicker(options);
});

function testResort(val) {
	if (val == "DLR") {
		document.getElementById("DLRdrops").classList.remove("hidden");
		document.getElementById("WDWdrops").classList.add("hidden");
	} else if (val == "WDW") {
		document.getElementById("WDWdrops").classList.remove("hidden");
		document.getElementById("DLRdrops").classList.add("hidden");
	} else {
		document.getElementById("WDWdrops").classList.add("hidden");
		document.getElementById("DLRdrops").classList.add("hidden");
	}
}

function weekResortCheck(val) {
	if (val == "DLR") {
		document.getElementById("weekDLR").classList.remove("hidden");
		document.getElementById("weekWDW").classList.add("hidden");
	} else if (val == "WDW") {
		document.getElementById("weekWDW").classList.remove("hidden");
		document.getElementById("weekDLR").classList.add("hidden");
	} else {
		document.getElementById("weekWDW").classList.add("hidden");
		document.getElementById("weekDLR").classList.add("hidden");
	}
}

function submitForm() {
	resort = document.querySelector("#selectResort").value;

	if (resort == "DLR") {
		pass = document.querySelector("#selectDLRkey").value;
		park = document.querySelector("#selectDLRpark").value;

		url = dlrUrl;
	} else if (resort == "WDW") {
		pass = document.querySelector("#selectWDWpass").value;
		park = document.querySelector("#selectWDWpark").value;
		url = wdwUrl;
	}
	parkDate = document.querySelector("#date").value;

	const result = new userData(resort, pass, park, parkDate);

	getResortData(url, pass, park, parkDate);
}
function userData(resort, pass, park, parkDate) {
	this.resort = resort;
	this.pass = pass;
	this.park = park;
	this.date = parkDate;
}

let dlrUrl =
	"https://disneyland.disney.go.com/passes/blockout-dates/api/get-availability/?product-types=inspire-key-pass,believe-key-pass,enchant-key-pass,imagine-key-pass,dream-key-pass&destinationId=DLR&numMonths=14";

let wdwUrl =
	"https://disneyworld.disney.go.com/passes/blockout-dates/api/get-availability/?product-types=disney-incredi-pass,disney-sorcerer-pass,disney-pirate-pass,disney-pixie-dust-pass&destinationId=WDW&numMonths=13";

function getResortData(url, pass, park, parkDate) {
	fetch(url) /* grab array from disney site */
		.then((response) => response.json())
		.then((result) => {
			var weekArray = []
			var dayArray = []
			listLength = 7
				for (let i = 0; i< listLength; i++){
					itemDate = new Date();
					itemDate.setDate(itemDate.getDate() +i);
					itemDate = itemDate.toISOString().split('T')[0];
					
					emptyList = []
					dateFill = new dateObject(itemDate, emptyList)
					
					weekArray.push(dateFill)
				}
			
			for (const key in result) {
				currentPass =
					result[key]
						.passType; /*iterate through pass type arrays to find the one that matches selected pass */
				if (currentPass == pass) {
					currentPass = result[key].availabilities;
					for (const date in currentPass) {
						/*iterate through dates to find the selected date*/
						if (park !== null){
						switch (park) {
							case "ANY" /* will return all available parks for the day at selected resort, but only displays last available park in card*/:
								if (currentPass[date].date == parkDate) {
									const matchObject = currentPass[date];
									cardNotification(matchObject, pass);
								}
							default: /*returns availability for selected park only*/
								if (
									currentPass[date].date == parkDate &&
									currentPass[date].facilityId == park
								) {
									const matchObject = currentPass[date];
									cardNotification(matchObject, pass);
								}
							}
						}else if (date < 28){
							weekPark = currentPass[date].facilityId;
							weekAvailable = currentPass[date].slots[0].available
							weekReason = currentPass[date].slots[0].unavailableReason
							weekAvail = new parkObject(weekPark, weekAvailable, weekReason);
							for (element in weekArray){
								if (weekArray[element].date == currentPass[date].date){
									weekPush = weekArray[element].slot;
									weekPush.push(weekAvail);
								}
							}
								
							}
							
							/*for (weekDate in weekArray){
								console.log(weekArray[weekDate].date, currentPass[date].date)
								if (weekArray[weekDate].date == currentPass[date].date){
									console.log("testing week date")
									dayArray = weekArray[weekDate].slots;
									dayArray.push(weekPark);
								}else{
									dateSlot = new parkObject(weekPark, weekAvailable, weekReason)
									newDatePush = new dateObject(currentPass[date].date, dateSlot)
									console.log(newDatePush)
									weekArray.push(newDatePush)
									
								}
							}*/
						}
						
					}
					
				
			}
			displayWeek(weekArray);
});
}
function displayWeek(weekArray){
	console.log(weekArray)
	
	var currentNode = document.getElementById("displayWeek")
	var currentElement = document.createElement("br")
	for (element in weekArray){
		console.log(weekArray[element].date)
		var displayDate = weekArray[element].date
		text = document.createTextNode(`${displayDate}`)
		currentNode.appendChild(text)
		currentNode.appendChild(document.createElement("br"))
		parkArray = weekArray[element].slot;
		for (iterPark in parkArray){
			var displayPark = parkArray[iterPark].park;
			var displayAvailable = parkArray[iterPark].available
			var displayReason = parkArray[iterPark].reason
			text = document.createTextNode(`${displayPark}, ${displayAvailable}, ${displayReason}`)
			currentNode.appendChild(text);
			currentNode.appendChild(document.createElement("br"))
		}

	}

}
function dateObject(date, slot){
	this.date = date;
	this.slot = slot;
}

function parkObject(weekPark, weekAvailable, weekReason ){
	this.park = weekPark;
	this.available = weekAvailable;
	this.reason = weekReason;
}

function weekCalendar(){
	weekResort = document.querySelector("#weekSelectResort").value;
	document.getElementById('displayWeek').innerHTML = ""

	if (weekResort == "DLR") {
		weekPass = document.querySelector("#weekSelectDLRkey").value;
		weekPark = null
		weekDate = null
		weekUrl = dlrUrl;
	} else if (weekResort == "WDW") {
		weekPass = document.querySelector("#weekSelectWDWpass").value;
		weekPark = null
		weekDate = null
		weekUrl = wdwUrl;
	}
	parkDate = document.querySelector("#date").value;


	getResortData(weekUrl, weekPass, weekPark, weekDate);
}
	


function cardNotification(notificationObject, pass) {
	notifPark = notificationObject.facilityId;
	notifDate = notificationObject.date;
	notifAvail = notificationObject.slots[0].available;
	reason = notificationObject.slots[0].unavailableReason;
	var parkText = "";
	var passText = "";
	var reasonText = "";

	switch (notifPark) {
		case "DLR_DP":
			parkText = "Disneyland";
			break;
		case "DLR_CA":
			parkText = "California Adventure";
			break;
		case "WDW_MK":
			parkText = "Magic Kingdom";
			break;
		case "WDW_MK":
			parkText = "Magic Kingdom";
			break;
		case "WDW_HS":
			parkText = "Hollywood Studios";
			break;
		case "WDW_EP":
			parkText = "EPCOT";
			break;
		case "WDW_AK":
			parkText = "Animal Kingdom";
			break;
	}
	switch (pass) {
		case "inspire-key-pass":
			passText = "Inspire keys";
			break;
		case "imagine-key-pass":
			passText = "Imagine keys";
			break;
		case "believe-key-pass":
			passText = "Believe keys";
			break;
		case "enchant-key-pass":
			passText = "Enchant keys";
			break;
		case "disney-incredi-pass":
			passText = "Incredi-pass";
			break;
		case "disney-sorcerer-pass":
			passText = "Sorcerer pass";
			break;
		case "disney-pirate-pass":
			passText = "Pirate pass";
			break;
		case "disney-pixie-dust-pass":
			passText = "Pixie Dust pass";
			break;
	}

	switch (reason) {
		case "BLOCKED":
			reasonText = "you are blocked out";
			titleText = "You're blocked out, LOSER!";
			break;
		case "NO_INV":
			reasonText = "reservations are sold out";
			titleText = "Sorry, we're full!";
			break;
		case "EXCEED_SOFT_LIMIT":
			reasonText = "the park is at capacity";
			titleText = "Sorry, we're full!";
			break;
	}

	if (notifAvail == true) {
		notificationObject.facilityId;
		document.getElementById(
			"card-text"
		).innerHTML = `Reservations are available for ${parkText} on ${notifDate} for ${passText}`;
		document.getElementById("card-title").innerHTML = "Come on Down!";
	} else {
		reason = notificationObject.slots[0].unavailableReason;
		document.getElementById(
			"card-text"
		).innerHTML = `Reservations are not available for ${parkText} on ${parkDate} because ${reasonText}`;
		document.getElementById("card-title").innerHTML = titleText;
		document.getElementById("card-button").innerHTML = `Get Lost!`;
	}
}

/* if (currentPass[date].slots[0].available) {
										document.getElementById(
											"card-text"
										).innerHTML = `Reservations are available for ${park} on ${parkDate} for ${pass}`;
								document.getElementById(
								"card-title"
								).innerHTML = `Success!`;
									} else {
										reason = currentPass[date].slots[0].unavailableReason;
										document.getElementById(
											"card-text"
										).innerHTML = `Reservations are not available for ${park} on ${parkDate} because ${reason}`;
										document.getElementById(
										"card-title"
										).innerHTML = `You're Blocked out, Loser!`;
										document.getElementById(
											"card-button"
											).innerHTML = `Get Lost!`;
									}*/
