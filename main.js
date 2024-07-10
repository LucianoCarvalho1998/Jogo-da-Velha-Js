document.addEventListener('DOMContentLoaded', () => {
  
    const cells = document.querySelectorAll('.campo');
    const statusTexto = document.getElementById('status');
    const botaoRestart = document.getElementById('restart');
    
    let PlayerAtual = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];
    let jogo = true;
    
//Lista com as combinações de vitória 
    const combinacao= [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const CampoClick = (event) => {
        const campo = event.target;
        const index = campo.getAttribute('data-index');

        if (board[index] !== '' || !jogo) {
            return;
        }

        board[index] = PlayerAtual;
        campo.textContent = PlayerAtual;
        campo.classList.add(PlayerAtual);

        DefinirVencedor();
        MudarPlayer();
    };


    //Função para definir o vencedor da partida 
    const DefinirVencedor = () => {
        let roundWon = false;
        for (let i = 0; i < combinacao.length; i++) {
            const [a, b, c] = combinacao[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                roundWon = true;
                combinacao[i].forEach(index => {
                    cells[index].classList.add('vencedor');
                });
                break;
            }
        }

        if (roundWon) {
            statusTexto.textContent = `Jogador ${PlayerAtual} venceu!`;
            jogo = false;
            return;
        }

        if (!board.includes('')) {
            statusTexto.textContent = 'Empate!';
            jogo = false;
            return;
        }
    };


    //Função para mudar a vez dos jogadores 
    const MudarPlayer = () => {
        PlayerAtual= PlayerAtual=== 'X' ? 'O' : 'X';
        statusTexto.textContent = `É a vez do Jogador ${PlayerAtual}`;
    };


    const restartGame = () => {
        PlayerAtual= 'X';
        board = ['', '', '', '', '', '', '', '', ''];
        jogo = true;
        statusTexto.textContent = `É a vez do Jogador ${PlayerAtual}`;
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('X', 'O', 'vencedor');
        });
    };


    cells.forEach(cell => cell.addEventListener('click', CampoClick));
    botaoRestart.addEventListener('click', restartGame);

    statusTexto.textContent = `É a vez do Jogador ${PlayerAtual}`;
});
