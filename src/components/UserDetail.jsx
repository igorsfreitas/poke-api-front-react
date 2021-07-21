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
import TransactionSummary from './TransactionSummary'
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

export default function CustomizedDialogs({open, handleClose, detailsUser, selectedOffer, acceptProposal}) {

  const [test, setTest] = React.useState({});

  const [selectedPokemons, setSelectedPokemons] = React.useState([])
  const [openProposalConfirm, setOpenProposalConfirm] = React.useState(false);

  const handleOpenProposalConfirm = () => {
    setOpenProposalConfirm(true);
  };

  const handleCloseProposalConfirm = () => {
    setOpenProposalConfirm(false);
  };

  function currentlySelected(selections) {
    if (test !== selections) {
      setTest(selections)
      let arr
      selectedPokemons.map(selected => {
        if(selectedPokemons.includes(selections.data.id)){
          arr = selectedPokemons.filter(pokemon => pokemon != selected)
          return setSelectedPokemons(arr)
        }
      })
      return selectedPokemons.push(selections.data.id)
    }
  }

  const saveChanges = async () => {
    // TODO: CHAMAR API DE ABRIR PROPOSTA OU ACEITAR PROPOSTA
    if(acceptProposal) {
     return handleOpenProposalConfirm()
    }
    const proposal = {
      "userOfered": {
        "name": detailsUser.name,
        "userId": detailsUser.id
      },
      "pokemonsOffered": detailsUser.pokemons.filter(poke => selectedPokemons.includes(poke.id))
    }

    return await axios.post('http://2jxq84cbl2.execute-api.sa-east-1.amazonaws.com/dev/proposal', proposal)
  }

  const objAccept = {
    ...detailsUser,
    selectedPokemons
  }

  return (
    <div>
      <Dialog maxWidth="lg" onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {detailsUser.name}
        </DialogTitle>

        <DialogContent dividers>
          <div style={{ height: 400, width: 600 }}>
            <DataGrid  onRowSelected={currentlySelected} rows={detailsUser.pokemons} columns={columns} pageSize={5} checkboxSelection />
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => saveChanges()} color="primary">
            {acceptProposal ? 'Aceitar Proposta' : 'Abrir Proposta' }
          </Button>
        </DialogActions>
      </Dialog>
      <TransactionSummary open={openProposalConfirm} handleClose={handleCloseProposalConfirm} detailsOffer={selectedOffer} detailsAccept={objAccept}/>
    </div>
  );
}