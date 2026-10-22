
document.addEventListener("DOMContentLoaded", () => {
    const btnNo = document.getElementById('btnNo');

    // พฤติกรรมปุ่ม No: เลื่อนหนีอย่างเดียวเมื่อชี้หรือแตะ
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

// ฟังก์ชันคำนวณตำแหน่งสุ่มให้ปุ่ม No เลื่อนหนี
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

// เมื่อกดปุ่ม YES
function handleYesClick() {
    // จุดพลุกระดาษฉลอง
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 70,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#f472b6', '#fbbf24', '#38bdf8']
        });
    }

    // สลับไปยังหน้าฟอร์มนัดหมาย (Step 1 -> Step 2)
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

// เมื่อส่งฟอร์มนัดหมาย
function handleFormSubmit(event) {
    event.preventDefault();

    const dateVal = document.getElementById('inputDate').value;
    const timeVal = document.getElementById('inputTime').value;
    const locationVal = document.getElementById('inputLocation').value.trim();
    const noteVal = document.getElementById('inputNote').value.trim();

    // เติมข้อมูลลงตั๋วนัด
    document.getElementById('ticketDate').textContent = dateVal; // 25/10/2026
    document.getElementById('ticketTime').textContent = `${timeVal} น.`;
    document.getElementById('ticketLocation').textContent = locationVal || 'สถานที่นัดหมายของเรา';

    const noteRow = document.getElementById('ticketNoteRow');
    if (noteVal) {
        document.getElementById('ticketNote').textContent = `"${noteVal}"`;
        noteRow.classList.remove('hidden');
    } else {
        noteRow.classList.add('hidden');
    }

    // สลับไปยังหน้าตั๋วนัดสรุป (Step 2 -> Step 3)
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

// คัดลอกข้อความสรุปนัดหมายไปส่งแชท
function copySummaryText() {
    const date = document.getElementById('ticketDate').textContent;
    const time = document.getElementById('ticketTime').textContent;
    const location = document.getElementById('ticketLocation').textContent;
    const note = document.getElementById('ticketNote').textContent;

    let summary = `🌕 นัดลอยกระทงของเราสองคน ✨\n📅 วันที่: ${date}\n⏰ เวลา: ${time}\n📍 สถานที่: ${location}`;
    if (note && note !== '-') {
        summary += `\n💬 Note: ${note}`;
    }
    summary += `\n\nเจอกันน้า! 💕🪷`;

    const tempInput = document.createElement('textarea');
    tempInput.value = summary;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    alert('คัดลอกข้อความสรุปนัดหมายเรียบร้อยแล้ว!');
}