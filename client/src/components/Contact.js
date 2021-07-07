import React from 'react';
import {
	Box,
	TextField,
	Button,
	Typography,
	makeStyles,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';

const useStyles = makeStyles({
	container: {
		backgroundColor: 'rgba(211,199,221,0.9)',
		width: '50%',
		padding: '2%',
		margin: '10% auto',
		borderRadius: '15px',
	},
	heading: {
		fontSize: '3rem',
		marginTop: '4rem',
	},
	input: {
		width: '90%',
		display: 'block',
		margin: '30px auto',
	},
	button: {
		margin: '15px',
		display: 'block',
	},
});

export default function Contact({ setDialogOpen }) {
	const { handleSubmit, register, errors, formState } = useForm({
		mode: 'onChange',
	});
	const classes = useStyles();

	const onSubmit = async (data) => {
		setDialogOpen(false);
		alert(
			`Thank you, ${data.name}. Your message '${data.message} has been sent with email ${data.email}'`
		);
	};
	return (
		<Box component='form' onSubmit={handleSubmit(onSubmit)}>
			<Typography variant='h6' style={{ textAlign: 'center' }}>
				Get In Touch
			</Typography>
			<TextField
				className={classes.input}
				fullWidth={true}
				autoFocus
				variant='outlined'
				type='text'
				id='name'
				name='name'
				inputRef={register({ required: 'Required' })}
				label='Name:'
				error={errors.name ? true : false}
				helperText={errors.name ? errors.name.message : null}
			/>

			<TextField
				className={classes.input}
				fullWidth={true}
				variant='outlined'
				type='text'
				id='email'
				name='email'
				inputRef={register({ required: 'Required' })}
				label='Email:'
				error={errors.email ? true : false}
				helperText={errors.email ? errors.email.message : null}
			/>

			<TextField
				className={classes.input}
				fullWidth={true}
				multiline
				variant='outlined'
				type='text'
				id='message'
				name='message'
				inputRef={register({ required: 'Required' })}
				label='Message:'
				error={errors.message ? true : false}
				helperText={errors.message ? errors.message.message : null}
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
	);
}
