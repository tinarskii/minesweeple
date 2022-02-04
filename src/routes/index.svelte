<script>
  import BoardGame from '$lib/board';
  import { writable } from "svelte/store";
  import Modal from "$lib/components/Modal.svelte";
  let newBoard = new BoardGame(5, 5, 6)
  let Game = writable(newBoard);
  let Board = writable(newBoard.board)

  let modeFlags = writable(false)
  modeFlags.subscribe(mode => {
    modeFlags.set(mode)
  })

  $Game.startGame()
  let flagged = 0
</script>

<main class="bg-black h-screen">
  <h1 class="text-white md:text-7xl text-5xl  text-center py-4">MineSweeple</h1>
  <div class="m-auto max-w-md">
    <div class="grid grid-cols-5 justify-items-stretch md:gap-4 gap-2">
      {#each $Board as row}
        {#each row as cell}
          <div class="px-4 py-6 border border-gray-500 rounded-lg text-center text-xl cursor-pointer hover:bg-gray-800 duration-150 text-white { cell.isRevealed ? cell.neighborMines === 0 ? 'text-gray-400' : cell.neighborMines === 1 ? 'text-blue-500' : cell.neighborMines === 2 ? 'text-green-500' : cell.neighborMines === 3 ? 'text-yellow-500' : cell.neighborMines === 4 ? 'text-orange-500' : cell.neighborMines === 5 ? 'text-red-500' : cell.neighborMines === 6 ? 'text-purple-500' : cell.neighborMines === 7 ? 'text-pink-500' : cell.neighborMines === 8 ? 'text-gray-600' : 'text-white' : ''}" on:contextmenu|preventDefault={() =>  {
            if($Game.gameOver) return;
            flagged <= 6 ? $Game.flagCell(cell) : ''; $Board = $Board; $Game=$Game
          }} on:click={() => {
            if($Game.gameOver || cell.isFlagged) return;
            if($modeFlags === true) {
              flagged <= 6 ? $Game.flagCell(cell) : ''; $Board = $Board; $Game=$Game
            } else {
            $Game.revealCell(cell); $Board = $Board; $Game=$Game
            }
          }}>
            {cell.isRevealed ? cell.isMine ? '💣' : (cell.isMine && cell.isFlagged) ? 'X' : cell.neighborMines : cell.isFlagged ? '🚩' : '?'}
          </div>
        {/each}
      {/each}
    </div>
  </div>
  <h1 class="text-center text-4xl  text-white mt-8">
    Remaining Flags: {6 - $Game.getFlaggedCells().length}
  </h1>
  <center>
  <button class="text-white px-4 py-2 mx-auto my-4 border border-white rounded-lg hover:bg-white hover:text-black duration-150" on:click={() => $modeFlags = !$modeFlags}>{ $modeFlags === false ? 'Change to FLAG' : 'Change to Reveal'}</button>
  </center>
</main>

{#if ($Game.gameOver || $Game.isGameWon())}
  <Modal
    title="You {$Game.gameOver ? 'lose' : 'won'}!"
    description="You played for {$Game.getPlayTime()}."
    result="{$Game.getWordleResult()}"
    moves="{$Game.moves}"
    correct="{$Game.getCorrectFlags()}"
    closeModal="{() => {newBoard = new BoardGame(5, 5, 6); Game.set(newBoard); Board.set(newBoard.board); $Game.startGame()}}"
  />
{/if}