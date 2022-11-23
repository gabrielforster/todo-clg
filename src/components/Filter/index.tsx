import {useState} from 'react';

import classes from './styles.module.scss';

interface FilterProps {
  value: string;
  onChange: (value: string) => void;
  options: {
    label: string;
    value: string;
  }[]
}

export const Filter = (props: FilterProps) => {
	return (
		<section className={classes.filter}>
			<select value={props.value} onChange={(e) => props.onChange(e.target.value)}>
				{props.options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</section>
	);
};
