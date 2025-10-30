function togglePhone(show) {
            document.getElementById('phoneField').style.display = show ? 'block' : 'none';
        }

        const form = document.getElementById('rsvpForm');
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(form);
            const data = {
                attendance: formData.get('attendance'),
                name: formData.get('name'),
                phone: formData.get('attendance') === 'sim' ? formData.get('phone') : ''
            };

            // Substitua pela URL do seu Google Apps Script aqui
            const scriptURL = 'SUA_URL_DO_APPS_SCRIPT_AQUI';

            fetch(scriptURL, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.text())
            .then(result => {
                alert('Confirmação enviada com sucesso!');
                form.reset();
                togglePhone(false);
            })
            .catch(error => {
                alert('Erro ao enviar: ' + error);
            });
        });