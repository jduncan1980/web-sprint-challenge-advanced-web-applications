import React from 'react';
import { useHistory } from 'react-router-dom';
import {
	TextField,
	Box,
	Button,
	Typography,
	makeStyles,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import axiosWithAuth from '../utils/axiosWithAuth';

const useStyles = makeStyles({
	container: {
		backgroundColor: '#fff',
		width: '80%',
		padding: '10%',
		margin: '0 auto',
		borderRadius: '15px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	heading: {
		fontSize: '3rem',
		marginTop: '4rem',
	},
	input: {
		width: '90%',
		// display: 'block',
		margin: '30px auto',
	},
});

const AddColor = ({ updateColors, setDialogOpen }) => {
	const classes = useStyles();
	const { handleSubmit, register, errors, formState, reset } = useForm({
		mode: 'onChange',
	});
	const history = useHistory();

	const onSubmit = async (data) => {
		try {
			const response = await axiosWithAuth().post('/colors', data);
			updateColors(response.data);
			console.log(response);
			reset();
			history.push('/bubbles');
			setDialogOpen(false);
		} catch (error) {
			alert(`Something went wrong => ${error}`);
		}
	};

	return (
		// <Box>
		<Box
			component='form'
			onSubmit={handleSubmit(onSubmit)}
			className={classes.container}
		>
			<Typography variant='h5' color='initial'>
				Add Color
			</Typography>
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
				error={errors.code ? true : false}
				helperText={errors.code ? errors.code.message : null}
			/>

			<Button
				variant='contained'
				color='primary'
				size='large'
				type='submit'
				disabled={!formState.isValid}
				className={classes.button}
			>
				Submit
			</Button>
		</Box>
		// </Box>
	);
};
export default AddColor;
