import React from 'react';
import PageHeader from '../../components/fragments/PageHeader';
import { ListAltRounded, ViewComfyRounded } from '@material-ui/icons';
import './style.css';
import img from '../../assets/img/dummy.jpg';

const data = [
  {
    caption: 'lorem ipsum dolor sit amet',
  },
  {
    caption: 'lorem ipsum dolor sit amet',
  },
  {
    caption: 'lorem ipsum dolor sit amet',
  },
  {
    caption: 'lorem ipsum dolor sit amet',
  },
  {
    caption: 'lorem ipsum dolor sit amet',
  },
  {
    caption: 'lorem ipsum dolor sit amet',
  },
  {
    caption: 'lorem ipsum dolor sit amet',
  },
  {
    caption: 'lorem ipsum dolor sit amet',
  },
  {
    caption: 'lorem ipsum dolor sit amet',
  },
  {
    caption: 'lorem ipsum dolor sit amet',
  },
];

const Home = () => {
  return (
    <div className="container-fluid">
      <PageHeader search={true} title="Home" />
      <div className="content">
        <Latest />
        <All />
      </div>
    </div>
  );
};

const Latest = () => {
  return (
    <div className="latest">
      <div className="row">
        <div className="content-title">
          <h4>Latest Post</h4>
        </div>
      </div>
      <div className="latest-group">
        <div className="row">
          <div className="col-sm-3 top-5">
            <figure className="img-all">
              <img src={img} alt="haha" />
              <figcaption className="caption">lorem</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
};

const All = () => {
  return (
    <div className="all-gal">
      <div className="row space content-title">
        <h4>All Gallery</h4>
        <div className="sort">
          <ListAltRounded />
          <ViewComfyRounded />
        </div>
      </div>
      <div className="all">
        <div className="row">
          {data.map((item, idx) => (
            <div key={idx} className="col-sm-3 top-5">
              <figure className="img-all">
                <img src={img} alt="haha" />
                <figcaption className="caption">{item.caption}</figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
