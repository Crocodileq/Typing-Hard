const phases = [
    { phrase: 'Te enganei!!', duration: 6 },
    { phrase: 'engajamento Iniciar poluir hoje', duration: 7 },
    { phrase: 'Julgamento nulo hífen glória', duration: 8 },
    { phrase: 'estava Ele ganho dedo bola', duration: 5 },
    { phrase: 'céu macio risada Matou perfume,', duration: 8 },
    { phrase: 'vento Minha alicate raio esponja', duration: 7 },
    { phrase: 'Filha tambor selo martelo penumbra', duration: 8 },
    { phrase: 'hino Que ilha telefone maçã', duration: 6 },
    { phrase: 'troféu Tenha caçador lenha', duration: 5 },
    { phrase: 'finalizado O gula', duration: 4 },
    { phrase: 'Fim kilo castor gerador névoa coça', duration: 7 },
    { phrase: 'assim Q verde puder folha', duration: 5 },
    { phrase: 'cabeça Merece ying cidade visita', duration: 7 },
    { phrase: 'grito zula lousa minha Assim', duration: 6 },
    { phrase: 'engrenagem Seja apóstolo pizza massa cor', duration: 8 },


  ];
  let currentPhase = 0;
  
  const phraseElement = document.getElementById('phrase');
  const inputElement = document.getElementById('input');
  const timerElement = document.getElementById('timer');
  const timerContainer = document.getElementById('timer-container');
  const cutsceneContainer = document.getElementById('cutscene-container');
  const endButton = document.getElementById('endButton');
  let timer; // Variável para armazenar o timer
  let timeRemaining = phases[currentPhase].duration; // Tempo em segundos
  
  function startTimer() {
    timer = setInterval(() => {
      timeRemaining--;
  
      if (timeRemaining <= 0 && currentPhase < phases.length) {
        // Aviso de tempo esgotado apenas durante o jogo
        alert('Tempo esgotado! A fase será reiniciada.');
        resetGame();
      }
  
      updateTimerDisplay();
    }, 1000); // Atualiza a cada 1000 milissegundos (1 segundo)
  }
  
  
  function resetTimer() {
    clearInterval(timer);
    timeRemaining = phases[currentPhase].duration;
    updateTimerDisplay();
    startTimer(); // Reinicia o temporizador
  }
  
  function updateTimerDisplay() {
    timerElement.textContent = `${timeRemaining} segundos`;
  }
  
  function checkInput() {
    const inputValue = inputElement.value;
    let formattedPhrase = '';
  
    for (let i = 0; i < phases[currentPhase].phrase.length; i++) {
      if (inputValue[i] === undefined) {
        formattedPhrase += '<span>' + phases[currentPhase].phrase[i] + '</span>';
      } else if (inputValue[i] === phases[currentPhase].phrase[i]) {
        formattedPhrase += '<span class="correct">' + phases[currentPhase].phrase[i] + '</span>';
      } else {
        formattedPhrase += '<span class="incorrect">' + phases[currentPhase].phrase[i] + '</span>';
      }
    }
  
    phraseElement.innerHTML = formattedPhrase;
    
    if (inputValue === phases[currentPhase].phrase) {
      alert('Parabéns! Você digitou a frase corretamente.');
      goToNextPhase();
    }
  }
  
  function resetGame() {
    inputElement.value = '';
    phraseElement.innerHTML = '';
    for (let i = 0; i < phases[currentPhase].phrase.length; i++) {
      phraseElement.innerHTML += '<span>' + phases[currentPhase].phrase[i] + '</span>';
    }
    resetTimer(); // Inicia o temporizador novamente ao reiniciar o jogo
    inputElement.focus();
  }
  
  function goToNextPhase() {
    currentPhase++;
  
    if (currentPhase < phases.length) {
      // Se houver mais fases, atualiza a frase e reinicia o jogo
      alert('Fase concluída! Clique em OK para avançar para a próxima fase.');
      resetGame();
    } else {
      // Se não houver mais fases, exibe a cutscene
      showCutscene();
    }
  }
  
  function showCutscene() {
    // Esconde o jogo e exibe a cutscene
    document.getElementById('game-container').style.display = 'none';
    cutsceneContainer.style.display = 'block';
  }
  
  function endCutscene() {
    // Esconde a cutscene e exibe o jogo novamente
    cutsceneContainer.style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
    resetGame(); // Reinicia o jogo após a cutscene
  }
  
  // Adiciona um ouvinte de evento ao botão "Fim" para chamar a função endCutscene
  endButton.addEventListener('click', endCutscene);
  
  // Adiciona o foco à caixa de entrada quando a página carrega
  window.onload = function () {
    inputElement.focus();
    updateTimerDisplay();
    startTimer();
  };
  