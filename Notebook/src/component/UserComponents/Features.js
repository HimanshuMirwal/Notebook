import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./UserComponentsCss/features.css";
var FontAwesome = require('react-fontawesome');

function Features() {
    return (
        <div>
            <div class="container-fluid">
                <div class="row row-div-features">
                <div className="col-12 feature-heading-title">Features</div>

                    <div class="col-lg-4 feature-box">
                        <FontAwesome
                            className='fa fa-book colors-icon'
                            size='5x'
                        />
                        <h3 class="feature-title">Unlimited Books.</h3>
                        <p>Access to unlimited books.</p>
                    </div>
                    <div class="col-lg-4 feature-box">
                        <FontAwesome
                            className="fa fa-download colors-icon"
                            size="5x"
                        />
                        <h3 class="feature-title">Free to download.</h3>
                        <p>Free acess to all books available on this website.</p>
                    </div>
                    <div class="col-lg-4 feature-box">
                    <FontAwesome className="fa fa-check-circle fa-5x colors-icon" />
                    <h3 class="feature-title">Easy To download.</h3>
                    <p>easy to download the books.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Features;
