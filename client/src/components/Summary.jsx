/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-deprecated */
/* eslint-disable react/button-has-type */
// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import $ from 'jquery';
import IconButton from './IconButton';
import Modal from './Modal';
import shareIcon from '../assets/arrow.svg';
import heartIcon from '../assets/heart.svg';
import exitIcon from '../assets/exit.svg';
import circle from '../assets/circle.svg';
import star from '../assets/star.svg';
import styles from '../styles/summary.css';

class Summary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summary: {},
      show: false,
      type: null,
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  componentDidMount() {
    $.get('/properties', (data) => {
      this.setState({ summary: data[Math.floor(Math.random() * data.length)] });
    });
  }

  showModal(type) {
    this.setState({
      show: true,
      type,
    });
  }

  hideModal() {
    this.setState({ show: false });
  }

  render() {
    const { show, type, summary } = this.state;
    let modal;

    if (show) {
      modal = (
        <Modal
          icon={exitIcon}
          star={star}
          type={type}
          handleClose={this.hideModal}
          property={summary}
        />
      );
    }

    return (
      <div className={styles.summary}>
        <div className={styles.main}>
          <div id={styles.logo}>Abode</div>
          <div className={styles.header}>
            <IconButton icon={heartIcon} text="Save" handleClick={() => this.showModal('signin')} />
            <IconButton icon={shareIcon} text="Share" handleClick={() => this.showModal('share')} />
          </div>
          <div className={styles.body}>
            <div className={styles.specs}>
              <span className={styles.price}>${summary.marketValEst}</span>
              <span>{`${summary.numBd}bd`}</span>
              <span> | </span>
              <span>{`${summary.numBa}ba`}</span>
              <span> | </span>
              <span>{`${summary.sqft} sqft.`}</span>
              <div>
                {summary.address}
              </div>
              <div className={styles.format}>
                <div>
                  <img src={circle} alt="forSaleCirc" height="12" />
                  <span>For sale</span>
                  <span> | </span>
                  <span id="abestimate">
                    Abodestimate
                  </span>
                </div>
                <div>
                  <span>
                    {`Est. payment ${summary.monthlyPayment}/mo.  `}
                  </span>
                  <span>
                    Get pre-qualified
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.footer}>
            <button type="button" onClick={() => this.showModal('contact')}>Contact agent</button>
            <button type="button" onClick={() => this.showModal('tour')}>Take a tour</button>
          </div>
        </div>
        {modal}
      </div>
    );
  }
}

export default Summary;
