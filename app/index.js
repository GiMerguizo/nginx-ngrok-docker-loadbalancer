const http = require('http');
const fs = require('fs');
const os = require('os');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        fs.readFile(path.join(__dirname, 'index.html'), 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                return res.end('Erro ao carregar a pagina.');
            }
            
            // Pega o hostname dinamicamente
            const hostname = os.hostname();
            
            const html = data.replace('{{HOSTNAME}}', hostname);
            
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(html);
        });
    } 
    else if (req.url === '/health') {
        const healthcheck = {
            uptime: Math.round(process.uptime()),
            status: 'UP',
            container: os.hostname(),
            timestamp: Date.now()
        };
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(healthcheck));
    }
    // Métricas simples para Prometheus
    else if (req.url === '/metrics') {
        const uptime = process.uptime();
        const metrics = [
            '# HELP node_uptime_seconds Uptime do container em segundos.',
            '# TYPE node_uptime_seconds gauge',
            `node_uptime_seconds{container="${os.hostname()}"} ${uptime}`,
            '# HELP node_status Status do container (1 = UP).',
            '# TYPE node_status gauge',
            `node_status{container="${os.hostname()}"} 1`
        ].join('\n');
        
        res.writeHead(200, { 'Content-Type': 'text/plain; version=0.0.4' });
        res.end(metrics + '\n');
    }
    else if (req.url.startsWith('/assets/')) {
        const filePath = path.join(__dirname, req.url);
        
        const extname = String(path.extname(filePath)).toLowerCase();
        const mimeTypes = {
            '.css': 'text/css',
            '.js': 'text/javascript'
        };
        const contentType = mimeTypes[extname] || 'application/octet-stream';

        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Arquivo não encontrado');
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
            }
        });
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Página não encontrada');
    }
});

server.listen(PORT, () => {
    console.log(`🚀 Aplicação rodando na porta ${PORT}. Container ID: ${os.hostname()}`);
});