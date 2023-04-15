import React from 'react';
import preloader from './../../../assets/images/loader.gif';


const Preloader = ({ isFetching }) => {
    return (
        <div>
            {isFetching ? <img src={preloader} /> : null}
        </div>
    )
}

export default Preloader