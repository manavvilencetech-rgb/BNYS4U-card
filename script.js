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

// Appointment submission to WhatsApp including patient ID from QR
function submitAppointment(){
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const date = document.getElementById('date').value;

  if(name && phone && date){
    const urlParams = new URLSearchParams(window.location.search);
    const patientID = urlParams.get('patient') || '';

    let message = `New BNYS4U Appointment:\nName: ${name}\nPhone: ${phone}\nPreferred Date: ${date}`;
    if(patientID) message += `\nPatient ID: ${patientID}`;

    const whatsappURL = `https://wa.me/918858102095?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');

    document.getElementById('appointmentForm').reset();
    document.getElementById('appointmentResult').innerText = `Thank you ${name}! Your appointment request has been sent to WhatsApp.`;
  } else {
    document.getElementById('appointmentResult').innerText = `Please fill all fields.`;
  }
}

// Generate standard QR code
function generateQRCode(){
  generateQRWithPatient('');
}

// Generate auto Patient ID QR code (one-tap)
function generateAutoQR(){
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 9000) + 1000;
  const patientID = `BNYS4U-${timestamp}-${randomNum}`;

  generateQRWithPatient(patientID);
}

// Core QR generator
function generateQRWithPatient(patientID){
  const baseURL = "https://manavvilencetech-rgb.github.io/BNYS4U-card/";
  const personalizedURL = patientID ? `${baseURL}?patient=${encodeURIComponent(patientID)}` : baseURL;

  const qrcodeDiv = document.getElementById('qrcode');
  qrcodeDiv.innerHTML = '';
  new QRCode(qrcodeDiv, {
    text: personalizedURL,
    width: 180,
    height: 180
  });

  alert("Your QR code is ready! Scan it to access your BNYS4U card.");
}

// Personalized greeting when card opened via QR
window.addEventListener('load', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const patient = urlParams.get('patient');
  if(patient){
    const homeSection = document.getElementById('home');
    const greeting = document.createElement('p');
    greeting.innerText = `Welcome, ${patient}! Tap below to explore your personalized BNYS4U card.`;
    greeting.style.fontWeight = "bold";
    homeSection.prepend(greeting);
  }
});

// Show home by default
showSection('home');

