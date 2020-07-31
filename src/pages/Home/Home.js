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
import { fetchAllGallery } from './actions';
import LinearProgress from '@material-ui/core/LinearProgress';
import moment from 'moment';

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
  const { isLoadingGallery, dataGallery } = useSelector((s) => s.Home);

  const [open, setOpen] = useState(false);
  const [imgModal, setImgModal] = useState();
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    dispatch(fetchAllGallery());
  }, [dispatch]);

  useEffect(() => {
    setGallery(dataGallery);
  }, [dataGallery]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleImage = (img) => {
    setImgModal(img);
  };

  const searchGallery = (e) => {
    const text = e.target.value;
    const searchData = dataGallery.filter((g) => new RegExp(text, 'i').exec([g.caption, g.album]));
    !text || text.length === 0 ? setGallery(dataGallery) : setGallery(searchData);
  };

  return (
    <>
      {isLoadingGallery && (
        <LinearProgress
          classes={{
            colorPrimary: classes.colorPrimary,
            barColorPrimary: classes.barColorPrimary,
          }}
        />
      )}
      <div className="container-fluid">
        <PageHeader search={true} onChange={searchGallery} title="Home" />
        {!isLoadingGallery && (
          <div className="content">
            <Latest />
            <All handleImage={handleImage} handleOpen={handleClickOpen} gallery={gallery} />
            <DialogImg open={open} onClose={handleClose} img={imgModal} />
          </div>
        )}
      </div>
    </>
  );
};

const Latest = () => {
  const { dataGallery } = useSelector((s) => s.Home);
  const sortedGallery = dataGallery
    .slice(0, 4)
    .sort((a, b) => {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    })
    .reverse();

  return (
    <div className="latest">
      <div className="row">
        <div className="content-title">
          <h4>Latest Post</h4>
        </div>
      </div>
      <div className="latest-group">
        <div className="row">
          {sortedGallery.map((item, idx) => (
            <div key={idx} className="col-sm-3 top-5">
              <figure className="img-all">
                <img src={item.imgUrl} alt="haha" />
                <figcaption className="caption">{item.caption}</figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const All = ({ handleImage, handleOpen, gallery }) => {
  const dataGallery = gallery;
  const openModal = (e, img) => {
    e.preventDefault();
    handleImage(img);
    handleOpen();
  };
  const [view, setView] = useState('grid');
  const setContent = (e, view) => {
    setView(view);
  };
  return (
    <div className="all-gal">
      <div className="row space content-title">
        <h4>All Gallery</h4>
        <div className="sort">
          <ListAltRounded style={{ cursor: 'pointer' }} onClick={(e) => setContent(e, 'list')} />
          <ViewComfyRounded style={{ cursor: 'pointer' }} onClick={(e) => setContent(e, 'grid')} />
        </div>
      </div>
      <div className="all">
        {view === 'grid' ? (
          <div className="grid-img">
            <div className="row">
              {dataGallery.map((item, idx) => (
                <div key={idx} className="col-sm-3 top-5">
                  <figure className="img-all" onClick={(e) => openModal(e, item.imgUrl)}>
                    <img src={item.imgUrl} alt="haha" />
                    <figcaption className="caption">{item.caption}</figcaption>
                  </figure>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <List dense={false}>
            {dataGallery.map((item, idx) => (
              <ListItem
                key={idx}
                style={{ cursor: 'pointer' }}
                onClick={(e) => openModal(e, item.imgUrl)}
              >
                <ListItemAvatar>
                  <Avatar alt="img" src={item.imgUrl} />
                </ListItemAvatar>
                <ListItemText
                  primary={item.caption}
                  secondary={
                    item.album
                      ? 'Album: ' + item.album + ', Date: ' + moment(item.createdAt).format('LLL')
                      : 'Album: None, Date: ' + moment(item.createdAt).format('LLL')
                  }
                />
              </ListItem>
            ))}
          </List>
        )}
      </div>
    </div>
  );
};

const DialogImg = ({ open, onClose, img }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={'md'}
      style={{ borderRadius: '10px', overflow: 'hidden' }}
    >
      <DialogContent>
        <div className="img-container">
          <img src={img} alt="img" width="100%" />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Home;
