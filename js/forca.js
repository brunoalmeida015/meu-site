let jogarNovamente = true;
let tentativas = 6;
let listaDinamica = [];
let palavraSecretaCategoria;
let palavraSecretaSorteada;
let palavras = [];
let jogoAutomatico = true;

carregaListaAutomatica();

criarPalavraSecreta();
function criarPalavraSecreta(){
    const indexPalavra = parseInt(Math.random() * palavras.length)
    
    palavraSecretaSorteada = palavras[indexPalavra].nome;
    palavraSecretaCategoria = palavras[indexPalavra].categoria;

    // console.log(palavraSecretaSorteada);
}

montarPalavraNaTela();
function montarPalavraNaTela(){
    const categoria = document.getElementById("categoria");
    


    const palavraTela = document.getElementById("palavra-secreta");
    palavraTela.innerHTML = "";
    
    for(i = 0; i < palavraSecretaSorteada.length; i++){  
        if(listaDinamica[i] == undefined){
            if (palavraSecretaSorteada[i] == " ") {
                listaDinamica[i] = " ";
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letrasEspaco'>" + listaDinamica[i] + "</div>"
            }
            else{
                listaDinamica[i] = "&nbsp;"
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letras'>" + listaDinamica[i] + "</div>"
            }     
        }
        else{
            if (palavraSecretaSorteada[i] == " ") {
                listaDinamica[i] = " ";
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letrasEspaco'>" + listaDinamica[i] + "</div>"
            }
            else{
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letras'>" + listaDinamica[i] + "</div>"
            }    
        }
    }   
}

function verificaLetraEscolhida(letra){
    document.getElementById("tecla-" + letra).disabled = true;
    if(tentativas > 0)
    {
        mudarStyleLetra("tecla-" + letra, false);
        comparalistas(letra);
        montarPalavraNaTela();
    }    
}

function mudarStyleLetra(tecla, condicao){
    if(condicao == false)
    {
        document.getElementById(tecla).style.background = "#C71585";
        document.getElementById(tecla).style.color = "#ffffff";
    }
    else{
        document.getElementById(tecla).style.background = "#008000";
        document.getElementById(tecla).style.color = "#ffffff";
    }

    
}
// Adicione um evento de escuta de teclado
document.addEventListener('keydown', function(event) {
    // Verifique se a tecla pressionada é uma letra
    if (/^[a-zA-Z]$/.test(event.key)) {
        // Atualize o jogo com a letra pressionada
        verificaLetraEscolhida(event.key.toUpperCase());
    }
});

function comparalistas(letra){
    const pos = palavraSecretaSorteada.indexOf(letra)
    if(pos < 0){
        tentativas--
        carregaImagemForca();

        if(tentativas == 0){
            abreModal("OPS!", "Não foi dessa vez ... A palavra secreta era <br>" + palavraSecretaSorteada);
            piscarBotaoJogarNovamente(true);
        }
    }
    
    

else{
        mudarStyleLetra("tecla-" + letra, true);
        for(i = 0; i < palavraSecretaSorteada.length; i++){
            if(palavraSecretaSorteada[i] == letra){
                listaDinamica[i] = letra;
            }
        }
    }
    
    let vitoria = true;
    for(i = 0; i < palavraSecretaSorteada.length; i++){
        if(palavraSecretaSorteada[i] != listaDinamica[i]){
            vitoria = false;
        }
    }

    if(vitoria == true)
    {
        abreModal("PARABÉNS!", "Você realmente entende da história da computação!! ");
        tentativas = 0;
        piscarBotaoJogarNovamente(true);
    }
}

async function atraso(tempo){
    return new Promise(x => setTimeout(x, tempo))     
}

