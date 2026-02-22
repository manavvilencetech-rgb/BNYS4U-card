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

// Appointment submission to WhatsApp
function submitAppointment(){
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const date = document.getElementById('date').value;

  if(name && phone && date){
    // WhatsApp message
    const message = `New BNYS4U Appointment:\nName: ${name}\nPhone: ${phone}\nPreferred Date: ${date}`;
    const whatsappURL = `https://wa.me/918858102095?text=${encodeURIComponent(message)}`;

    // Open WhatsApp link
    window.open(whatsappURL, '_blank');

    document.getElementById('appointmentForm').reset();
    document.getElementById('appointmentResult').innerText = `Thank you ${name}! Your appointment request has been sent to WhatsApp.`;
  } else {
    document.getElementById('appointmentResult').innerText = `Please fill all fields.`;
  }
}

// Show home by default
showSection('home');
