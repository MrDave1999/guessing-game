(function init()
{
	document.addEventListener("DOMContentLoaded", (event) =>
	{
		const MIN = 1;
		const MAX = 100;
		const MAX_TURNS = 10;
		let countTurns = 0;
		let valueArbitrary = getRandomArbitrary(MIN, MAX);
		
		const nodeGuess = document.getElementById("guess");
		const lastGuess = document.getElementById("last_guess");
		const btnStart = document.getElementById("btn_start");
		const btnGuess = document.getElementById("btn_guess");
		const previousGuess = document.getElementById("prev_guess");
		const statusGame = document.getElementById("status");
		const turn = document.getElementById("turn");
		const blkGuess = document.getElementById("blk_guess");
		
		/* When the player enters his guess. */
		btnGuess.addEventListener("click", (event) => 
		{
			if(++countTurns == 1)
			{
				blkGuess.style.height = "350px";
				prev_guess.innerHTML = "Previous guesses: ";
				statusGame.style.display = "block";
			}
			
			const valueGuess = parseInt(nodeGuess.value, 10);
			previousGuess.innerHTML += valueGuess + " ";
			nodeGuess.value = "";
			nodeGuess.focus();
			turn.innerHTML = "Turn: " + countTurns;
			
			if(valueGuess === valueArbitrary)
				setEndGame("Congratulations! You got it right!", "win");
			else if(countTurns === MAX_TURNS)
				setEndGame("!!!GAME OVER!!!", "lose");
			else 
			{
				statusGame.innerText = "Wrong!";
				statusGame.id = "lose";
				lastGuess.innerText = (valueGuess > valueArbitrary) ? "Last guess was too high!" : "Last guess was too low!";
			}
		});
		
		/* When the player wants to restart the game. */
		btnStart.addEventListener("click", (event) => 
		{
			statusGame.innerHTML = "";
			lastGuess.innerHTML = "";
			prev_guess.innerHTML = "";
			turn.innerHTML = "";
			blkGuess.style.height = "200px";
			lastGuess.style.display = "block";
			statusGame.style.display = "none";
			btnStart.style.display = "none";
			nodeGuess.disabled = false;
			nodeGuess.focus();
			btnGuess.disabled = false;
			countTurns = 0;
			valueArbitrary = getRandomArbitrary(MIN, MAX);
		});
	
		function getRandomArbitrary(min, max) 
		{
			return Math.floor(Math.random() * (max - min + 1) + min);
		}
		
		function setEndGame(textnode, id)
		{
			lastGuess.style.display = "none";
			btnStart.style.display = "block";
			nodeGuess.disabled = true;
			nodeGuess.value = "";
			btnGuess.disabled = true;
			statusGame.innerText = textnode;
			statusGame.id = id;
		}
	});
})();
