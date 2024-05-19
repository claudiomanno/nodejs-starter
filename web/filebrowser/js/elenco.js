let dettaglioDiv;
let fileName;
const  directoryName="F:/jspage"; // directory iniziale
let alertMsg;
let alert1;


window.onload= function(){
    alertMsg   = getDiv('alert');
    alertMsg.style.display   = "none";

    alert1   = getDiv('alert1');
    dettaglioDiv = getDiv('dettaglio');
    getListaDirectory();
}

function togglePanels() {
    var panelA = document.getElementById('panelA');
    var panelB = document.getElementById('panelB');
    var panelC = document.getElementById('panelC');

    if (panelA.style.display !== 'none' && panelB.style.display !== 'none') {
        panelA.style.display = 'none';
        panelB.style.display = 'none';
        panelC.style.height = '100vh';
        panelC.style.position = 'absolute';  
        panelC.style.top = '0';  
        document.getElementById("toggleButton").innerHTML="Ripristina pannelli";
    } else {
        panelA.style.display = 'block';
        panelB.style.display = 'block';
        panelC.style.height = '50vh';
        panelC.style.position = 'static';  
        document.getElementById("toggleButton").innerHTML="Apri Panello";        
    }
}

const getListaDirectory = ()=>{

   // console.log("directoryName: ", directoryName) 
    // fetch(`/api/filename?directory=${encodeURIComponent(directoryName)}`)
    fetch(`http://127.0.0.1:8080/api/my/cld/test?directory=${encodeURIComponent(directoryName)}`)
        .then(response => response.json())
        .then(data => {
         creaTable(data);        
    }).catch(error => {
        console.error('Si è verificato un errore:', error);
        setAlert("Errore: "+error.message, true)
    });


    function creaTable1(data) {       
        
        setAlert("Success!!", false);
        const tableBody = getDiv('contenutolist'); 

        data.forEach(file => {
            const row = document.createElement('tr'); 

            const nameCell = document.createElement('td');
                  nameCell.textContent = file.name; 
            const typeCell = document.createElement('td');
                  typeCell.textContent = file.type; 

            
            const buttonCell = document.createElement('td');
            const button = document.createElement('button');
                  button.textContent = 'Dettaglio'; 
                  button.classList.add('btn-custom'); 
                  button.addEventListener('click', () => {
                      listaFile(file.name);
                  });

            
            buttonCell.appendChild(button);
            row.appendChild(nameCell);
            row.appendChild(typeCell);
            row.appendChild(buttonCell);
            tableBody.appendChild(row);
    
        });
    }
    function creaTable(data) {
        setAlert("Success!!", false);
        const tableBody = getDiv('contenutolist'); 
        tableBody.innerHTML = ''; // Pulisce il contenuto precedente
    
        data.forEach(file => {
            const row = document.createElement('tr'); 
    
            const nameCell = document.createElement('td');
                  nameCell.textContent = file.nome; // Modificato da 'name' a 'nome'
            const typeCell = document.createElement('td');
                  typeCell.textContent = file.tipo; // Modificato da 'type' a 'tipo'
    
            const buttonCell = document.createElement('td');
            const button = document.createElement('button');
                  button.textContent = 'Dettaglio'; 
                  button.classList.add('btn-custom'); 
                  button.addEventListener('click', () => {
                      listaFile(file.nome); // Modificato da 'name' a 'nome'
                  });
    
            buttonCell.appendChild(button);
            row.appendChild(nameCell);
            row.appendChild(typeCell);
            row.appendChild(buttonCell);
            tableBody.appendChild(row);
        });
    }
};

