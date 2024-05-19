async function tipoFile(fileExtension, res, fileName, filePath, imageDirectory) {
    switch (fileExtension) {
        case 'pdf':
            app.use('/files', express.static(imageDirectory));
            const pdfUrl = `http://localhost:3000/files/${fileName}`;
            return res.json({ type: 'pdf', url: pdfUrl });
        case 'jpg':
        case 'png':
            app.use('/images', express.static(imageDirectory));
            const imageUrl = `http://localhost:3000/images/${fileName}`;
            return res.json({ type: 'image', url: imageUrl });
        case 'txt':
            try {
                const fileContent = await getFile(filePath);
                return res.json({ type: 'txt', url: fileContent });
            } catch (error) {
                console.error('Errore durante la gestione del file di testo:', error);
                return res.status(500).json({ error: 'Errore durante la lettura del file di testo' });
            }
        case 'opus':
            app.use('/audio', express.static(imageDirectory));
            const audioUrl = `http://localhost:3000/audio/${fileName}`;
            return res.json({ type: 'audio', url: audioUrl });
        case 'mp4':
            app.use('/videos', express.static(imageDirectory));
            const videoUrl = `http://localhost:3000/videos/${fileName}`;
            return res.json({ type: 'video', url: videoUrl });
        default:
            return res.status(400).json({ error: 'Tipo di file non supportato' });
    }
}

//

// import json
// from http.server import BaseHTTPRequestHandler, HTTPServer

// class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):
//     def do_GET(self):
//         self.send_response(200)
//         self.send_header('Content-type', 'text/html')
//         self.end_headers()
//         valore_risposta = funzione_da_chiamare()
        
//         data = main("Claudio")
        
//         valore_main = json.dumps(data)
//         message = "Ciao Nuvolaris! Test debug action con l'aggiunta di un server web in Python. " + valore_risposta + " valore: " + valore_main
//         self.wfile.write(bytes(message, "utf8"))

// def funzione_da_chiamare():
//     valore_da_restituire = "Questo è il valore restituito dalla funzione."
//     return valore_da_restituire    

// def main(args):
//     #nome = args.get('nome', 'non esiste')

//     if 'nome' in args:
        
//         nome = args['nome']
//     else:
        
//         nome = args

//     data = {
//         "services": [
//             {
//                 "name": "Test",
//                 "url": "cld/test",
//                  "nome" :nome
//             }
            
//         ]
//     }
//     print(data)
//     return {"body": data}

// if name == "main":
//     server_address = ('127.0.0.1', 8080)
//     httpd = HTTPServer(server_address, SimpleHTTPRequestHandler)
//     print("Server in esecuzione su http://127.0.0.1:8080")
//     httpd.serve_forever()