const scriptURL = 'https://script.google.com/macros/s/AKfycbyTJPqmCfIASK1rSeDFVW0g4LaJzBBxwCXioE_PylvdbDv69ABoK6SBrRZFZIgacj9seQ/exec';

// Função para mostrar/esconder campo de telefone
function togglePhone(show) {
    const phoneField = document.getElementById('phoneField');
    const phoneInput = phoneField.querySelector('input');
    
    if (show) {
        phoneField.style.display = 'block';
        phoneInput.setAttribute('required', 'required');
    } else {
        phoneField.style.display = 'none';
        phoneInput.removeAttribute('required');
        phoneInput.value = ''; // limpa o campo
    }
}

// Escuta os radios
document.querySelectorAll('input[name="attendance"]').forEach(radio => {
    radio.addEventListener('change', function() {
        togglePhone(this.value === 'sim');
    });
});

// Submissão do formulário
const form = document.getElementById('rsvpForm');
form.addEventListener('submit', function(event) {
    event.preventDefault();

    const attendance = document.querySelector('input[name="attendance"]:checked').value;
    const name = document.querySelector('input[name="name"]').value.trim();
    const phone = attendance === 'sim' ? document.querySelector('input[name="phone"]').value.trim() : '';

    // Validação extra (nome sempre obrigatório)
    if (!name) {
        Swal.fire({
            icon: 'warning',
            title: 'Nome obrigatório',
            text: 'Por favor, preencha seu nome completo.',
            confirmButtonText: 'OK'
        });
        return;
    }

    // Validação de telefone se "sim"
    if (attendance === 'sim' && !phone) {
        Swal.fire({
            icon: 'warning',
            title: 'Telefone necessário',
            text: 'Se você vai, precisamos do seu telefone para contato.',
            confirmButtonText: 'OK'
        });
        return;
    }

    const data = { attendance, name, phone };

    // SUBSTITUA ESTA URL PELO SEU GOOGLE APPS SCRIPT
    const scriptURL = 'https://script.google.com/macros/s/SEU_ID_AQUI/exec';

    fetch(scriptURL, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'no-cors' // Importante para Google Apps Script
    })
    .then(() => {
        Swal.fire({
            icon: 'success',
            title: 'Confirmado!',
            text: attendance === 'sim' 
                ? 'Obrigada por confirmar! Te esperamos na festa ❤️' 
                : 'Entendemos, sentiremos sua falta! 💔',
            confirmButtonText: 'OK',
            confirmButtonColor: '#c55d80'
        }).then(() => {
            form.reset();
            togglePhone(false); // esconde telefone após envio
        });
    })
    .catch(error => {
        console.error('Erro:', error);
        Swal.fire({
            icon: 'error',
            title: 'Erro ao enviar',
            text: 'Tente novamente ou entre em contato por WhatsApp.',
            confirmButtonText: 'OK'
        });
    });
});