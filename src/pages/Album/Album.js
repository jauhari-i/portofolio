import React, { useState, useEffect } from 'react';
import PageHeader from '../../components/fragments/PageHeader';
import { ListAltRounded, ViewComfyRounded } from '@material-ui/icons';
import './style.css';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllAlbum, fetchDetailAlbum, fetchAlbumGallery } from './actions';
import LinearProgress from '@material-ui/core/LinearProgress';
import defaultImg from '../../assets/img/black.jpg';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  colorPrimary: {
    backgroundColor: '#777777',
  },
  barColorPrimary: {
    backgroundColor: '#999999',
  },
}));

const Home = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { isLoadingAlbum, dataAlbum } = useSelector((s) => s.Album);

  const [open, setOpen] = useState(false);
  const [album, setAlbum] = useState([]);
  const [albumId, setAlbumId] = useState();

  useEffect(() => {
    dispatch(fetchAllAlbum());
  }, [dispatch]);

  useEffect(() => {
    setAlbum(dataAlbum);
  }, [dataAlbum]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleImage = (id) => {
    setAlbumId(id);
  };

  const searchAlbum = (e) => {
    const text = e.target.value;
    const searchData = dataAlbum.filter((g) => new RegExp(text, 'i').exec([g.albumName]));
    !text || text.length === 0 ? setAlbum(dataAlbum) : setAlbum(searchData);
  };

  return (
    <>
      {isLoadingAlbum && (
        <LinearProgress
          classes={{
            colorPrimary: classes.colorPrimary,
            barColorPrimary: classes.barColorPrimary,
          }}
        />
      )}
      <div className="container-fluid">
        <PageHeader search={true} onChange={searchAlbum} title="Album" />
        {!isLoadingAlbum && (
          <div className="content">
            <All handleAlbum={handleImage} handleOpen={handleClickOpen} album={album} />
            <DialogImg open={open} onClose={handleClose} albumId={albumId} />
          </div>
        )}
      </div>
    </>
  );
};

const All = ({ handleAlbum, handleOpen, album }) => {
  const dataAlbum = album;
  const openModal = (e, id, size) => {
    e.preventDefault();
    if (size > 0) {
      handleAlbum(id);
      handleOpen();
    }
  };
  const [view, setView] = useState('grid');
  const setContent = (e, view) => {
    setView(view);
  };
  return (
    <div className="all-gal">
      <div className="row space content-title">
        <h4>All Albums</h4>
        <div className="sort">
          <ListAltRounded style={{ cursor: 'pointer' }} onClick={(e) => setContent(e, 'list')} />
          <ViewComfyRounded style={{ cursor: 'pointer' }} onClick={(e) => setContent(e, 'grid')} />
        </div>
      </div>
      <div className="all">
        {view === 'grid' ? (
          <div className="grid-img-album">
            <div className="row">
              {dataAlbum.map((item, idx) => (
                <div key={idx + item.albumId} className="col-sm-3 top-5">
                  <figure
                    className="img-all"
                    onClick={(e) => openModal(e, item.albumId, item.albumSize)}
                  >
                    <img src={item.thumbnail ? item.thumbnail : defaultImg} alt="haha" />
                    <figcaption className="caption-album">
                      {item.albumName} ({item.albumSize})
                    </figcaption>
                  </figure>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <List dense={false}>
            {dataAlbum.map((item, idx) => (
              <ListItem
                key={idx}
                style={{ cursor: 'pointer' }}
                onClick={(e) => openModal(e, item.albumId, item.albumSize)}
              >
                <ListItemAvatar>
                  <Avatar alt="img" src={item.thumbnail ? item.thumbnail : defaultImg} />
                </ListItemAvatar>
                <ListItemText primary={item.albumName} secondary={item.albumSize + ' items'} />
              </ListItem>
            ))}
          </List>
        )}
      </div>
    </div>
  );
};

const DialogImg = ({ open, onClose, albumId }) => {
  const dispatch = useDispatch();
  const { isLoadingDetail, isLoadingAlbumGallery, dataAlbumGallery, dataDetail } = useSelector(
    (s) => s.Album
  );
  useEffect(() => {
    if (albumId) {
      dispatch(fetchDetailAlbum(albumId));
      dispatch(fetchAlbumGallery(albumId));
    }
  }, [albumId, dispatch]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth={'lg'} style={{ borderRadius: '10px' }}>
      <DialogContent>
        {isLoadingDetail ? (
          <CircularProgress style={{ color: '#999999' }} />
        ) : isLoadingAlbumGallery ? (
          <CircularProgress style={{ color: '#999999' }} />
        ) : (
          <div>
            <div className="row">
              <div className="col-md-12">
                <div
                  className="album-detail"
                  style={{
                    backgroundImage: `url(${
                      dataDetail.thumbnail ? dataDetail.thumbnail : defaultImg
                    })`,
                  }}
                >
                  <h1>{dataDetail.albumName}</h1>
                </div>
              </div>
            </div>
            <div className="row" style={{ paddingBottom: '2rem' }}>
              {dataAlbumGallery.map((item, idx) => (
                <div key={idx} className="col-sm-3">
                  <figure className="img-all">
                    <img src={item.imgUrl} alt="haha" />
                    <figcaption className="caption">{item.caption}</figcaption>
                  </figure>
                </div>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Home;