function carregaImagemForca(){
    switch(tentativas){
        case 5:
            document.getElementById("imagem").style.background  = "url('./imagem/fora01.png')";
            break;
        case 4:
            document.getElementById("imagem").style.background  = "url('./imagem/fora02.png')";
            break;
        case 3:
            document.getElementById("imagem").style.background  = "url('./imagem/forc03.png')";
            break;
        case 2:
            document.getElementById("imagem").style.background  = "url('./imagem/forc04.png')";
            break;
        case 1:
            document.getElementById("imagem").style.background  = "url('./imagem/fora05.png')";
            break;
        case 0:
            document.getElementById("imagem").style.background  = "url('./imagem/forsa06.png')";
            break;
        default:
            document.getElementById("imagem").style.background  = "url('./imagem/forca.png')";
            break;
    }
}

function abreModal(titulo, mensagem){
    let modalTitulo = document.getElementById("exampleModalLabel");
    modalTitulo.innerText = titulo;

    let modalBody = document.getElementById("modalBody");
    modalBody.innerHTML = mensagem;

    $("#myModal").modal({
        show: true
    });
}

let bntReiniciar = document.querySelector("#btnReiniciar")
bntReiniciar.addEventListener("click", function(){
    jogarNovamente = false;
    location.reload();
});

function listaAutomatica(){ // ativa o modo manual
    if (jogoAutomatico == true) {
        document.getElementById("jogarAutomatico").innerHTML = "<i class='bx bx-play-circle'></i>"
        palavras = [];
        jogoAutomatico = false;

        document.getElementById("abreModalAddPalavra").style.display = "block";
        document.getElementById("status").innerHTML = "Modo Manual";
    }
    else if(jogoAutomatico == false){ // ativa o modo automático
        document.getElementById("jogarAutomatico").innerHTML = "<i class='bx bx-pause-circle'></i>"
        jogoAutomatico = true;

        document.getElementById("abreModalAddPalavra").style.display = "none";
        document.getElementById("status").innerHTML = "Modo Automático";
        
    }
}

const modal = document.getElementById("modal-alerta");

const btnAbreModal = document.getElementById("abreModalAddPalavra");
btnAbreModal.onclick = function(){
    modal.style.display = "block";
}

const btnFechaModal = document.getElementById("fechaModal");
btnFechaModal.onclick = function(){ 
    modal.style.display = "none";
    document.getElementById("addPalavra").value = "";
    document.getElementById("addCategoria").value = ""; 
}

window.onclick = function(){ 
    if (event.target == modal) {
        modal.style.display = "none";
        document.getElementById("addPalavra").value = "";
        document.getElementById("addCategoria").value = ""; 
    }  
}

