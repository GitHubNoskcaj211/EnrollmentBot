
console.log("Ready to enroll ;)");

var previous_enrollment_time = Date.now();
chrome.runtime.onMessage.addListener(function (message) {
	if(message.command === "toggle-enroll" && (Date.now() - previous_enrollment_time) > 2000){
		enroll();
		previous_enrollment_time = Date.now();
	}
});

function enroll() {
	console.log('Attempting Enroll!');

	var request = new XMLHttpRequest();
	request.open("GET", "https://more.app.vanderbilt.edu/more/StudentClass!getSavedClasses.action", true);
	request.send(null);
	request.onreadystatechange = function() {
		if (request.readyState == 4){
			var parser = new DOMParser();
			var doc = parser.parseFromString(request.responseText, 'text/html');
			term_code = doc.getElementById('selectedTermCodeHidden').value;
			class_numbers = [];
			cart = doc.getElementById("StudentCartList_div");
			classes = cart.getElementsByClassName("classTable");
			for (i = 0; i < classes.length; i++) {

				classInfo = classes[i].getElementsByClassName("left")[0].childNodes;
				className = classInfo[1].innerText + " " + classInfo[3].innerText;

				classSelections = classes[i].getElementsByClassName("classSelection");

				for(j = 0; j<classSelections.length; j++){
					classSelection = classSelections[j];
					sub = classSelection.children;
					for(k = 0; k<sub.length; k++){
						if(sub[k].name && sub[k].name.split(".").length === 2 && sub[k].name.split(".")[1] === "classNumber"){
							class_numbers.push(sub[k].value);
						}
					}
				}
			}

			console.log(term_code);
			console.log(class_numbers);
			register_url = 'https://more.app.vanderbilt.edu/more/StudentClass!queueEnroll.action?selectedTermCode=' + term_code;
			for(i = 0; i < class_numbers.length; i++){
				register_url += '&enrollmentRequestItems%5B'+String(i)+'%5D.classNumber=' + class_numbers[i] + '&enrollmentRequestItems%5B'+String(i)+'%5D.waitList=true';
			}

			fetch(register_url)
			.then(data=>{return data.json()})
			.then(response=>{
				job_id = response.jobId;
				console.log('Submitted Job: ' + job_id)
				fetch('https://more.app.vanderbilt.edu/more/StudentClass!checkStatus.action?jobId='+job_id)
				.then(data=>{return data.json()})
				.then(response=>{
					if(response){
						console.log('Job Processed');
					}else{
						console.log('Job NOT Processed');
					}


				});
			});
		}
	};
	fixEnrollmentNumbers();
}

function fixEnrollmentNumbers() {
	fetch('https://more.app.vanderbilt.edu/more/StudentClass!getClassHoursSummary.action')
	.then(data=>{return data.json()})
	.then(response=>{
		document.getElementById('enrolledHours').innerText = response.enrolled.classHours;
		document.getElementById('savedHours').innerText = response.saved.classHours;
		document.getElementById('waitingHours').innerText = response.waitlisted.classHours;
		document.getElementById('enrollmentDatesLink').innerText = (parseInt(document.getElementById('enrollmentDatesLink').innerText.split(' ')[document.getElementById('enrollmentDatesLink').innerText.split(' ').length - 1]) + 1).toString();
	});
}