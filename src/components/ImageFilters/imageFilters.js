import React, { Component } from 'react';
import './imageFilters.css';

export default class ImageFilters extends Component {
	filters = e => {};
	render() {
		return (
			<div className='filters-container'>
				<ul>{this.filters}</ul>
			</div>
		);
	}
}

const data = {
	image: 'https://www.w3schools.com/w3images/sound.jpg',
	settings: [
		{
			name: 'contrast',
			value: '100%'
		},
		{
			name: 'hue',
			value: '0deg'
		},
		{
			name: 'brightness',
			value: '100%'
		},
		{
			name: 'saturate',
			value: '100%'
		},
		{
			name: 'sepia',
			value: '0%'
		},
		{
			name: 'invert',
			value: '0%'
		}
	]
};

class ImageEditor extends React.Component {
	constructor() {
		super();
	}

	handleChange(e) {
		var name = e.target.id;
		var value = e.target.value;
		switch (name) {
			case 'contrast':
				this.props.data.settings[0].value = value + '%';
				break;
			case 'hue':
				this.props.data.settings[1].value = value + 'deg';
				break;
			case 'brightness':
				this.props.data.settings[2].value = value + '%';
				break;
			case 'saturate':
				this.props.data.settings[3].value = value + '%';
				break;
			case 'sepia':
				this.props.data.settings[4].value = value + '%';
				break;
			case 'invert':
				this.props.data.settings[5].value = value + '%';
				break;
		}
		this.forceUpdate();
	}

	render() {
		return (
			<div className='settings'>
				<Settings
					settings={this.props.data.settings}
					url={this.props.data.image}
					onChange={this.handleChange.bind(this)}
				/>
			</div>
		);
	}
}

class Settings extends React.Component {
	constructor(props) {
		super(props);
		this.setVal = this.setVal.bind(this);
	}

	setVal(setting, onChange) {
		switch (setting.name) {
			case 'contrast':
				return (
					<input
						type='range'
						step='1'
						min='0'
						max='200'
						id={setting.name}
						onChange={onChange}
						defaultValue={setting.value}
					/>
				);
				break;
			case 'hue':
				return (
					<input
						type='range'
						step='1'
						min='0'
						max='360'
						id={setting.name}
						onChange={onChange}
						defaultValue={setting.value}
					/>
				);
				break;
			case 'brightness':
				return (
					<input
						type='range'
						step='1'
						min='0'
						max='200'
						id={setting.name}
						onChange={onChange}
						defaultValue={setting.value}
					/>
				);
				break;
			case 'saturate':
				return (
					<input
						type='range'
						step='1'
						min='0'
						max='100'
						id={setting.name}
						onChange={onChange}
						defaultValue={setting.value}
					/>
				);
				break;
			case 'sepia':
				return (
					<input
						type='range'
						step='1'
						min='0'
						max='100'
						id={setting.name}
						onChange={onChange}
						defaultValue={setting.value}
					/>
				);
				break;

			case 'invert':
				return (
					<input
						type='range'
						step='1'
						min='0'
						max='100'
						id={setting.name}
						onChange={onChange}
						defaultValue={setting.value}
					/>
				);
				break;

			case 'grayscale':
				return (
					<input
						type='range'
						step='1'
						min='0'
						max='100'
						id={setting.name}
						onChange={onChange}
						defaultValue={setting.value}
					/>
				);
				break;
			default:
				return <input type='range' />;
		}
	}
	render() {
		var onchange = this.props.onChange;
		return (
			<div className='contentWrap'>
				<div className='sidebar'>
					<div className='title'>Filters</div>
					{this.props.settings.map(function(setting, index) {
						return (
							<div className='setting'>
								<label className='filterName'>
									<div>{setting.name}</div>
									<div>{setting.value}</div>
								</label>
								{Settings.prototype.setVal(setting, onchange)}
							</div>
						);
					})}
				</div>
				<Image url={this.props.url} settings={this.props.settings} />
			</div>
		);
	}
}

class Image extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		var imgStyle = {
			filter: ` contrast(${this.props.settings[0].value}) hue-rotate(${
				this.props.settings[1].value
			}) brightness(${this.props.settings[2].value}) saturate(${
				this.props.settings[3].value
			}) sepia(${this.props.settings[4].value})
  invert(${this.props.settings[5].value})`,
			backgroundImage: `url(${this.props.url})`
		};
		return (
			<div className='imageContainer'>
				<img className='guitar' style={imgStyle} />{' '}
			</div>
		);
	}
}

ImageEditor.defaultProps = {
	data: data
};
