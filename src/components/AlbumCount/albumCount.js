import React from 'react';

export default function AlbumCount(props) {
	//counts the currnet number of albums
	const count = props.albums.length;
	return <span>{count}</span>;
}
