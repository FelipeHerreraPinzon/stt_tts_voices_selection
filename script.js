   // Variables
   const startRecordBtn = document.getElementById('start-record-btn');
   const recordedText = document.getElementById('recorded-text');
   const textToSpeak = document.getElementById('text-to-speak');
   const voiceSelect = document.getElementById('voice-select');
   const speakBtn = document.getElementById('speak-btn');
   const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

   // Speech to Text
   recognition.onstart = function() {
       console.log('Voice recognition started. Speak into the microphone.');
   };

   recognition.onspeechend = function() {
       console.log('Voice recognition stopped.');
       recognition.stop();
   };

   recognition.onresult = function(event) {
       const transcript = event.results[0][0].transcript;
       recordedText.textContent = transcript;
       textToSpeak.value = transcript;  // Copy text to textarea
   };

   recognition.onerror = function(event) {
       console.error('Speech recognition error detected:', event.error);
   };

   startRecordBtn.addEventListener('click', () => {
       recognition.start();
       console.log('Recording started');
   });

   // Text to Speech with Voice Selection
   let voices = [];

   function populateVoiceList() {
       voices = window.speechSynthesis.getVoices();
       voiceSelect.innerHTML = '';
       voices.forEach((voice, i) => {
           const option = document.createElement('option');
           option.value = i;
           option.textContent = `${voice.name} (${voice.lang})`;
           if (voice.default) {
               option.textContent += ' [default]';
           }
           voiceSelect.appendChild(option);
       });
   }

   window.speechSynthesis.onvoiceschanged = populateVoiceList;
   
   populateVoiceList();

   speakBtn.addEventListener('click', () => {
       const text = textToSpeak.value;
       const speech = new SpeechSynthesisUtterance(text);
       const selectedVoice = voices[voiceSelect.value];
       speech.voice = selectedVoice;
       window.speechSynthesis.speak(speech);
   });