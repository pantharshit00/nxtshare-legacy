import React, { Component } from 'react';
import Proptypes from 'prop-types';


class ScrollReveal extends Component {
    componentDidMount() {
        if (typeof window !== 'undefined') {
            const { sid, origin, distance, delay, duration } = this.props;
            window.sr.reveal('#' + sid, {
                origin,
                distance,
                duration,
                delay
            });
        }
    }
    render() {
        return (
            <div id={this.props.sid}>
                {this.props.children}
            </div>
        );
    }
}

ScrollReveal.defaultProps = {
    origin:'bottom',
    distance: '20px',
    duration: 500,
    delay:0
};

ScrollReveal.propTypes = {
    sid: Proptypes.string.isRequired
};

export default ScrollReveal;