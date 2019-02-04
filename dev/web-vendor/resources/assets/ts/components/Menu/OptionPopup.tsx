import * as React from 'react';
import { Theme, createStyles, withStyles, List, Modal, ListItem, ListItemText, ListItemAvatar, Avatar, ListItemSecondaryAction, Checkbox, Typography, ListSubheader } from '@material-ui/core';
import { convertCurrency, filterEmpty, mergeArray, isEmpty } from '../../common/Utils';

import CustomLinearProgress from '../../common/CustomLinearProgress/CustomLinearProgress';
import { IOptionsItem } from '../../interface/IOptionsItem';
import Button from '../../common/FormControls/CustomButtons/Button';
import SaveIcon from '@material-ui/icons/Save';
import { IBookedOption } from '../../interface/IBookedOption';

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
    footerRight: {
        textAlign: "right",
        width: "100%"
    },
    progress: {
        margin: 0
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
    title: {
        textTransform: "uppercase",
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
        top: "50%",
        right: "4px",
        position: "absolute",
        transform: "translateY(-50%)"
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
    },

});

class OptionPopup extends React.Component<{ selected: any, isShowModal: boolean, onToggleMenuModal: any, data: any, classes?: any, isLoading: boolean },
    { open: any, openAll: boolean, checked: any }> {

    abortControler = new AbortController();
    public state = {
        open: [],
        openAll: false,
        checked: [],
    }


    public onToggleModal = (evt: any) => {
        this.props.onToggleMenuModal(evt);
    }

    handleToggleCheckbox = (value: number) => () => {
        const { checked } = this.state;
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        this.setState({
            checked: newChecked,
        });
    };

    /**
     * 
     */
    private handleSelect = (index: number, type: string, evt: any) => {
        const { data,selected } = this.props;
        const { checked } = this.state;
        this.props.onToggleMenuModal(evt);
        debugger;
        var selectedOptions = data.map((option: IOptionsItem, i: number) => {
            var checkedIndex = checked.indexOf(option.id);
            if (checkedIndex !== -1) {
                let empty = isEmpty(selected[checkedIndex]);
                return {
                    booked_opt_id: empty ? "" : selected[checkedIndex].booked_opt_id,
                    option_id: option.id,
                    option_name: option.name,
                    option_price: option.unit_price,
                    option_quality: empty ? 0 : selected[checkedIndex].option_quality,
                    action: empty ? 'NEW' : ''
                };
            }
        });
        selectedOptions = filterEmpty(selectedOptions);
        localStorage.setItem('SELECTED_MENU_TMP', JSON.stringify({ options: selectedOptions }));

        //clean form
        this.setState({
            open: [],
            openAll: false,
        });
    }

    private handleSelectAll = (evt: any) => {
        const { data } = this.props;
        const { openAll } = this.state;
        var newChecked: any = [];
        if (!openAll) {
            data.map((option: IOptionsItem, i: number) => {
                newChecked.push(option.id);
            });

        }
        this.setState({ checked: newChecked, openAll: !openAll });
    }

    componentDidMount() {
        const { selected } = this.props;
        //Build cheched checkbox via selectedOption Prop
        if (selected !== undefined) { 
            let checked = selected.map((option: IBookedOption) => {
                if(option.action !='DEL') {
                    return option.option_id;
                }
            });
            this.setState({
                checked
            })
        }
    }

    public render() {
    const { classes, data, isLoading } = this.props;
    const { openAll, checked } = this.state;

    var listItemsMain = data.map((option: IOptionsItem, i: number) => {
        return <ListItem key={i} button>
            <ListItemAvatar>
                <Avatar
                    alt={option.name}
                    src={option.images.length > 0 ? option.images[0].img_url : ""}
                />
            </ListItemAvatar>
            <ListItemText primary={option.name}
                secondary={
                    <React.Fragment>
                        <Typography component="span" className={classes.inline} color="textPrimary">
                            {convertCurrency('vi-VN', option.unit_price)}
                        </Typography>
                    </React.Fragment>
                } />
            <ListItemSecondaryAction>
                <Checkbox
                    onChange={this.handleToggleCheckbox(option.id)}
                    checked={checked.indexOf(option.id) !== -1}
                />
            </ListItemSecondaryAction>
        </ListItem>
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
                <List
                    dense
                    className={classes.root}
                    subheader={
                        <ListSubheader>
                            <span className={classes.title}>Option</span>
                            <Checkbox className={classes.right}
                                onChange={this.handleSelectAll}
                                checked={openAll}
                            />
                        </ListSubheader>
                    }
                >
                    {listItemsMain}
                </List>
                <div className={classes.footerRight}>
                    <Button color="primary" onClick={this.handleSelect}>
                        <SaveIcon />Lưu
                        </Button>
                </div>
            </div>
        </Modal>
    </div>);
}
}

export default withStyles(styles)(OptionPopup)