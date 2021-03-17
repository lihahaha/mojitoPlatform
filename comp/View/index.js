import React from 'react';

export default class View extends React.PureComponent {
    render() {
        const { children } = this.props;

        return <div className="wp-view">{children}</div>;
    }
}