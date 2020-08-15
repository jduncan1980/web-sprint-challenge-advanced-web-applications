import React, { useState } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';
import {
	Box,
	TextField,
	Button,
	Typography,
	List,
	ListItem,
	Dialog,
	makeStyles,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import AddColor from './AddColor';

const initialColor = {
	color: '',
	code: { hex: '' },
	id: '',
};

const useStyles = makeStyles({
	container: {
		height: '100%',
		width: '30%',
		boxShadow: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
	},
	heading: {
		fontSize: '1rem',
		textAlign: 'center',
	},
	input: {
		width: '90%',
		display: 'block',
		margin: '30px auto',
	},
	button: {
		margin: '10px',
	},
	delete: {
		color: 'rgb(216, 87, 87)',
		marginRight: '5px',
		cursor: 'pointer',
	},
	colorBox: {
		height: ' 16px',
		width: '16px',
		border: '1px lightgray solid',
		marginRight: '36px',
		marginLeft: '10px',
		cursor: 'pointer',
	},
	form: {
		height: '100%',
	},
	dialog: {
		// width: '40%',
	},
});

const ColorList = ({ colors, updateColors }) => {
	const classes = useStyles();
	const [editing, setEditing] = useState(false);
	const [colorToEdit, setColorToEdit] = useState(initialColor);
	const { handleSubmit, register, errors, formState } = useForm({
		mode: 'onChange',
	});
	const [dialogOpen, setDialogOpen] = useState(false);

	const editColor = (color) => {
		setEditing(true);
		setColorToEdit(color);
	};

	const saveEdit = async (data) => {
		try {
			const response = await axiosWithAuth().put(`/colors/${colorToEdit.id}`, {
				...data,
				id: colorToEdit.id,
			});
			const filteredList = colors.filter(
				(color) => color.id !== colorToEdit.id
			);
			updateColors([...filteredList, response.data]);
			console.log(response);
			setEditing(false);
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
		<Box className={classes.container}>
			<Typography>colors</Typography>
			<List>
				{colors.map((color) => (
					<ListItem key={color.color} onClick={() => editColor(color)}>
						<Box component='span'>
							<Box
								className={classes.delete}
								component='span'
								onClick={(e) => {
									e.stopPropagation();
									deleteColor(color);
								}}
							>
								x
							</Box>
							{color.color}
						</Box>
						<Box
							className={classes.colorBox}
							style={{ backgroundColor: color.code.hex }}
						/>{' '}
					</ListItem>
				))}
			</List>
			<Button variant='contained' onClick={() => setDialogOpen(true)}>
				Add Color
			</Button>
			{/* {editing && (
				
			)} */}
			<Dialog open={editing} onClose={() => setEditing(false)}>
				<Box
					component='form'
					className={classes.form}
					onSubmit={handleSubmit(saveEdit)}
				>
					<Typography className={classes.heading}>edit colors</Typography>
					<TextField
						className={classes.input}
						fullWidth={true}
						autoFocus
						variant='outlined'
						type='text'
						id='color'
						name='color'
						inputRef={register({ required: 'Required' })}
						label='color:'
						defaultValue={colorToEdit.color}
						error={errors.color ? true : false}
						helperText={errors.color ? errors.color.message : null}
					/>

					<TextField
						className={classes.input}
						fullWidth={true}
						variant='outlined'
						type='text'
						id='code.hex'
						name='code.hex'
						inputRef={register({ required: 'Required' })}
						label='hex:'
						defaultValue={colorToEdit.code.hex}
						error={errors.code ? true : false}
						helperText={errors.code ? errors.code.message : null}
					/>
					<Box>
						<Button variant='outlined' className={classes.button} type='submit'>
							save
						</Button>
						<Button
							variant='outlined'
							className={classes.button}
							onClick={() => setEditing(false)}
						>
							cancel
						</Button>
					</Box>
				</Box>
			</Dialog>
			<Dialog
				open={dialogOpen}
				onClose={() => setDialogOpen(false)}
				aria-labelledby='add color'
				className={classes.dialog}
			>
				<AddColor updateColors={updateColors} setDialogOpen={setDialogOpen} />
			</Dialog>
		</Box>
	);
};

export default ColorList;
