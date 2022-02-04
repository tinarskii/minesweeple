<script lang="ts">
  export let closeModal: () => void
  export let title: string
  export let description: string
  export let result
  export let moves
  export let correct
</script>

<div
  class="fixed z-10 inset-0 overflow-y-auto"
  aria-labelledby="modal-title"
  role="dialog"
  aria-modal="true"
>
  <div
    class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
  >
    <div
      class="fixed fadein inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      aria-hidden="true"
      on:click={() => closeModal()}></div>

    <!-- This element is to trick the browser into centering the modal contents. -->
    <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"
    >&#8203;</span
    >
    <div
      class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle md:max-w-2xl w-full sm:w-full"
    >
      <div class="bg-white dark:bg-black px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div class="text-center sm:text-left pb-4">
          <h3
            class="text-3xl leading-6 font-medium text-gray-900 dark:text-gray-100 text-center"
            id="modal-title"
          >
            {title}
          </h3>
          <div class="flex flex-col gap-3 text-sm mt-4 w-full justify-between text-black dark:text-white">
            {description}
          </div>
        </div>
        <hr>
        <pre class="text-center mt-4 bg-gray-800 text-white w-52 rounded-lg py-2 mx-auto">
          MineSweeple ({moves} moves)
{result}Correct: {correct}/6
        </pre>
      </div>
      <div class="bg-gray-50 dark:bg-gray-900 px-4 py-3 md:px-6 flex md:flex-row-reverse flex-col-reverse gap-2 justify-right">
        <button
          type="button"
          class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-500 text-base font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:ring-offset-black focus:ring-green-300 sm:ml-3 sm:w-auto sm:text-sm"
          on:click={() => {
            closeModal()
          }}
        >
          Restart
        </button>
        <button
          type="button"
          class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:ring-offset-black focus:ring-green-300 sm:ml-3 sm:w-auto sm:text-sm"
          on:click={() => {
            navigator.clipboard.writeText(`MineSweeple (${moves} moves)\n\n${result}\nCorrect: ${correct}/6`)
          }}
        >
          Copy
        </button>
      </div>
    </div>
  </div>
</div>