//--web true
//--kind nodejs:default

function main(args) {
    let nome = args.nome || "sconosciuto"
    let cognome = args.cognome || "sconosciuto"
    return { "body": ""+nome +" "+cognome}
  }
  module.exports = main