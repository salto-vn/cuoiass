import * as React from 'react'

export default class LoadingGrid extends React.Component {
    public render() {
        return (
            <div className="wrap-item">
                <div className="timeline-wrapper">
                    <div className="timeline-item">
                        <div className="animated-background">
                            <div className="background-masker line-1" />
                            <div className="background-masker line-2" />
                            <div className="background-masker line-3" />
                            <div className="background-masker line-4" />
                            <div className="background-masker line-5" />
                            <div className="background-masker line-6" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};