function carregaListaAutomatica(){
    palavras = [
        (palavra001 = {
            nome: "ABACO",
            categoria: "O MAIS ANTIGO DISPOSITIVO DE CÁLCULO CONHECIDO.",
          }),
          (palavra002 = {
            nome: "OSSOS DE NAPIER",
            categoria: "CRIADO PARA MULTIPLICAÇÃO COM NÚMEROS GRANDES.",
          }),
          (palavra003 = {
            nome: "PASCALINA",
            categoria: "PRIMEIRA CALCULADORA MÊCANICA, CRIADA POR BLAISE PASCAL.",
          }),
          (palavra004 = {
            nome: "TEAR DE JACQUARD",
            categoria: "USADO NA TECELAGEM TÊXTIL FOI O PRIMEIRO DISPOSITO PRÁTICO DE PROCESSAMENTO DE INFORMAÇÕES.",
          }),
          (palavra005 = {
            nome: "MÁQUINA DAS DIFERENCAS",
            categoria: "INVENTADA POR CHARLES BABBAGE, PRECURSORA DOS COMPUTADORES.",
          }),
          (palavra006 = {
            nome: "ADA LOVELACE",
            categoria: "CONSIDERADA A PRIMEIRA PROGRAMADORA DA HISTÓRIA.",
          }),
          (palavra007 = {
            nome: "TABULADOR DE CENSO",
            categoria: "CONSTRUÍDO PARA CALCULAR O CENSO DOS EUA.",
          }),
          (palavra008 = {
            nome: "IBM",
            categoria: "EMPRESA PIONEIRA NA FABRICAÇÃO DE COMPUTADORES.",
          }),
          (palavra009 = {
            nome: "ANALISADOR DIFERENCIAL",
            categoria: "CALCULADORA ANALÓGICA QUE PODIA SER USADA PARA RESOLVER CERTAS CLASSES DE EQUAÇÕES DIFERENCIAIS.",
          }),
          (palavra010 = {
            nome: "CALCULADORA DIGITAL",
            categoria: "DISPOSITIVO DE CÁLCULO DIGITAL ELETRÔNICO.",
          }),
          (palavra011 = {
            nome: "CARTOES PERFURADOS",
            categoria: "MEIO DE ARMAZENAMENTO DE DADOS UTILIZADO ANTES DOS DISPOSITIVOS DIGITAIS.",
          }),
          (palavra012 = {
            nome: "MAQUINA DE TURING",
            categoria: "MODELO TEÓRICO DE COMPUTADOR, CONCEBIDO POR ALAN TURING.",
          }),
          (palavra013 = {
            nome: "COLOSSUS",
            categoria: "UM DOS PRIMEIROS COMPUTADORES DIGITAIS ELETRÔNICOS.",
          }),
          
          (palavra015 = {
            nome: "ENIAC",
            categoria: "PRIMEIRO COMPUTADOR ELETRÔNICO DE USO GERAL.",
          }),
          (palavra016 = {
            nome: "EDVAC",
            categoria: "SUCESSOR DO ENIAC.",
          }),
          (palavra017 = {
            nome: "VALVULA",
            categoria: "DISPOSITIVO ELETRÔNICO UTILIZADO EM COMPUTADORES PRIMITIVOS.",
          }),
          (palavra018 = {
            nome: "TRANSISTORES",
            categoria: "COMPONENTES SEMICONDUTORES UTILIZADOS EM COMPUTADORES MODERNOS.",
          }),
          (palavra019 = {
            nome: "MACINTOSH",
            categoria: "PRIMEIRO COMPUTADOR A USAR ÍCONES E MOUSE.",
          }),
          (palavra020 = {
            nome: "INTERNET",
            categoria: "REDE DE COMPUTADORES INTERCONECTADOS EM ESCALA GLOBAL.j",
          }),
          (palavra021 = {
            nome: "MICROPROCESSADORES",
            categoria: "UNIDADE CENTRAL DE PROCESSAMENTO EM COMPUTADORES.",
          }),
          (palavra022 = {
            nome: "APPLE",
            categoria: "EMPRESA FUNDADA POR STEVE WOZNIAK E STEVE JOBS. ",
          }),
          (palavra023 = {
            nome: "FORTRAN",
            categoria: "PRIMEIRA LINGUAGEM DE PROGRAMAÇÃO DE ALTO NÍVEL A SER AMPLAMENTE UTILIZADA. ",
          })
          ,
          (palavra024 = {
            nome: "MICROSOFT",
            categoria: "EMPRESA FUNDADA EM 4 DE ABRIL DE 1975 POR BILL GATES E PAUL ALLEN.",
          }),
          (palavra025 = {
            nome: "BLAISE PASCAL",
            categoria: "CRIADOR DA PRIMEIRA CALCULADORA MÊCANICA.",
          }),
          (palavra026 = {
            nome: "CHARLES BABBAGE",
            categoria: "APRESENTOU EM 1822 A MÁQUINA DIFERENCIAL.",
          }),
          (palavra027 = {
            nome: "MÁQUINA ANALÍTICA",
            categoria: "INVENTADA POR CHARLES BABBAGE, EMBORA NUNCA CONCLUÍDA FOI A PRIMEIRA MÁQUINA QUE MERECEU SER CHAMADA DE COMPUTADOR.",
          }),
          (palavra028 = {
            nome: "KONRAD ZUSE",
            categoria: "CONSTRUIU OS COMPUTADORES Z3 E Z4.",
          })
    ];
}

