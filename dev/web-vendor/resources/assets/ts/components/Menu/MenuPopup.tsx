import * as React from 'react';
import { Theme, createStyles, withStyles, List, Modal, ListItem, ListItemText, Collapse, ListItemAvatar, Avatar, IconButton, CircularProgress } from '@material-ui/core';
import { IMenu } from '../../interface/IMenu';

import * as HandleRequest from '../../api/HandleRequest';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { IFood } from '../../interface/IFood';
import { convertCurrency, objectToQueryString } from '../../common/Utils';
import Danger from '../../common/Typography/Danger';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import CustomInput from '../../common/FormControls/CustomInput/CustomInput';
import API_URL from '../../bootstrap/Url';

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
        maxHeight: "92%"
    },
    progress: {
        top: "calc(50% - 50px)",
        left: "calc(50% - 50px)",
        position: 'absolute',
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
    title: {
        textTransform: "uppercase",
        position: "absolute",
        top: "20px",
        fontSize: "15px"

    },
    formControl: {
        paddingTop: "5px !important",
        margin: "0px !important"
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

    icon: {
        marginRight: "13px",
    },

    root: {
        overflowY: "scroll",
        maxHeight: "90%",
        height: "80vh",
    },
    filterHeader: {
        paddingTop: 0,
    }

});

class MenuPopup extends React.Component<{ title: string, isShowModal: boolean, onToggleMenuModal: any, data: any, classes?: any },
    { open: any, openAll: boolean, filters: any, isLoading: boolean, searchRs: any, errorInfo: string }> {

    abortControler = new AbortController();
    public state = {
        open: [],
        openAll: false,
        filters: { filter_word: '', service_code: 0 },
        isLoading: true,
        searchRs: this.props.data,
        errorInfo: '',
    }

    public componentWillUnmount() {
        this.abortControler.abort();
    }

    public async componentDidMount() {
        const { data } = this.props;
        let open: any = [];
        data.forEach((element: any) => {
            open.push(false);
        });
        this.setState({ open, isLoading: false });
    }

    public onToggleModal = (evt: any) => {
        this.props.onToggleMenuModal(evt);
    }

    public handleClick = (index: number, evt: any) => {
        const { open } = this.state;
        open[index] = !open[index];
        this.setState({ open });
    }

    public handleExplanAll = (evt: any) => {
        const { data } = this.props;
        let open: any = [];
        debugger;
        data.forEach((element: any) => {
            open.push(!this.state.openAll);
        });
        this.setState({ open, openAll: !this.state.openAll });
    }

    public handleFilter = (evt: any) => {
        this.setState({
            filters: {
                ...this.state.filters,
                [evt.target.name]: evt.target.value ? evt.target.value : undefined
            }
        }, () => {
            this.getMenuByMenuName();
        });

    }

    private getMenuByMenuName = async () => {

        this.setState({ isLoading: true });
        const { filters } = this.state;
        filters.service_code = this.props.data.product.service_code;
        const filter = objectToQueryString(filters);
        const signal = this.abortControler.signal;
        //TODO set request api page, limit
        // Call api get Feedback
        const response = await HandleRequest.GetList(API_URL.getMenus, 1, 100000, "menu_name", "desc", filter, signal);
        debugger;
        if (response.isError) {
            return this.setState({ errorInfo: response.message });
        }

        this.setState({
            searchRs: response.result.data,
            isLoading: false,
        });

    }

    public render() {
        const { classes, title, data } = this.props;
        const { open, openAll, searchRs } = this.state;
        var menus = searchRs.length > 0 ? searchRs : data;
        let filterHeader = <CustomInput
            id="filter_word"
            formControlProps={{
                fullWidth: true,
                className: classes.formControl
            }}
            inputProps={{
                type: "text",
                value: this.state.filters.filter_word,
                onChange: this.handleFilter,
                placeholder: "Tìm kiếm"
            }}
        />
        var listItemsMain = [<ListItem key={0} className={classes.filterHeader}>
            <ListItemText primary={filterHeader} />
        </ListItem>];
        menus.map((menu: IMenu, index: number) => {
            var item = <div key={index + 1}>
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
                                return <ListItem key={i} className={classes.nested}>
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
            listItemsMain.push(item);
            return item;
        })

        return (<div>
            <Modal
                open={this.props.isShowModal}
                onClose={this.onToggleModal}>
                <div className={classes.modal}>
                    <div style={{ display: "flow-root" }}>
                        <span className={classes.title}>{title}</span>
                        {!openAll ?
                            <IconButton aria-label="Explain all" className={classes.right + " " + classes.icon} onClick={this.handleExplanAll}>
                                <AddIcon fontSize="small" />
                            </IconButton> :
                            <IconButton aria-label="Explain all less" className={classes.right + " " + classes.icon} onClick={this.handleExplanAll}>
                                <RemoveIcon fontSize="small" />
                            </IconButton>
                        }
                    </div>
                    <List
                        component="nav"
                        // subheader={<ListSubheader className={classes.title} component="div">{title}</ListSubheader>}
                        className={classes.root}
                    >
                        {menus.length > 0 ? listItemsMain : <CircularProgress className={classes.progress} />}
                    </List>
                </div>
            </Modal>
        </div>);
    }
}

export default withStyles(styles)(MenuPopup)