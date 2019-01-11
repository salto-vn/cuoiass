import * as React from 'react';
import { Theme, createStyles, withStyles, List, ListSubheader, Modal, ListItem, ListItemText, Collapse, ListItemAvatar, Avatar, IconButton } from '@material-ui/core';
import { IMenu } from '../../interface/IMenu';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { IFood } from '../../interface/IFood';
import { convertCurrency } from '../../common/Utils';
import Danger from '../../common/Typography/Danger';
import AddIcon from '@material-ui/icons/Add';

const styles = (theme: Theme) => createStyles({
    modal: {
        position: 'absolute',
        width: theme.spacing.unit * 100,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 1,
        top: "50%",
        left: "50%",
        transform: `translate(-50%, -50%)`,
        height: "auto",
        maxHeight: 660
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
    title: {
        textTransform: "uppercase",
        position: "static",
        fontSize: "15px"

    },

    id: {
        paddingRight: "5px",
        width: "2%"
    },

    inline: {
        display: 'inline',
    },

    right: {
        float: 'right'
    },

    root: {
        overflowY: "scroll",
        maxHeight: 600
    },


});

class MenuPopup extends React.Component<{ title: string, isShowModal: boolean, onToggleMenuModal: any, data: any, classes?: any }, { open: any ,openAll:boolean}> {


    public state = {
        open: [],
        openAll:false,
    }

    public componentDidMount() {
        const { data } = this.props;
        let open: any = [];
        data.forEach((element: any) => {
            open.push(false);
        });
        this.setState({ open })
    }

    public onToggleModal = (evt: any) => {
        this.props.onToggleMenuModal(evt);
    }

    public handleClick = (index: number, evt: any) => {
        const { open } = this.state;
        open[index] = !open[index];
        this.setState({ open });
    }

    public handleExplanAll = (evt:any) => {
        const { data } = this.props;
        let open: any = [];
        data.forEach((element: any) => {
            open.push(!this.state.openAll);
        });
        this.setState({ open });
    }


    public render() {
        const { data, classes, title } = this.props;
        debugger;
        const { open } = this.state;
        var listItems = data.map((menu: IMenu, index: number) => {
            var item = <div key={index}>
                <ListItem button onClick={this.handleClick.bind(this, index)}>
                    <span className={classes.id}>{menu.id}</span>
                    <ListItemText primary={menu.name} />
                    {open[index] ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open[index]} timeout="auto" unmountOnExit>
                    <List component="dt" disablePadding>
                        {
                            menu.foods.map((food: IFood, i: number) => {
                                var foodItem = <div className={classes.inline}>
                                    <span>{food.food_name}</span>
                                    <span className={classes.right}>
                                        <Danger>{convertCurrency('vi-VN', food.unit_price)}</Danger>
                                    </span>
                                </div>
                                return <ListItem key={i} button className={classes.nested}>
                                    <ListItemAvatar>
                                        <Avatar src={food.food_images[0]} />
                                    </ListItemAvatar>
                                    <ListItemText inset primary={foodItem} />
                                </ListItem>
                            })
                        }
                    </List>
                </Collapse>
            </div>
            return item;
        })

        return (<div>
            <Modal
                open={this.props.isShowModal}
                onClose={this.onToggleModal}>
                <div className={classes.modal}>
                    <div><span className={classes.title}>{title}</span>
                        <span className={classes.right}>
                            <IconButton aria-label="Delete" className={classes.margin} onClick={this.handleExplanAll}>
                                <AddIcon fontSize="small" />
                            </IconButton>
                        </span></div>
                    <List
                        component="nav"
                        // subheader={<ListSubheader className={classes.title} component="div">{title}</ListSubheader>}
                        className={classes.root}
                    >
                        {listItems}
                    </List>
                </div>
            </Modal>
        </div>);
    }
}

export default withStyles(styles)(MenuPopup)