function adicionarPalavra(){
    let addPalavra = document.getElementById("addPalavra").value.toUpperCase();
    let addCategoria = document.getElementById("addCategoria").value.toUpperCase();

    if (isNullOrWhiteSpace(addPalavra) || isNullOrWhiteSpace(addCategoria) || addPalavra.length < 3 || addCategoria.length < 3) {
        abreModal("ATENÇÃO"," Palavra e/ou Categoria inválidos");
        return;
    }

    // Verifica se a palavra já existe na lista
    if (palavras.some(palavra => palavra.nome === addPalavra)) {
        abreModal("ATENÇÃO", "A palavra já foi adicionada anteriormente.");
        return;
    }

    let palavra = {
        nome: addPalavra,
        categoria: addCategoria
    }

    palavras.push(palavra);  
    sortear();
    
    document.getElementById("addPalavra").value = "";
    document.getElementById("addCategoria").value = "";
}


function isNullOrWhiteSpace(input){
    return !input || !input.trim();
}

function sortear(){
    if(jogoAutomatico == true){
        location.reload();  
    }
    else{
        if(palavras.length > 0){
            listaDinamica=[];
            
            // Sorteia um índice aleatório da lista de palavras
            const indexPalavra = Math.floor(Math.random() * palavras.length);
            
            // Define a palavra secreta com base no índice sorteado
            palavraSecretaSorteada = palavras[indexPalavra].nome;
            palavraSecretaCategoria = palavras[indexPalavra].categoria;
            
            montarPalavraNaTela();
            resetaTeclas();
            tentativas = 6;
            piscarBotaoJogarNovamente(false);
        }
    }
}


function resetaTeclas(){
    let teclas = document.querySelectorAll(".teclas > button")
    teclas.forEach((x) =>{
        x.style.background = "#FFFFFF";
        x.style.color = "#8B008B";
        x.disabled = false;
    });
}


async function piscarBotaoJogarNovamente(querJogar){
    if(querJogar){
        document.getElementById("jogarNovamente").style.display = "block";
    }
    else{
        document.getElementById("jogarNovamente").style.display = "none";
    }
}
// Função de inicialização para garantir que o código JavaScript seja executado após o carregamento do documento HTML
document.addEventListener('DOMContentLoaded', function() {
    // Todas as variáveis e funções aqui dentro

    // Adiciona um event listener para a tecla espaço
    document.addEventListener('keydown', function(event) {
        if (event.code === 'Space') { // Verifica se a tecla pressionada é a tecla espaço
            reiniciarJogo(); // Chama a função para reiniciar o jogo
        }
    });

    // Função para reiniciar o jogo
    function reiniciarJogo() {
        // Coloque aqui o código para reiniciar o jogo, por exemplo:
        sortear(); // Chama a função para sortear uma nova palavra
        limparTentativas(); // Limpa as tentativas
        atualizarImagemForca(0); // Reinicia a imagem da forca
        atualizarCategoria(); // Atualiza a categoria
        montarPalavraNaTela(); // Monta a palavra na tela
    }

    // Outras funções e variáveis aqui
});
// Botão de dica
const btnDica = document.getElementById("btnDica");

// Modal da dica
const modalDica = document.getElementById("modalDica");
const spanCloseDica = document.querySelector(".modal-header-dica .close");
const dicaTexto = document.getElementById("dicaTexto");

// Evento de clique para exibir a dica
btnDica.addEventListener("click", function() {
    const categoriaLowerCase = palavraSecretaCategoria;
    const categoriaCapitalizada = categoriaLowerCase.charAt(0).toUpperCase() + categoriaLowerCase.slice(1);

    dicaTexto.innerHTML = categoriaCapitalizada;

    modalDica.style.display = "block";
});

// Evento de clique no botão de fechar
spanCloseDica.addEventListener("click", function() {
    modalDica.style.display = "none";
});

// Evento para fechar o modal ao clicar fora dele
window.addEventListener("click", function(event) {
    if (event.target == modalDica) {
        modalDica.style.display = "none";
    }
});

// Evento de clique para o botão de dica
document.getElementById("btnDica").addEventListener("click", exibirDica);





