const express = require('express');
const router = express.Router();
const {data} = require('../data/flashcardData.json');
const {cards} = data;

router.get('/', (req, res) => {
	const id = Math.floor(Math.random() * cards.length);
	const templateData = {id , text: cards[id].question, hint: cards[id].hint, sideToShow: 'answer', sideToShowDisplay: 'Answer'};
	res.render(`card`, templateData);
});

router.get('/:id', (req, res) => {
	const {side} = req.query;
	const {id} = req.params;
	const text = cards[id][side];
	const {hint} = cards[id];
	const templateData = {id, text};
	if(side.toLowerCase() === 'question')
	{
		templateData.hint = hint;
		templateData.sideToShow = 'answer';
		templateData.sideToShowDisplay = 'Answer';
	}
	else if(side === 'answer')
	{
		templateData.sideToShow = 'question';
		templateData.sideToShowDisplay = 'Question';
	}

	res.render(`card`, templateData);
});

module.exports = router;