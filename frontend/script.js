const ENDERECO_WS = "wss://unsickened-azucena-unpunctilious.ngrok-free.dev/?from=site"

let conexaoWs

function conectar() {
  conexaoWs = new WebSocket(ENDERECO_WS)

  conexaoWs.onopen = () => console.log("Conectado ao backend")
  conexaoWs.onerror = () => console.log("Erro na conexão WebSocket")
  conexaoWs.onclose = () => {
    console.log("Conexão encerrada, tentando reconectar...")
    setTimeout(conectar, 1200)
  }

  conexaoWs.onmessage = (evento) => {
    console.log("Mensagem recebida:", evento.data)
  }
}

function enviarObjetoJson(objeto) {
  if (!conexaoWs || conexaoWs.readyState !== WebSocket.OPEN) {
    console.warn("Conexão WebSocket não está aberta.")
    return
  }
  const mensagem = JSON.stringify(objeto)
  conexaoWs.send(mensagem)
  console.log("Enviado:", mensagem)
}


function confirmarMedicamento1() {
  const nome = document.getElementById('nome1').value || '-'
  const frequencia = document.getElementById('frequencia1').value || '-'

  if (frequencia === '-') {
    alert("Digite a frequência do medicamento 1 antes de confirmar.")
    return
  }


  document.getElementById('med1-nome').innerHTML = `<b>${nome}</b>`
  document.getElementById('med1-frequencia').innerHTML = `<b>${frequencia}</b>`

  
  enviarObjetoJson({ medicamento: 1, nome: nome, frequencia: frequencia })
}


function confirmarMedicamento2() {
  const nome = document.getElementById('nome2').value || '-'
  const frequencia = document.getElementById('frequencia2').value || '-'

  if (frequencia === '-') {
    alert("Digite a frequência do medicamento 2 antes de confirmar.")
    return
  }

 
  document.getElementById('med2-nome').innerHTML = `<b>${nome}</b>`
  document.getElementById('med2-frequencia').innerHTML = `<b>${frequencia}</b>`

  
  enviarObjetoJson({ medicamento: 2, nome: nome, frequencia: frequencia })
}

conectar()
