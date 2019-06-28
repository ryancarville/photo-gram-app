import React from 'react';

const PhotGramContext = React.createContext({
	signUp: () => {},
	login: () => {},
	uploadImage: () => {},
	deleteImage: () => {},
	updateImage: () => {},
	images: [
		{
			id: 1,
			imgUrl:
				'http://beardystudios.com/ZURICH_SITE/images/photography/food/Breakfast/05.jpg',
			alt: 'food,breakfast',
			caption: 'Test caption for food',
			date: '2019-09-03',
			albumId: 'album2'
		},
		{
			id: 2,
			imgUrl:
				'http://beardystudios.com/ZURICH_SITE/images/photography/food/Breakfast/07.jpg',
			alt: 'food,breakfast',
			caption: 'Test caption for food',
			date: '2019-09-03',
			albumId: 'album2'
		},
		{
			id: 3,
			imgUrl:
				'http://beardystudios.com/ZURICH_SITE/images/photography/food/Breakfast/11.jpg',
			alt: 'food,breakfast',
			caption: 'Test caption for food',
			date: '2019-09-03',
			albumId: 'album2'
		},
		{
			id: 4,
			imgUrl:
				'http://beardystudios.com/ZURICH_SITE/images/photography/faces/editorial/05.jpg',
			alt: 'portrait,people',
			caption: 'Test caption for food',
			date: '2019-09-03',
			albumId: 'album1'
		},
		{
			id: 5,
			imgUrl:
				'http://beardystudios.com/ZURICH_SITE/images/photography/faces/editorial/01.jpg',
			alt: 'portrait,people',
			caption: 'Test caption for food',
			date: '2019-09-03',
			albumId: 'album1'
		},
		{
			id: 6,
			imgUrl:
				'http://beardystudios.com/ZURICH_SITE/images/photography/earth/sand/08.jpg',
			alt: 'desert,sand,nature',
			caption: 'Test caption two for breakfast',
			date: '2019-26-11'
		},
		{
			id: 7,
			imgUrl:
				'http://beardystudios.com/ZURICH_SITE/images/photography/earth/sand/04.jpg',
			alt: 'desert,sand,nature',
			caption: 'Test caption one for breakfast',
			date: '2019-14-03',
			albumId: 'album3'
		},
		{
			id: 8,
			imgUrl:
				'http://beardystudios.com/ZURICH_SITE/images/photography/earth/sand/10.jpg',
			alt: 'desert,sand,nature',
			caption: 'Test caption one for breakfast',
			date: '2019-31-07',
			albumId: 'album3'
		},
		{
			id: 9,
			imgUrl:
				'http://beardystudios.com/ZURICH_SITE/images/photography/earth/sand/11.jpg',
			alt: 'desert,sand,nature',
			caption: 'Test caption one for breakfast',
			date: '2019-30-05',
			albumId: 'album3'
		},
		{
			id: 10,
			imgUrl:
				'http://beardystudios.com/ZURICH_SITE/images/photography/earth/waterscapes/01.jpg',
			alt: 'desert,sand,nature',
			caption: 'Test caption one for breakfast',
			date: '2019-09-03',
			albumId: 'album4'
		},
		{
			id: 11,
			imgUrl:
				'http://beardystudios.com/ZURICH_SITE/images/photography/earth/waterscapes/03.jpg',
			alt: 'desert,sand,nature',
			caption: 'Test caption one for breakfast',
			date: '2019-09-03',
			albumId: 'album4'
		}
	],
	albums: [
		{
			id: 'album1',
			name: 'people',
			imgUrl:
				'http://beardystudios.com/ZURICH_SITE/images/photography/faces/portraits/03.jpg'
		},
		{
			id: 'album2',
			name: 'food',
			imgUrl:
				'http://beardystudios.com/ZURICH_SITE/images/photography/food/lunch/02.jpg'
		},
		{
			id: 'album3',
			name: 'earth',
			imgUrl:
				'http://beardystudios.com/ZURICH_SITE/images/photography/earth/sand/03.jpg'
		},
		{
			id: 'album4',
			name: 'water',
			imgUrl:
				'http://beardystudios.com/ZURICH_SITE/images/photography/earth/waterscapes/01.jpg'
		}
	]
});

export default PhotGramContext;
