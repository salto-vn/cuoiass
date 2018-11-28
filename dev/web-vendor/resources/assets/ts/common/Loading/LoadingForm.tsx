
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
 * LoadingForm Class
 * Display loading if isLoading === true
 * <LoadingForm width={} height={} />
 * properties:IProp
 */
export default class LoadingForm extends React.Component<IProp> {
    public render() {
        const { width, height } = this.props;
        return (
            <div className="wrap-item">
                <div className="timeline-wrapper">
                    <div className="" style={{ width: width, minWidth: width, minHeight: height }}>
                        <div className="animated-background" style={{ height }} />
                    </div>
                </div>
            </div>
        );
    }
};
