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

    // Substitua pela URL do seu Google Apps Script
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
        Swal.fire({
            icon: 'success',
            title: 'Sucesso!',
            text: 'Confirmação enviada com sucesso!',
            confirmButtonText: 'OK'
        }).then(() => {
            form.reset();
            togglePhone(false);
        });
    })
    .catch(error => {
        Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: 'Erro ao enviar: ' + error.message,
            confirmButtonText: 'Tentar novamente'
        });
    });

    function doPost(e) {
        var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
        var data = JSON.parse(e.postData.contents);
        
        sheet.appendRow([
            data.attendance === 'sim' ? 'Sim' : 'Não',
            data.name,
            data.phone || ''
        ]);
        
        return ContentService.createTextOutput('Sucesso').setMimeType(ContentService.MimeType.TEXT);
        }
});