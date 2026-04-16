document.addEventListener('DOMContentLoaded', () => {
    const timestampElement = document.getElementById('timestamp');
    const now = new Date();
    timestampElement.textContent = now.toLocaleString('pt-BR');

    const healthBtn = document.getElementById('health-btn');
    
    healthBtn.addEventListener('click', () => {
        const originalText = healthBtn.textContent;
        healthBtn.textContent = 'Verificando serviços...';
        healthBtn.disabled = true;

        fetch('/health')
            .then(response => response.json())
            .then(data => {
                setTimeout(() => {
                    const containerDisplay = document.querySelector('.container-id');
                    if (containerDisplay) {
                        containerDisplay.textContent = data.container;
                    }
                    
                    alert(`Health Check OK! \n\nContainer: ${data.container}\nStatus: ${data.status}\nUptime: ${data.uptime}s`);
                    healthBtn.textContent = originalText;
                    healthBtn.disabled = false;
                }, 500);
            })
            .catch(err => {
                alert('Erro de conexão com o servidor!');
                healthBtn.textContent = originalText;
                healthBtn.disabled = false;
            });
    });
});