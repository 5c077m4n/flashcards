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
			res.redirect(`/cards/${cards.length - 1}`);
		// if(side.toLowerCase() !== 'question' & side.toLowerCase() !== 'answer')
		// 	return res.redirect(`/cards/${id}?side=question`);
		if(!side)
			return res.redirect(`/cards/${id}?side=question`);
		else
		{
			const name = req.cookies.username;
			const text = cards[id][side];
			const {hint} = cards[id];
			const templateData = {id, text, name};
			if(side.toLowerCase() === 'question')
			{
				templateData.hint = hint;
				templateData.sideToShow = 'answer';
			}
			else if(side === 'answer')
			{
				templateData.sideToShow = 'question';
			}
			return res.render(`card`, templateData);
		}
});

module.exports = router;