function listaFile(fileName) {
   // console.log('directoryName+"/"+fileNameaaaa : ', directoryName+"/"+fileName);
    
    const tbody = getDiv('contenuto');
          tbody.innerHTML = ''; 
    
        dettaglioDiv.innerHTML="";    
        const directoryPath = directoryName;// + "/" + fileName;  

    fetch(`/api/contenuto?name=${encodeURIComponent(directoryPath)}&sottoDirectory=${encodeURIComponent(fileName)}`)                                  
        .then(response => response.json())
        .then(files => {
            setAlert("Success!!", false);
            files.forEach(file => {
                    const row = document.createElement('tr');
                    const nameCell = document.createElement('td');
                        nameCell.textContent = file.name;

                    const typeCell = document.createElement('td');
                        typeCell.textContent = file.type;

                    const buttonCell = document.createElement('td');
                        buttonCell.classList.add('button-cell');

                    const button = document.createElement('button');
                        button.classList.add("btn-custom");
                        //buttonCell.className = 'button-cell';
                        button.textContent = 'Dettaglio';

                        button.addEventListener('click', () => {
                          //  if(file.type !== "directory"){
                                callDettaglio(file.name);
                            // }else{
                            //     setAlert("Trattasi di "+file.type +" normalizzare ", true);
                            // }                            
                        });

                    row.appendChild(nameCell);
                    row.appendChild(typeCell);
                    
                    buttonCell.appendChild(button);
                    row.appendChild(buttonCell);
                    tbody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Errore durante il recupero dei dati:', error);
            setAlert("Errore durante il recupero dei dati:!! "+err.message, true);
        });

};

function callDettaglio(fileName) {

    const imageDirectory="/jspage/css/"; 

    fetch(`/api/dettaglio?fileName=${encodeURIComponent(fileName)}&imageDirectory=${encodeURIComponent(imageDirectory)}`)
        .then(response => response.json())
        .then(data => {        
            dettaglioDiv.innerHTML="";

            switch(data.type){
                case 'pdf':
                    const pdfUrl = data.url; 
                    let iframeElement = document.createElement('iframe');
                        iframeElement.src = pdfUrl;
                        iframeElement.style.width = '100%';
                        iframeElement.style.overflow = 'auto';
                    let altezzaIframe =600 * 20; // #pagepdf
                        iframeElement.style.height = altezzaIframe + 'px';
                    dettaglioDiv.appendChild(iframeElement);
                break;
                case 'image':
                    const imageUrl = data.url;
                    let imageElement = document.createElement('img');
                        imageElement.src = imageUrl;
                        imageElement.alt = 'Image';
                        imageElement.style.display = 'block';
                        imageElement.style.margin = '0 auto';
                        imageElement.style.marginTop = '10px;'
                    dettaglioDiv.appendChild(imageElement);
                break;
                case 'audio':
                    let audioElement = document.createElement('audio');
                        audioElement.setAttribute('controls', 'controls');
                        audioElement.style.display = 'block';
                        audioElement.style.margin = '0 auto';
                        audioElement.style.marginTop ='10px';

                    let sourceElement = document.createElement('source');
                        sourceElement.src = data.url;
                        sourceElement.type = 'audio/mpeg';
                    audioElement.appendChild(sourceElement);
                    dettaglioDiv.appendChild(audioElement);
                    audioElement.play();
                break;
                case 'video':
                    const videoUrl = data.url; 
                    let videoElement = document.createElement('video');
                        videoElement.setAttribute('controls', 'controls');
                        videoElement.setAttribute('autoplay', 'autoplay'); 
                        videoElement.style.display = 'block';
                        videoElement.style.margin = '0 auto';
                        videoElement.style.marginTop = '10px';

                    let sourceElement1 = document.createElement('source');
                        sourceElement1.src = videoUrl;
                        sourceElement1.type = 'video/mp4'; // Sostituisci con il tipo di file video appropriato
                    videoElement.appendChild(sourceElement1);
                    dettaglioDiv.appendChild(videoElement);
                break;
                case 'txt':
                    dettaglioDiv.innerHTML=(`<pre style="margin-left: 10px; font-size: 22px;">${data.url}</pre>`);
                break;
                default:
                    setAlert("Errore: "+data.error,true);                    
            }
        })
        .catch(error => {
            console.error('Errore durante il recupero dei dati:', error);
            setAlert("Errore durante il recupero dei dati:!! "+err.message, true);
        });
}

function setAlert(value, err){
    const alertMsg = getDiv('alert');
    const alert1   = getDiv('alert1');
    
    alertMsg.style.display="";
    if(err){
        alertMsg.style.backgroundColor = '#dc3545';
    }else{
        alertMsg.style.backgroundColor = '8cb399'; 
    } 
    
    alert1.innerHTML=value;
    setTimeout(function(){
        alertMsg.style.display="none";
    }, 3000);
}
function getDiv(id){
    return document.getElementById(id);
}

