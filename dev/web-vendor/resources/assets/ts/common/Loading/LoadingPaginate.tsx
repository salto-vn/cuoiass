import * as React from 'react'

interface IProp {
    width: number;
    height: number
}

export default class LoadingPaginate extends React.Component<IProp> {
    public render() {
        const { width, height } = this.props;
        return (
            <div className="wrap-item">
                <div className="timeline-wrapper">
                    <div className="timeline-item" style={{ minWidth: width, minHeight: height }}>
                        <div className="animated-background" style={{ height }} />
                    </div>
                </div>
            </div>
        );
    }
};
