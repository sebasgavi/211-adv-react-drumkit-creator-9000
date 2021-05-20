import { Button, ButtonProps, createStyles, makeStyles, Theme } from '@material-ui/core';
import React from 'react';

type BtnProps = ButtonProps & {
  
}

export const Btn: React.FC<BtnProps> = ({ children, ...props }) => {

  const classes = useStyles();

  return <Button className={classes.root} classes={{ label: classes.label, disabled: classes.disabled }} { ...props }>
    {children}
  </Button>;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    '@global': {
      'body': {
        backgroundColor: 'lightblue',
      }
    },
    root: {
      // backgroundColor: theme.palette.primary.main,
      '& .MuiButton-label': {
        color: 'orange',
      }
    },
    label: {
      fontWeight: 'bold',
    },
    disabled: {
      opacity: .1,
    },
  })
);