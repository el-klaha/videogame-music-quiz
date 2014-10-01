$(document).ready(function() {

	var questionNumber = 0;
	var correctAnswers = 0;
	var i;

	var questionList = new Array();
	
	questionList[0] = new Question (["The King of Fighters", "Fatal Fury", "Street Fighter II", "Killer Instinct"], "It's the Ryu's stage Theme, from Street Fighter II!", 2, 0);
	questionList[1] = new Question (["Final Fantasy VI", "Secret of Evermore", "Earthbound", "Saga Frontier"], "It's Terra's theme, from Final Fantasy VI!", 0, 1);
	questionList[2] = new Question (["Earthworm Jim", "Uniracers", "Super Mario World", "Donkey Kong Country 2"], "It's Stickerbrush Symphony, from Donkey Kong Country 2!", 3, 2);
	questionList[3] = new Question (["Chrono Trigger", "DewPrism", "Grandia", "Alundra"], "It's Lucca's theme, from Chrono Trigger!", 0, 3);
	questionList[4] = new Question (["Castlevania 2", "Ninja Gaiden 3", "Dream Master", "Bucky 'o' Hare"], "It's the ending theme for Ninja Gaiden 3!", 1, 4);
	questionList[5] = new Question (["Final Fantasy Series", "Secret of Mana Series", "Ys Series", "Castlevania Series"], "It's the overworld theme from the Ys Series!", 2, 5);
	questionList[6] = new Question (["Legend of Mana", "Front Mision 3", "Secret of Mana", "Alundra 2"], "It's the Domina town theme from Legend of Mana!", 0, 6);
	questionList[7] = new Question (["Legend of the Dragoon", "Final Fantasy Tactics", "Tales of Vesperia", "Chrono Cross"], "It's Nikki's theme from Chrono Cross!", 3, 7);
	questionList[8] = new Question (["Valkyrie Profile", "Legend of Legaia", "Dynasty Warriors", "Xenogears"], "It's Lahan town's theme from Xenogears!", 3, 8);
	questionList[9] = new Question (["Final Fantasy VII", "Final Fantasy X", "Final Fantasy IX", "Final Fantasy VIII"], "It's Vamo' Alla Flamenco from Final Fantasy IX!", 2, 9);

	function Question (answerOptions, explanation, correct, song) {
		this.answerOptions = answerOptions;
		this.explanation = explanation;
		this.correct = correct;
		this.song = song;
	};

	Shuffle(questionList);

	/*--- Starts the Quiz ---*/

	$('#start').click(function() {
		$(this).hide();
		showQuestion();
	});

	/*--- Shows Question and Answers ---*/

	function showQuestion()
	{
		currentQuestion = questionList[questionNumber];
		playSong();
		$('#answer').show();
		$('#again').hide();
		$('footer').text("Question " + (questionNumber+1) + "/" + questionList.length);
		$('#question').find('p').text("Guess the Game from the Music!");
		$('.pauseimg').show();
		for (i = 0; i < currentQuestion.answerOptions.length; i++)
		{
			$('#answers').append('<li id="radio'+i+'"><input type="radio" name="answers" value="'+i+'"><span class="list">'+currentQuestion.answerOptions[i]+'</span></li>');
		}
	};

	/*--- Answer Logic ---*/

	$('#answer').click(function(){
		var selectedAnswer = $("input:checked").val();
		console.log(selectedAnswer);

		if (selectedAnswer != null)
		{
			if ( selectedAnswer == currentQuestion.correct )
			{
				$('.playimg').hide();

				$('#question').find('p').text("Correct! " + currentQuestion.explanation);
				$("#radio"+ currentQuestion.correct +" span").css({"color":"forestgreen", "text-shadow":"2px 2px 5px forestgreen"});
				$('#answer').hide();
				$('#next').show();
				correctAnswers++;

				if ( questionNumber == questionList.length - 1 )
				{
					$('#next').hide();
					$('#finish').show();
				}
			}
			else
			{
				$('.playimg').hide();

				$('#question').find('p').text("Wrong! " + currentQuestion.explanation);			
				$("#radio"+ currentQuestion.correct +" span").css({"color":"forestgreen", "text-shadow":"2px 2px 5px forestgreen"});
				$("#radio"+ selectedAnswer +" span").css({"color":"red", "text-shadow":"2px 2px 5px red"});
				$('#answer').hide();
				$('#next').show();

				if ( questionNumber == questionList.length - 1 )
				{
					$('#next').hide();
					$('#finish').show();
				}
			}
		}
		else
		{
			return;
		}
	});

	/*--- Next Question ---*/

	$('#next').click(function(){
		$('#next').hide();
		$('#answer').show();
		$('#answers').empty();
		stopSong();
		questionNumber++;
		showQuestion();
	});

	/*--- EndGame ---*/

	$('#finish').click(function(){
		$('#answers').empty();
		$('#question').find('p').text("You had: " + correctAnswers + " correct answers!");
		$('#finish').hide();
		$('#again').show();
	});

	/*--- Again Logic ---*/

	$('#again').click(function(){
		Shuffle(questionList);
		stopSong();
		correctAnswers = 0;
		questionNumber = 0;
		showQuestion();
	});

	/*--- Array Shuffle ---*/

	function Shuffle(o) {
		for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
	};

	/*--- Music Related Logic ---*/
	
	$('.playimg').click(function(){
		playSong();
		$(this).hide();
		$('.pauseimg').show()
	});

	$('.pauseimg').click(function(){
		stopSong();
		$(this).hide();
		$('.playimg').show()
	});


	var playSong = function() {
		var songID = '#song'+currentQuestion.song;
		$(songID)[0].volume = 0.7;
		$(songID)[0].load();
		$(songID)[0].play();
		$(songID).on('ended', function() {
			$('.pauseimg').hide();
			$('.playimg').show();
		})
	};

	var stopSong = function() {
		var songID = '#song'+currentQuestion.song;
		$(songID)[0].pause();
	};

});

