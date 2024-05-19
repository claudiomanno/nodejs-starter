//--web true
//--kind nodejs:default
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
// const express = require('express');
// const app = express();


try {
    process.chdir('../../../../');
   // process.chdir('workspaces');
    console.log(`Nuova directory di lavoro: ${process.cwd()}`);
} catch (err) {
    console.error(`Errore nel cambiare directory: ${err}`);
}

// Verifica i permessi di lettura della directory corrente
fs.access(process.cwd(), fs.constants.R_OK, (err) => {
    if (err) {
        console.error('Non hai i permessi di lettura nella directory corrente');
    } else {
        console.log('Hai i permessi di lettura nella directory correntecccccccccccc');
        // fs.readdir(process.cwd(), (err, files) => {
        //     if (err) {
        //         console.error('Errore nella lettura della directory:', err);
        //         return;
        //     }
        //     console.log('Contenuto della directory:', files);
        // });
        fs.readdir(process.cwd(), (err, files) => {
            if (err) {
                console.error('Errore nella lettura della directory:', err);
                return 'Errore nella lettura della directory';
            }
        
            // Mappa i file e le directory nella directoryPath
            const fileData = files.map(file => {
                const filePath = path.join(process.cwd(), file);
                console.log("filePath: ", filePath);
                const fileType = fs.statSync(filePath).isDirectory() ? 'directory' : 'file';
                console.log("fileType: ", fileType);
                if (fileType === 'directory') {
                    // Se è una directory, ottieni il contenuto ricorsivamente
                    const directoryContent = getDirectoryContent(filePath);
                    return { name: file, type: fileType, content: directoryContent };
                } else {
                    // Se è un file, restituisci solo il suo nome e il tipo
                    return { name: file, type: fileType };
                }
            });

        
           
            console.log("fileData: ",fileData);
        });
        function getDirectoryContent(directoryPath) {
            const files = fs.readdirSync(directoryPath);
            return files.map(file => {
                const filePath = path.join(directoryPath, file);
                const fileType = fs.statSync(filePath).isDirectory() ? 'directory' : 'file';
                
                if (fileType === 'directory') {                 
                    return { name: file, type: fileType, content: getDirectoryContent(filePath) };
                } else {                
                    return { name: file, type: fileType };
                }
            });
        }
    }
});


// try {
//     process.chdir('../../../../');
//     console.log(`Nuova directory di lavoro: ${process.cwd()}`);
// } catch (err) {
//     console.error(`Errore nel cambiare directory: ${err}`);
// }

//  const path1 = '../workspaces';  
// //console.log("path: ",path);

// // Verifica i permessi di lettura
// fs.access(path1, fs.constants.R_OK, (err) => {
//     if (err) {
//         console.log('Non hai i permessi di lettura');
//     } else {
//         console.log('Hai i permessi di lettura');
//     }
// });

// // Ottiene informazioni sui permessi utilizzando fs.stat()
// fs.stat(path1, (err, stats) => {
//     if (err) {
//         console.log('Errore:', err);
//     } else {
//         console.log(`Permessi: ${stats.mode.toString(8)}`); // Stampa i permessi in formato ottale
//     }
// });


// exec('pwd', (error, stdout, stderr) => {
//     if (error) {
//         console.log(`Errore durante l'esecuzione del comando: ${error.message}`);
//         return;
//     }
//     if (stderr) {
//         console.log(`Errore: ${stderr}`);
//         return;
//     }
//     console.log("cmd ls -l: ",stdout);
// });

 function main(args) {
//     let name = args.name || "world"
//     console.log("exec: ",exec)
//     // app.listen(3000, () => {
//     //     console.log(`Server avviato su `);
//     // });
//     async function getDirectory(directoryPath = "../workspaces") {
//         try {
//             const files = await fs.readdir(directoryPath);
//             const fileData = await Promise.all(files.map(async (file) => {
//                 const filePath = path.join(directoryPath, file);
//                 const stats = await fs.stat(filePath);
//                 const fileType = stats.isDirectory() ? 'directory' : 'file';
    
//                 if (fileType === 'directory') {
//                     // Se è una directory, ottieni il contenuto ricorsivamente
//                     const directoryContent = await getDirectory(filePath);
//                     return { name: file, type: fileType, content: directoryContent };
//                 } else {
//                     // Se è un file, restituisci solo il suo nome e il tipo
//                     return { name: file, type: fileType };
//                 }
//             }));
    
//             return fileData;
//         } catch (err) {
//             console.error('Errore nella lettura della directory:', err);
//             throw new Error('Errore nella lettura della directory');
//         }
//     }


    

    
    // async function getDirectory(directoryPath = "/workspaces/nodejs-starter/packages/cld/pippo") {
    //     try {
    //         const files = await fs.readdir(directoryPath);
    //         // Qui puoi processare i file come necessario
    //         console.log("file: ",files);
    //     } catch (err) {
    //         console.error('Errore nella lettura della directory:', err);
    //     }
    // }
    
    // getDirectory().then(fileData => {
    //     console.log(fileData);
    // }).catch(err => {
    //     console.error(err);
    // });
    //data = JSON.stringify(data);
    console.log("fime: ");
    return { "body": "cialdo" }
  }

// const express = require('express');
// const fs = require('fs');
// const path = require('path');
// const bodyParser = require('body-parser');
// const bodyParser = require('body-parser');
// require('dotenv').config();
// const app = express();


// app.use(bodyParser.urlencoded({extended:false}));
// app.use(bodyParser.json());

// app.use(express.static(path.join(__dirname, 'htmll')));
// //app.use('/stylesheets/fontawesome', express.static(__dirname + '/node_modules/@fortawesome/fontawesome-free/'));

// app.get('/', (req, res) => {
//     console.log("app.get");
//     if (req.url.indexOf("/external/") === 0 || req.url.indexOf("/css/") === 0 || req.url.indexOf("/media/") === 0
//             || req.url.indexOf("/js/") === 0 || req.url.indexOf(".js") === 0 || req.url.indexOf(".css") === 0
//             || req.url.indexOf(".map") === 0) {
//             res.setHeader("Cache-Control", "public, max-age=2592000");
//             res.setHeader("Expires", new Date(Date.now() + 2592000000).toUTCString());
//     }

//     res.sendFile(path.join(__dirname, 'html', 'index.html'));
// });

// function main(args) {
//     console.log("test");
//     let nome = args.nome || "sconosciuto"
//     let cognome = args.cognome || "sconosciuto"
//     const data = getDirectory();

//     return { "body": "Ciao, "+nome +" "+data}

//     function getDirectory(){
//         fs.readdir(directoryPath, (err, files) => {
//             if (err) {
//                 console.error('Errore nella lettura della directory:', err);
//                 return res.status(500).send('Errore nella lettura della directory');
//             }
        
//             // Mappa i file e le directory nella directoryPath
//             const fileData = files.map(file => {
//                 const filePath = path.join(directoryPath, file);
//                 const fileType = fs.statSync(filePath).isDirectory() ? 'directory' : 'file';
        
//                 if (fileType === 'directory') {
//                     // Se è una directory, ottieni il contenuto ricorsivamente
//                     const directoryContent = getDirectoryContent(filePath);
//                     return { name: file, type: fileType, content: directoryContent };
//                 } else {
//                     // Se è un file, restituisci solo il suo nome e il tipo
//                     return { name: file, type: fileType };
//                 }
//             });
        
           
//             res.json(fileData);
//         });
//     }

// }

 

