import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { DataGrid } from '@material-ui/data-grid';
import axios from 'axios'

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  }
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const columns = [
  { field: 'name', headerName: 'Pokemon', width: 170 },
  { field: 'base_experience', headerName: 'Experiência', width: 170 },
  { field: 'img', headerName: '', width: 10 },
  { 
    field: 'photo', 
    headerName: 'Imagem', 
    width: 130,
    sortable: false,
    valueGetter: (params) =>
      <Avatar alt={`${params.row.name}`} src={`${params.row.img}`} />
  },
]

export default function CustomizedDialogs({open, handleClose, detailsOffer, detailsAccept}) {

  const saveChanges = async () => {
    // TODO: CHAMAR API DE CONFIRMAR TRANSAÇÃO

    const offer = {
      user: {
        id: detailsOffer.userOfered.userId,
        name: detailsOffer.userOfered.name
      },
      pokemons: detailsOffer.pokemonsOffered
    }

    const accept = {
      user: {
        id: detailsAccept.id,
        name: detailsAccept.name
      },
      pokemons: detailsAccept.pokemons.filter(poke => detailsAccept.selectedPokemons.includes(poke.id))
    }

    const obj = {
      offer,
      accept
    }
    return await axios.patch(`https://2jxq84cbl2.execute-api.sa-east-1.amazonaws.com/dev/proposal/${detailsOffer.id}`, obj)
  }

  const checkDeal = () => {
    const totalPokeOffer = detailsOffer && detailsOffer.pokemonsOffered && detailsOffer.pokemonsOffered.reduce((acc, poke)=>{
      return acc + poke.base_experience
    }, 0)

    const totalPokeAccept = detailsAccept && detailsAccept.pokemons && detailsAccept.pokemons.filter(poke => detailsAccept.selectedPokemons.includes(poke.id) ).reduce((acc, poke)=>{
      return acc + poke.base_experience
    }, 0)

    const diff = totalPokeOffer - totalPokeAccept

    return diff > -25 && diff <25
  }

  return (
    <div>
      <Dialog maxWidth="lg" onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {`Dono da proposta: ${detailsOffer && detailsOffer.userOfered ? detailsOffer.userOfered.name : null}`}
        </DialogTitle>

        <DialogContent dividers>
          <div style={{ height: 400, width: 600 }}>
            {detailsOffer ? <DataGrid  rows={detailsOffer.pokemonsOffered} columns={columns} pageSize={5} /> : null}
          </div>
        </DialogContent>

        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {`Aceitante da proposta: ${detailsAccept.name}`}
        </DialogTitle>

        <DialogContent dividers>
          <div style={{ height: 400, width: 600 }}>
            { detailsAccept && detailsAccept.pokemons && <DataGrid rows={detailsAccept.pokemons.filter(poke => detailsAccept.selectedPokemons.includes(poke.id) )} columns={columns} pageSize={5} />}
          </div>
        </DialogContent>

        <DialogTitle id="customized-dialog-title" style={{color: checkDeal() ? 'blue' : 'red'}} onClose={handleClose}>
          {`Essa proposta é uma ${checkDeal() ? 'Troca Justa' : 'Troca Injusta'}`}
        </DialogTitle>

        <DialogActions>
          <Button autoFocus onClick={() => saveChanges()} disabled={!checkDeal()} color="primary">
            Confirmar Transação
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}