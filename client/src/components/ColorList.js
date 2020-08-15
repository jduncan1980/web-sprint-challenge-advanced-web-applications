import React, { useState } from 'react';
// import axios from 'axios';
import axiosWithAuth from '../utils/axiosWithAuth';
// import { useParams } from 'react-router-dom';

const initialColor = {
	color: '',
	code: { hex: '' },
	id: '',
};

const ColorList = ({ colors, updateColors }) => {
	console.log(colors);
	const [editing, setEditing] = useState(false);
	const [colorToEdit, setColorToEdit] = useState(initialColor);
	// const { id } = useParams();

	const editColor = (color) => {
		setEditing(true);
		setColorToEdit(color);
	};

	const saveEdit = async (e) => {
		try {
			e.preventDefault();
			const response = await axiosWithAuth().put(
				`/colors/${colorToEdit.id}`,
				colorToEdit
			);
			const filteredList = colors.filter(
				(color) => color.id !== colorToEdit.id
			);
			updateColors([...filteredList, response.data]);
			console.log(response);
		} catch (error) {
			alert(`Something went wrong => ${error}`);
		}
	};

	const deleteColor = async (color) => {
		try {
			const response = await axiosWithAuth().delete(`/colors/${color.id}`);
			const filteredList = colors.filter((color) => color.id !== response.data);
			updateColors([...filteredList]);
		} catch (error) {
			alert(`Something went wrong => ${error}`);
		}
	};

	return (
		<div className='colors-wrap'>
			<p>colors</p>
			<ul>
				{colors.map((color) => (
					<li key={color.color} onClick={() => editColor(color)}>
						<span>
							<span
								className='delete'
								onClick={(e) => {
									e.stopPropagation();
									deleteColor(color);
								}}
							>
								x
							</span>{' '}
							{color.color}
						</span>
						<div
							className='color-box'
							style={{ backgroundColor: color.code.hex }}
						/>
					</li>
				))}
			</ul>
			{editing && (
				<form onSubmit={saveEdit}>
					<legend>edit color</legend>
					<label>
						color name:
						<input
							onChange={(e) =>
								setColorToEdit({ ...colorToEdit, color: e.target.value })
							}
							value={colorToEdit.color}
						/>
					</label>
					<label>
						hex code:
						<input
							onChange={(e) =>
								setColorToEdit({
									...colorToEdit,
									code: { hex: e.target.value },
								})
							}
							value={colorToEdit.code.hex}
						/>
					</label>
					<div className='button-row'>
						<button type='submit'>save</button>
						<button onClick={() => setEditing(false)}>cancel</button>
					</div>
				</form>
			)}
			<div className='spacer' />
			{/* stretch - build another form here to add a color */}
		</div>
	);
};

export default ColorList;
