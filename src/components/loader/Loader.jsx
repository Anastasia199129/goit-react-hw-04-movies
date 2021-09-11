import React from 'react';
import s from './loader.module.css';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const LoaderHearts = () => {
  return (
    <div className={s.loader}>
      <Loader type="Hearts" color="#00BFFF" height={200} width={200} />
    </div>
  );
};

export default LoaderHearts;
