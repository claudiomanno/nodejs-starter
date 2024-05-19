//--web true
//--kind nodejs:default
const http = require('http');
const os = require('os');

const path = require('path');
const fs = require('fs').promises;

const server = http.createServer((req, res) => {

    main({name: 'Claudio'}).then(result => {
        if (result) {
            console.log(result.body);
            res.writeHead(200, { 'Content-Type': 'application/json' }); //'text/html'
            // res.end('server dentro action eseguo <br>debug e leggo directory! <br> ' + "<b>" + result.body + "</b>");
            res.end(result.body);
        }
    });
});



const PORT = 3000;
const HOST = '0.0.0.0';
server.listen(PORT,HOST, () => {
    console.log(`Server in ascolto su ${HOST}:${PORT}`);
    const networkInterfaces = os.networkInterfaces();
    Object.keys(networkInterfaces).forEach((interfaceName) => {
        networkInterfaces[interfaceName].forEach((interface) => {
            if (interface.family === 'IPv4' && !interface.internal) {
                console.log(`Indirizzo IP di ascolto: ${interface.address}`);
            }
        }); 
    });
     
});


async function main(args) {
    
    let name = args.name || "world";
    console.log("AA");

    try {
        //const contents = await listDirectoryContents();    
        const contents = await listVirtualEnvContents()   
        console.log("contenuto cartella: ",contents);

        return { "body": JSON.stringify(contents) }
    } catch (err) {
        console.error('Errore:', err);
        return { "body": "Si è verificato un errore: " + err.message };
    }
}

async function listVirtualEnvContents() {
    // Assicurati che il percorso sia corretto e esista
    const virtualEnvPath = path.resolve(__dirname, '../../../../etc');//usr/local/bin --'../../../../../../etc'

    try {
        const files = await fs.readdir(virtualEnvPath);
        const directoryContents = await Promise.all(files.map(async (file) => {
            const filePath = path.join(virtualEnvPath, file);
            try {
                const fileInfo = await fs.stat(filePath);
                return {
                    nome: file,
                    tipo: fileInfo.isDirectory() ? 'Cartella' : 'File'
                };
            } catch (err) {
                console.error(`Errore durante l'accesso al file ${file}:`, err);
                return null; // o gestisci l'errore come preferisci
            }
        }));

        // Filtra gli elementi null causati da eventuali errori
        //return directoryContents.filter(Boolean);
        const directoryContents1 = directoryContents.filter(Boolean);
        directoryContents1.sort((a, b) => {
            if (a.tipo === 'Cartella' && b.tipo === 'File') {
                return -1;
            }
            if (a.tipo === 'File' && b.tipo === 'Cartella') {
                return 1;
            }
            return a.nome.localeCompare(b.nome); // Ordina alfabeticamente per nome
        });

        console.log(directoryContents1);

        return directoryContents1;
    } catch (err) {
        console.error('Errore durante la lettura della directory:', err);
        return []; // Restituisce un array vuoto in caso di errore
    }
}

// async function listVirtualEnvContents() {
//     const virtualEnvPath = path.join('../../../../'); // Percorso alla cartella virtualenv

//     try {
//         const files = await fs.readdir(virtualEnvPath);
//         const directoryContents = await Promise.all(files.map(async (file) => {
//             const filePath = path.join(virtualEnvPath, file);
//             const fileInfo = await fs.stat(filePath);
//             return {
//                 nome: file,
//                 tipo: fileInfo.isDirectory() ? 'Cartella' : 'File'
//             };
//         }));

//         console.log(directoryContents);
//         return directoryContents;
//     } catch (err) {
//         console.error('Errore:', err);
//         throw err; // Gestisci l'errore come preferisci
//     }
// }

// listVirtualEnvContents().then(contents => {
//     // Qui puoi fare qualcosa con i contenuti, ad esempio inviarli come risposta HTTP
// });


async function listDirectoryContents() {
    const webDirectory = path.join(process.cwd()); // Aggiungi il percorso della cartella 'web'

    try {
        await fs.access(webDirectory, fs.constants.R_OK);
        console.log('Hai i permessi di lettura nella directory web');

        const files = await fs.readdir(webDirectory);
        console.log('Contenuto della directory web:');

        let directoryContents = [];

        for (const file of files) {
            const fileInfo = await fs.stat(path.join(webDirectory, file));
            directoryContents.push({
                nome: file,
                tipo: fileInfo.isDirectory() ? 'Cartella' : 'File'
            });
        }

        return directoryContents;

    } catch (err) {
        console.error('Errore:', err);
        throw err;
    }
}

async function listDirectoryContentsex() {
    try {
        await fs.access(process.cwd(), fs.constants.R_OK); //'./web'
        //console.log("AA1");
        console.log('Hai i permessi di lettura nella directory corrente');

        const files = await fs.readdir(process.cwd()); //'./web'
        //console.log("AA2");
        console.log('Contenuto della directory:');

        let directoryContents = [];

        for (const file of files) {
            const fileInfo = await fs.stat(`${process.cwd()}/${file}`);//`./web/${file}`   
            directoryContents.push({
                nome: file,
                tipo: fileInfo.isDirectory() ? 'Cartella' : 'File'
            });
        }

        //console.log(directoryContents);
        return directoryContents;

    } catch (err) {
        console.error('Errore:', err);
        throw err; // propago l'eccezione e il main la gestisce
    }
}


