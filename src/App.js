import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Adb from '@material-ui/icons/Adb';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import UserDetail from './components/UserDetail'
import UsersAvaible from './components/UsersAvaible'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios'
import { uniqueNamesGenerator, Config, adjectives, colors, animals } from 'unique-names-generator';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  table: {
    minWidth: 700,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(10),
    right: theme.spacing(40),
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function Album() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [detailsUser, setDetailsUser] = React.useState({});

  const [users, setUsers] = React.useState([])
  const [offers, setOffers] = React.useState([])

  const [openAvaibleUsers, setOpenAvaibleUsers] = React.useState(false);
  const [avaibleUsers, setAvaibleUsers] = React.useState([]);
  const [selectedOffer, setSelectedOffer] = React.useState([]);

  const [tabValue, setTabValue] = React.useState(0);

  React.useEffect(() => {
    getUsers()
    console.log('render!');
  }, [])

  React.useEffect(() => {
    getOffers()
    console.log('render!');
  }, [])

  const getUsers = async () => {
    const res = await axios.get('https://2jxq84cbl2.execute-api.sa-east-1.amazonaws.com/dev/users')
    setUsers(res.data)
  }

  const getOffers = async () => {
    const res = await axios.get('https://2jxq84cbl2.execute-api.sa-east-1.amazonaws.com/dev/proposals')
    setOffers(res.data)
  }

  const addUser = async () => {
    const randomName = uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] });
    await axios.post('https://2jxq84cbl2.execute-api.sa-east-1.amazonaws.com/dev/user', {name: randomName})
    getUsers()
  }

  const handleClickOpen = (user) => {
    setOpen(true);
    setDetailsUser(user)
  };

  const handleClickOpenAvaibleUsers = (users, offer) => {
    setOpenAvaibleUsers(true);
    setAvaibleUsers(users)
    setSelectedOffer(offer)
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseAvaibleUsers = () => {
    setOpenAvaibleUsers(false);
  };

  const  a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Adb className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            Poke Trading
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Poke Trading
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Selecione o usuário para propor a troca, ou simplesmente aceita uma oferta selecionando pokemons.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    Main call to action
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    Secondary action
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            <AppBar position="static">
              <Tabs value={tabValue} onChange={handleChange} aria-label="simple tabs example">
                <Tab label="Usuários" {...a11yProps(0)} />
                <Tab label="Trocas ofertadas" {...a11yProps(1)} />
              </Tabs>
            </AppBar>
            <TabPanel value={tabValue} index={0}>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Name</StyledTableCell>
                      <StyledTableCell align="left">Pokemons</StyledTableCell>
                      <StyledTableCell align="left"></StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users && users.map((user) => (
                      <StyledTableRow key={user.id}>
                        <StyledTableCell component="th" scope="row">
                          {user.name}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                        <AvatarGroup max={6}>
                          {user.pokemons.map(poke => <Avatar alt={poke.name} src={poke.img} />)}
                        </AvatarGroup>
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          <Button size="small" color="primary" onClick={() => handleClickOpen(user)}>
                            Propor troca
                          </Button>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Fab aria-label={'Add'} className={classes.fab} onClick={()=>addUser()} color={'primary'}>
                <AddIcon />
              </Fab>
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell align="left">Pokemons</StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {offers && offers.map((offer) => (
                  <StyledTableRow key={offer.id}>
                    <StyledTableCell component="th" scope="row">
                      {offer.userOfered.name}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                    <AvatarGroup max={6}>
                      {offer.pokemonsOffered.map(poke => <Avatar alt={poke.name} src={poke.img} />)}
                    </AvatarGroup>
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      <Button size="small" color="primary" onClick={() => handleClickOpenAvaibleUsers(users.filter(user => user.id !== offer.userId), offer)}>
                        Aceitar troca
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </TabPanel>
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
      <UserDetail open={open} handleClose={handleClose} detailsUser={detailsUser} acceptProposal={false}/>
      <UsersAvaible open={openAvaibleUsers} handleClose={handleCloseAvaibleUsers} selectedOffer={selectedOffer} avaibleUsers={avaibleUsers}/>
    </React.Fragment>
  );
}