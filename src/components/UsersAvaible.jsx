import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Checkbox from '@material-ui/core/Checkbox';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { DataGrid } from '@material-ui/data-grid';
import UserDetail from './UserDetail'

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
  { field: 'id', headerName: 'ID', width: 150 },
  { field: 'name', headerName: 'Nome', width: 170 },
  { field: 'pokemons', headerName: '', width: 0 }
]

export default function CustomizedDialogs({open, handleClose, avaibleUsers, selectedOffer}) {

  const [openDetails, setOpenDetails] = React.useState(false);
  const [detailsUser, setDetailsUser] = React.useState({});

  const handleClickOpenDetails = (user) => {
    setOpenDetails(true);
    setDetailsUser(user.data)
  };

  const handleCloseDetails = () => {
    setOpenDetails(false);
  };

  return (
    <div>
      <Dialog maxWidth="lg" onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Usuários Disponíveis para troca
        </DialogTitle>

        <DialogContent dividers>
          <div style={{ height: 400, width: 600 }}>
            <DataGrid onRowSelected={handleClickOpenDetails} rows={avaibleUsers} columns={columns} pageSize={5} />
          </div>
        </DialogContent>
      </Dialog>

      <UserDetail open={openDetails} handleClose={handleCloseDetails} selectedOffer={selectedOffer} detailsUser={detailsUser} acceptProposal={true}/>
    </div>
  );
}