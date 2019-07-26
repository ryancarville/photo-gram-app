import React, { useContext } from 'react';
import PhotoGramContext from '../../PhotoGramContext';

export default function AlbumCount(props) {
	//counts the currnet number of albums
	const context = useContext(PhotoGramContext);
	const count = context.albums.length;
	return <span>{count}</span>;
}
