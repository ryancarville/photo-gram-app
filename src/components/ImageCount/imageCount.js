import React from 'react';

export default function ImageCount(props) {
	//counts all images
	const count = props.images.length;
	return <span>{count}</span>;
}
