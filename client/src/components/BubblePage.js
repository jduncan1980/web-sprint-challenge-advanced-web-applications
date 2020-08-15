import React, { useState, useEffect } from 'react';
// import axios from "axios";
import axiosWithAuth from '../utils/axiosWithAuth';

import Bubbles from './Bubbles';
import ColorList from './ColorList';

const BubblePage = () => {
	const [colorList, setColorList] = useState([]);

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
			<Bubbles colors={colorList} />
		</>
	);
};

export default BubblePage;
