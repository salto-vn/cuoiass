import * as React from 'react';
import { Theme, createStyles, withStyles, List, Modal, ListItem, ListItemText, Collapse, ListItemAvatar, Avatar, IconButton, InputAdornment, ListItemSecondaryAction } from '@material-ui/core';
import { IMenu } from '../../interface/IMenu';

import * as HandleRequest from '../../api/HandleRequest';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { IFood } from '../../interface/IFood';
import { convertCurrency, objectToQueryString } from '../../common/Utils';
import Danger from '../../common/Typography/Danger';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import SearchIcon from '@material-ui/icons/Search';

import CustomInput from '../../common/FormControls/CustomInput/CustomInput';
import API_URL from '../../bootstrap/Url';
import CustomLinearProgress from '../../common/CustomLinearProgress/CustomLinearProgress';
import { IDrink } from '../../interface/IDrink';
import { IOptionsItem } from '../../interface/IOptionsItem';

const styles = (theme: Theme) => createStyles({
    modal: {
        position: 'absolute',
        width: theme.spacing.unit * 100,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        // padding: theme.spacing.unit * 1,
        top: "50%",
        left: "50%",
        transform: `translate(-50%, -50%)`,
        height: "auto",
        maxHeight: "92%"
    },
    progress: {
        margin: 0
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
    title: {
        textTransform: "uppercase",
        position: "absolute",
        top: "20px",
        left: "10px",
        fontSize: "15px"

    },
    formControl: {
        paddingTop: "5px !important",
        marginTop: "0px !important",
        paddingRight: "33px",
        paddingLeft: "33px",
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
        maxHeight: "75vh",
        height: "fit-content",
    },

    flag: {
        zIndex: 999
    },

    nptb: {
        paddingTop: 0,
        paddingBottom: 0
    }

});

class MenuPopup extends React.Component<{ title: string, isShowModal: boolean, onToggleMenuModal: any, data: any, classes?: any, service_code: string, type: string, isLoading: boolean },
    { time: any, open: any, openAll: boolean, menu_name: any, isLoading: boolean, searchRs: any, errorInfo: string, isFilter: boolean }> {

    abortControler = new AbortController();
    public state = {
        open: [],
        openAll: false,
        menu_name: "",
        isLoading: this.props.isLoading,
        searchRs: this.props.data,
        errorInfo: '',
        time: undefined,
        isFilter: false,
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
        this.setState({ open });
    }

    public componentDidUpdate(prevProps: any) {
        if (this.props.isLoading !== prevProps.isLoading) {
            this.setState({ isLoading: this.props.isLoading });
        }
    }

    public onToggleModal = (evt: any) => {
        this.props.onToggleMenuModal(evt);
        this.abortControler.abort();
    }

    public handleClick = (index: number, evt: any) => {
        const { open } = this.state;
        open[index] = !open[index];
        this.setState({ open });
    }

    public handleExplanAll = (evt: any) => {
        const { data } = this.props;
        let open: any = [];
        data.forEach((element: any) => {
            open.push(!this.state.openAll);
        });
        this.setState({ open, openAll: !this.state.openAll });
    }

    public handleFilter = (evt: any) => {
        this.setState({
            menu_name: evt.target.value
        }, () => {
            return
        });
        // set interval time
        clearTimeout(this.state.time);
        const that = this;
        const timeout = setTimeout(() => {
            that.getMenuByMenuName();
        }, 800);
        this.setState({ time: timeout });
    }

    private getMenuByMenuName = async () => {

        this.setState({ isLoading: true });
        const { menu_name } = this.state;
        var search = { menu_name: menu_name }
        var exParams = { menu_type: this.props.type, service_code: this.props.service_code }
        const filters = objectToQueryString(search);
        const signal = this.abortControler.signal;
        //TODO set request api page, limit
        // Call api get Feedback
        const response = await HandleRequest.GetList(API_URL.BOOKING_CRL_getMenus, 1, 100000, "menu_name", "desc", filters, exParams, signal);
        if (response.isError) {
            return this.setState({ errorInfo: response.message });
        }

        this.setState({
            searchRs: response.result.data,
            isLoading: false,
            isFilter: true,
        });

    }

    /**
     * 
     */
    private handleSelect = (index: number, type: string, evt: any) => {
        this.props.onToggleMenuModal(evt);
        const { isFilter, searchRs } = this.state;
        const { data } = this.props;
        var menus: any = isFilter ? searchRs : data;
        let selectedMenu = menus[index];
        if (type === 'food') {
            var foods = selectedMenu.foods.map((food: IFood, index: number) => {
                return {
                    booked_menu: selectedMenu.name,
                    menu_price: selectedMenu.menu_price,
                    id: food.id,
                    name: food.name,
                    unit_price: food.unit_price,
                    booked_total: 0
                };
            });

            localStorage.setItem('SELECTED_MENU_TMP', JSON.stringify({ foods: foods }));
        } else {
            var drinks = selectedMenu.drinks.map((drink: IDrink, index: number) => {
                return {
                    booked_menu: selectedMenu.name,
                    menu_price: selectedMenu.menu_price,
                    id: drink.id,
                    name: drink.name,
                    unit_price: drink.unit_price,
                    booked_total: 0
                };
            });

            localStorage.setItem('SELECTED_MENU_TMP', JSON.stringify({ drinks: drinks }));
        }

        //clean form
        this.setState(
            {
                open: [],
                openAll: false,
                menu_name: "",
                isLoading: this.props.isLoading,
                searchRs: this.props.data,
                errorInfo: '',
                time: undefined,
                isFilter: false
            });

    }

    public render() {
        const { classes, title, data, type } = this.props;
        const { open, openAll, searchRs, isLoading, isFilter } = this.state;
        var menus = isFilter ? searchRs : data;
        let filterHeader = <CustomInput
            id="menu_name"
            formControlProps={{
                fullWidth: true,
                className: classes.formControl
            }}
            inputProps={{
                type: "text",
                name: "menu_name",
                value: this.state.menu_name,
                onChange: this.handleFilter,
                placeholder: "Tìm kiếm",
                autoFocus: true,
                endAdornment: (
                    <InputAdornment
                        position="start"
                    >
                        <SearchIcon />
                    </InputAdornment>
                )
            }}
        />

        var listItemsMain = menus.map((menu: IMenu, index: number) => {
            var m: any = type === 'food' ? menu.foods : type === 'drink' ? menu.drinks : menus;
            var item = <div key={index + 1}>
                <ListItem button className={classes.nptb}>
                    <span className={classes.id}>{menu.id}</span>
                    <ListItemText primary={menu.name} onClick={this.handleSelect.bind(this, index, type)} />
                    <IconButton aria-label="Select" onClick={this.handleClick.bind(this, index)}>
                        {open[index] ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                </ListItem>
                <Collapse in={open[index]} timeout="auto" unmountOnExit>
                    <List component="dt" disablePadding>
                        {
                            m.map((food: IFood, i: number) => {
                                var foodItem = <div className={classes.inline}>
                                    <span>{food.name}</span>
                                    <span className={classes.right}>
                                        <Danger>{convertCurrency('vi-VN', food.unit_price)}</Danger>
                                    </span>
                                </div>
                                return <ListItem key={i} className={classes.nested}>
                                    <ListItemAvatar>
                                        <Avatar src={food.images[0].img_url} />
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
                    <div>
                        {isLoading &&
                            <CustomLinearProgress className={classes.progress}
                                color="info"
                            />
                        }
                    </div>
                    <div style={{ display: "flow-root" }}>
                        <span className={classes.title}>{title + this.props.type === 'drink' ? "Nước uống" : "Món ăn"}</span>
                        {!openAll ?
                            <IconButton aria-label="Explain all" className={classes.right + " " + classes.icon} onClick={this.handleExplanAll}>
                                <AddIcon fontSize="small" />
                            </IconButton> :
                            <IconButton aria-label="Explain all less" className={classes.right + " " + classes.icon} onClick={this.handleExplanAll}>
                                <RemoveIcon fontSize="small" />
                            </IconButton>
                        }
                    </div>
                    <div>
                        {filterHeader}
                    </div>

                    <List
                        component="nav"
                        // subheader={<ListSubheader className={classes.title} component="div">{title}</ListSubheader>}
                        className={classes.root}
                    >
                        {listItemsMain}
                    </List>
                </div>
            </Modal>
        </div>);
    }
}

export default withStyles(styles)(MenuPopup)