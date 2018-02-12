const express = require('express');
const router = express.Router();
const {data} = require('../data/flashcardData.json');
const {cards} = data;

router.get('/', (req, res) => {
	const randomId = Math.floor(Math.random() * cards.length);
	res.redirect(`/cards/${randomId}?side=question`);
});

router.get('/:id', (req, res) => {
		const {side} = req.query;
		const {id} = req.params;

		if(id >= cards.length)
			res.redirect('/cards/');
		
		if(side.toLowerCase() !== 'question' & side.toLowerCase() !== 'answer')
			res.redirect(`/cards/${id}?side=question`);
		else
		{
			const text = cards[id][side];
			const {hint} = cards[id];
			const templateData = {id, text};
			if(side.toLowerCase() === 'question')
			{
				templateData.hint = hint;
				templateData.sideToShow = 'answer';
			}
			else if(side === 'answer')
			{
				templateData.sideToShow = 'question';
			}
			res.render(`card`, templateData);
		}
});

module.exports = router;