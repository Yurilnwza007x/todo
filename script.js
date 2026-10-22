document.addEventListener("DOMContentLoaded", () => {
    const btnNo = document.getElementById('btnNo');

    // No button behavior: moves away on hover or touch
    btnNo.addEventListener('mouseover', moveNoButton);
    btnNo.addEventListener('touchstart', (e) => {
        e.preventDefault();
        moveNoButton();
    });
    btnNo.addEventListener('click', (e) => {
        e.preventDefault();
        moveNoButton();
    });
});

// Function to calculate random position for No button to dodge
function moveNoButton() {
    const btnNo = document.getElementById('btnNo');
    const padding = 20;
    const btnWidth = btnNo.offsetWidth || 100;
    const btnHeight = btnNo.offsetHeight || 40;

    const maxX = window.innerWidth - btnWidth - padding;
    const maxY = window.innerHeight - btnHeight - padding;

    const randomX = Math.max(padding, Math.floor(Math.random() * maxX));
    const randomY = Math.max(padding, Math.floor(Math.random() * maxY));

    btnNo.style.position = 'fixed';
    btnNo.style.left = `${randomX}px`;
    btnNo.style.top = `${randomY}px`;
    btnNo.style.zIndex = '50';
}

// When YES button is clicked
function handleYesClick() {
    // Confetti celebration
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 70,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#f472b6', '#fbbf24', '#38bdf8']
        });
    }

    // Switch to appointment form (Step 1 -> Step 2)
    const card1 = document.getElementById('card-step-1');
    const card2 = document.getElementById('card-step-2');

    card1.classList.add('opacity-0');
    setTimeout(() => {
        card1.classList.add('hidden');
        card2.classList.remove('hidden');
        void card2.offsetWidth;
        card2.classList.remove('opacity-0');
    }, 300);
}

// When form is submitted
function handleFormSubmit(event) {
    event.preventDefault();

    const dateVal = document.getElementById('inputDate').value;
    const timeVal = document.getElementById('inputTime').value;
    const locationVal = document.getElementById('inputLocation').value.trim();
    const noteVal = document.getElementById('inputNote').value.trim();

    // Fill ticket details
    document.getElementById('ticketDate').textContent = dateVal; // 26/10/2026
    document.getElementById('ticketTime').textContent = timeVal;
    document.getElementById('ticketLocation').textContent = locationVal || 'Our meeting spot';

    const noteRow = document.getElementById('ticketNoteRow');
    if (noteVal) {
        document.getElementById('ticketNote').textContent = `"${noteVal}"`;
        noteRow.classList.remove('hidden');
    } else {
        noteRow.classList.add('hidden');
    }

    // Switch to summary ticket (Step 2 -> Step 3)
    const card2 = document.getElementById('card-step-2');
    const card3 = document.getElementById('card-step-3');

    card2.classList.add('opacity-0');
    setTimeout(() => {
        card2.classList.add('hidden');
        card3.classList.remove('hidden');
        void card3.offsetWidth;
        card3.classList.remove('opacity-0');
    }, 300);
}

// Copy summary text to clipboard for chat
function copySummaryText() {
    const date = document.getElementById('ticketDate').textContent;
    const time = document.getElementById('ticketTime').textContent;
    const location = document.getElementById('ticketLocation').textContent;
    const note = document.getElementById('ticketNote').textContent;

    let summary = `🌕 Our Loy Krathong Date ✨\n📅 Date: ${date}\n⏰ Time: ${time}\n📍 Location: ${location}`;
    if (note && note !== '-') {
        summary += `\n💬 Note: ${note}`;
    }
    summary += `\n\nSee you! 💕🪷`;

    const tempInput = document.createElement('textarea');
    tempInput.value = summary;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    alert('Date summary copied to clipboard!');
}
