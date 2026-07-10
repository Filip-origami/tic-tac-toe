// ===== ZMIENNE GLOBALNE =====
// Pobieramy wszystkie przyciski (pola gry) z klasy 'cell'
const cells = document.querySelectorAll('.cell');

// Stan gry - przechowuje wartości: '', 'X', 'O' dla każdego pola
let gameBoard = ['', '', '', '', '', '', '', '', ''];

// Przechowuje aktualnego gracza: 'X' lub 'O'
let currentPlayer = 'X';

// Flaga pokazująca czy gra jest zakończona (ktoś wygrał lub remis)
let gameOver = false;

// ===== KOMBINACJE WYGRANEJ =====
// Wszystkie możliwe kombinacje 3 w linii (indeksy pól)
const winConditions = [
  // Poziome linie
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // Pionowe kolumny
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // Przekątne (skośnie)
  [0, 4, 8],
  [2, 4, 6]
];





















//logika gry

// ===== FUNKCJA: Sprawdzenie wygranej =====
// Przechodzi przez wszystkie kombinacje wygranej
// Jeśli wszystkie 3 pola mają ten sam symbol (X lub O), to wygrana!
function checkWin() {
  for (let condition of winConditions) {
    const [a, b, c] = condition;
    // Jeśli pole nie jest puste i wszystkie 3 pola mają tę samą wartość
    if (gameBoard[a] !== '' && 
        gameBoard[a] === gameBoard[b] && 
        gameBoard[b] === gameBoard[c]) {
      return true; // Ktoś wygrał!
    }
  }
  return false; // Nikt nie wygrał
}

// ===== FUNKCJA: Sprawdzenie remisu =====
// Remis to sytuacja gdy wszystkie pola są zajęte, ale nikt nie wygrał
function checkTie() {
  return gameBoard.every(cell => cell !== ''); // Czy każde pole jest zajęte?
}

// ===== FUNKCJA: Obsługa kliknięcia na przycisk =====
function handleCellClick(event) {
  // Pobieramy przycisk który został kliknięty
  const clickedCell = event.target;
  
  // Znajdujemy indeks tego przycisku w tablicy (0-8)
  const cellIndex = Array.from(cells).indexOf(clickedCell);

  // WARUNKI aby przerwać obsługę:
  // 1. Gra już się skończyła
  // 2. Pole jest już zajęte (coś tam już jest)
  if (gameOver || gameBoard[cellIndex] !== '') {
    return; // Nic nie rób, przerwij funkcję
  }

  // Ustawiamy wartość w tablicy stanu gry
  gameBoard[cellIndex] = currentPlayer;

  // Wpisujemy X lub O na przycisk
  clickedCell.textContent = currentPlayer;

  // Dodajemy klasę CSS dla stylizacji (opcjonalnie)
  clickedCell.classList.add(currentPlayer);

  // Sprawdzamy czy gracz wygrał
  if (checkWin()) {
    gameOver = true;
    console.log(`Gracz ${currentPlayer} wygrał! 🎉`);
    alert(`Gracz ${currentPlayer} wygrał! 🎉`);
    return; // Kończymy grę
  }

  // Sprawdzamy czy jest remis
  if (checkTie()) {
    gameOver = true;
    console.log('Remis! 🤝');
    alert('Remis! 🤝');
    return; // Kończymy grę
  }

  // Zmieniamy gracza: jeśli był X, teraz O; jeśli był O, teraz X
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  console.log(`Kolej gracza: ${currentPlayer}`);
}

// ===== FUNKCJA: Reset gry =====
// Przywraca grę do stanu początkowego
function resetGame() {
  gameBoard = ['', '', '', '', '', '', '', '', '']; // Czyszczenie stanu
  currentPlayer = 'X'; // Zawsze X zaczyna
  gameOver = false; // Gra nie jest zakończona
  
  // Czyszczenie wszystkich przycisków
  cells.forEach(cell => {
    cell.textContent = ''; // Usuwamy tekst (X lub O)
    cell.classList.remove('X', 'O'); // Usuwamy klasy CSS
  });
  
  console.log('Gra została zresetowana!');
}

// ===== INICJALIZACJA: Dodanie event listenerów =====
// Dla każdego przycisku (pola) dodajemy obsługę kliknięcia
cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

// ===== OPCJONALNIE: Przycisk reset =====
// Jeśli chcesz, możesz dodać przycisk reset w HTML i podłączyć go tutaj
// <button id="resetBtn">Nowa gra</button>
document.getElementById('resetBtn').addEventListener('click', resetGame);
