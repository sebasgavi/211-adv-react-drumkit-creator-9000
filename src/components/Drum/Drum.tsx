import { Box, createStyles, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { DrumType } from '../../utils/DrumType';

export type DrumProps = Omit<DrumType, 'price'|'id'>;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      boxShadow: '2px 2px 5px black',
      width: (props: any) => props.width,
      height: (props: any) => props.height,
      backgroundColor: (props: any) => props.shellColor,
      borderTop: (props: any) => `5px solid ${props.headColor}`,
      borderBottom: (props: any) => props.snare ? `2px solid gray` : 'none',
    },
  })
);

export const Drum: React.FC<DrumProps> = ({ diameter, height, shellColor, headColor, snare }) => {
  const mult = 30;

  const classes = useStyles({
    width: diameter * mult,
    height: height * mult,
    shellColor,
    headColor,
    snare,
  });

  return <Box m={3} className={classes.root}></Box>;
}