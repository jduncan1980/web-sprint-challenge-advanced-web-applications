import React, { useState, useEffect } from 'react';
import Contact from './Contact';
import axiosWithAuth from '../utils/axiosWithAuth';
import { Dialog } from '@material-ui/core';
import Bubbles from './Bubbles';
import ColorList from './ColorList';

const BubblePage = () => {
	const [colorList, setColorList] = useState([]);
	const [dialogOpen, setDialogOpen] = useState(false);
	useEffect(() => {
		async function getColors() {
			try {
				const response = await axiosWithAuth().get('/colors');
				setColorList(response.data);
			} catch (error) {
				alert(`Something Went Wrong => ${error}`);
			}
		}
		getColors();
	}, []);

	return (
		<>
			<ColorList colors={colorList} updateColors={setColorList} />
			<Bubbles colors={colorList} setDialogOpen={setDialogOpen} />
			<Dialog
				open={dialogOpen}
				onClose={() => setDialogOpen(false)}
				aria-labelledby='contact'
			>
				<Contact setDialogOpen={setDialogOpen} />
			</Dialog>
		</>
	);
};

export default BubblePage;
