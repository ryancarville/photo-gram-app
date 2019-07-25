import React, { useContext } from 'react';
import PhotoGramContext from '../../PhotoGramContext';

export default function ImageCount(props) {
	//counts all images
	const context = useContext(PhotoGramContext);
	const count =
		context.images === undefined ? 'Couting...' : context.images.length;
	return <span>{count}</span>;
}
