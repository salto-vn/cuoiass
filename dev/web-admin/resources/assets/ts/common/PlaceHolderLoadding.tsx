import * as React from 'react'

interface IProp {
    itemRepeat: number
}

export default class PlaceHolderLoadding extends React.Component<IProp> {
    public makeItem = () => {
        const { itemRepeat } = this.props;

        if (itemRepeat === 0) {
            return;
        }

        let i = 0;
        const arrItem = [];
        for (; i < itemRepeat; i++) {
            // arrItem.push(this.item(i));
        }
        return arrItem;
    }

    public item = (key: number) => {
        return <div className="wrap-item" key={key}>
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
        </div>;
    }

    public render() {
        return (
            this.makeItem()
        )
    }
};
