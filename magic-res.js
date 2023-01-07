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
	console.log(result);

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
			for (const key in result) {
				currentPass =
					result[key]
						.passType; /*iterate through pass type arrays to find the one that matches selected pass */
				if (currentPass == pass) {
					currentPass = result[key].availabilities;
					for (const date in currentPass) {
						/*iterate through dates to find the selected date*/
						switch (park) {
							case "ANY" /* will return all available parks for the day at selected resort*/:
								if (
									currentPass[date].date == parkDate &&
									currentPass[date].slots[0].available
								) {
									nowPark = currentPass[date].facilityId;
									document.getElementById(
										"card-title"
									).innerHTML = `Reservations are available for ${nowPark} on ${parkDate} for ${pass}`;
									console.log(
										currentPass[date].date,
										currentPass[date].facilityId,
										currentPass[date].slots[0].available
									);
								}
							default: /*returns availability for selected park only*/
								if (
									currentPass[date].date == parkDate &&
									currentPass[date].facilityId == park
								) {
									if (currentPass[date].slots[0].available) {
										document.getElementById(
											"card-title"
										).innerHTML = `Reservations are available for ${park} on ${parkDate} for ${pass}`;
									} else {
										reason = currentPass[date].slots[0].unavailableReason;
										document.getElementById(
											"card-title"
										).innerHTML = `Reservations are not available for ${park} on ${parkDate} because ${reason}`;
										console.log(currentPass[date]);
									}
								}
						}
					}
				}
			}
		});
}
