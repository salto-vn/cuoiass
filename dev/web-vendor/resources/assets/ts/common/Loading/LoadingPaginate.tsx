import * as React from 'react'

/**
 * Interface
 * width: number
 * height: number
 */
interface IProp {
    width: number;
    height: number
}

/**
 * LoadingPaginate Class
 * Display loading pladeholder before display pagination
 * Display loading if isLoading === true
 * <LoadingPaginate width={} height={} />
 * properties:IProp
 */
export default class LoadingPaginate extends React.Component<IProp> {
    public render() {
        const { width, height } = this.props;
        return (
            <div className="wrap-item">
                <div className="timeline-wrapper">
                    <div className="timeline-item" style={{ width: width, minWidth: width, minHeight: height }}>
                        <div className="animated-background" style={{ height }} />
                    </div>
                </div>
            </div>
        );
    }
};
