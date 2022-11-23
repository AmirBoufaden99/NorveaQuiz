import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

function Result(props) {
    return (
        <CSSTransition
            className="container result"
            component="div"
            transitionName="fade"
            transitionEnterTimeout={800}
            transitionLeaveTimeout={500}
            transitionAppear
            transitionAppearTimeout={500}
        >
            <div>
                <p>Votre participation sera prise en considération!
                    Rendez-vous le 30 Novembre 2022 sur notre compte Instagram
                    <a href="https://www.instagram.com/noreva_tunisia/"> @noreva_tunisia* </a>
                    pour l’annonce des gagnants !
                </p>
            </div>
        </CSSTransition>
    );
}

Result.propTypes = {
    quizResult: PropTypes.string.isRequired
};

export default Result;