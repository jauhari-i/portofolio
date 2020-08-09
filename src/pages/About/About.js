import React, { useEffect, useState, useContext } from 'react';
import PageHeader from '../../components/fragments/PageHeader';
import './style.css';
import { Instagram, Twitter, MailRounded } from '@material-ui/icons';
import ContactForm from '../../components/forms/ContactForm';
import { fetchAbout, sendMessage } from './actions';
import { useDispatch, useSelector } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { reset } from 'redux-form';
import Skeleton from 'react-loading-skeleton';
import { AppContext } from '../../contexts';

const useStyles = makeStyles((theme) => ({
  colorPrimary: {
    backgroundColor: '#777777',
  },
  barColorPrimary: {
    backgroundColor: '#999999',
  },
}));

const About = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isLoadingAbout, message } = useSelector((s) => s.About);
  const [open, setOpen] = useState(false);
  const { setOpenDrawer } = useContext(AppContext);

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setOpenDrawer(false);
  }, [setOpenDrawer]);

  useEffect(() => {
    if (message === 'SUKSES') {
      setOpen(true);
      dispatch(reset('contactMe'));
    }
  }, [message, dispatch, setOpen]);

  useEffect(() => {
    dispatch(fetchAbout());
  }, [dispatch]);

  return (
    <>
      {isLoadingAbout && (
        <LinearProgress
          classes={{
            colorPrimary: classes.colorPrimary,
            barColorPrimary: classes.barColorPrimary,
          }}
        />
      )}
      <div className="container-fluid">
        <PageHeader search={false} title="About Me" />
        <Profile />
        <ContactSection />
        <DialogAbout open={open} onClose={onClose} />
      </div>
    </>
  );
};

const Profile = () => {
  const { isLoadingAbout, dataAbout } = useSelector((s) => s.About);
  if (isLoadingAbout) {
    return (
      <div className="col-md-12">
        <div className="row space profile">
          <div className="col-md-3">
            <div className="img-profile">
              <Skeleton circle={true} height={200} width={200} />
            </div>
          </div>
          <div className="col-md-9">
            <div style={{ marginTop: '20px' }} className="profile-info">
              <Skeleton height={200} width={500} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="col-md-12">
      <div className="row profile">
        <div className="col-md-3">
          <div className="img-profile">
            <img src={dataAbout.aboutImg} alt="hehe" className="img-circle" />
          </div>
        </div>
        <div className="col-md-9">
          <div className="profile-info">
            <h1>{dataAbout.aboutName}</h1>
            <p>{dataAbout.aboutDesc}</p>
            <div className="link-profile">
              <div className="row">
                <a
                  href="https://www.instagram.com/lunarlarasa"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Instagram fontSize="small" />
                </a>
                <a
                  href="https://www.twitter.com/lunarlarasa"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Twitter fontSize="small" />
                </a>
                <a href="mailto:lunarlarasa@gmail.com" rel="noopener noreferrer" target="_blank">
                  <MailRounded fontSize="small" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactSection = () => {
  const dispatch = useDispatch();

  const onSubmit = (values) => {
    dispatch(sendMessage(values));
  };
  return (
    <div className="content">
      <div className="row">
        <div className="content-title">
          <h4>Contact Me</h4>
        </div>
      </div>
      <ContactForm onSubmit={onSubmit} />
    </div>
  );
};

export const DialogAbout = ({ open, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={'sm'}
      style={{ borderRadius: '10px', overflow: 'hidden' }}
    >
      <DialogTitle id="alert-dialog-title">{'Pesan telah terkirim'}</DialogTitle>
      <DialogContent>
        <div className="center">
          <button
            className="button-submit"
            onClick={(e) => {
              e.preventDefault();
              onClose();
            }}
          >
            Tutup
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default About;
