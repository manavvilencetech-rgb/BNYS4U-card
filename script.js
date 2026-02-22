function showSection(sectionId){
  const sections = document.querySelectorAll('.section');
  sections.forEach(sec => sec.classList.remove('active'));
  document.getElementById(sectionId).classList.add('active');
}

// Dosha quiz calculation
function calculateDosha(){
  const q1 = document.getElementById('q1').value;
  const q2 = document.getElementById('q2').value;

  const doshaCount = {Vata:0, Pitta:0, Kapha:0};
  doshaCount[q1]++;
  doshaCount[q2]++;

  let result = Object.keys(doshaCount).reduce((a,b)=> doshaCount[a] >= doshaCount[b]?a:b);
  document.getElementById('doshaResult').innerText = `Your predominant dosha is: ${result}`;
}

// Appointment submission simulation
function submitAppointment(){
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const date = document.getElementById('date').value;

  if(name && phone && date){
    document.getElementById('appointmentResult').innerText = `Thank you ${name}! Your appointment for ${date} has been noted.`;
    document.getElementById('appointmentForm').reset();
  } else {
    document.getElementById('appointmentResult').innerText = `Please fill all fields.`;
  }
}

// Show home by default
showSection('home');
