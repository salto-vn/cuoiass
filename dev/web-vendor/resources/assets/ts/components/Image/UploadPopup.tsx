import * as React from 'react';
import { Theme, createStyles, withStyles, Modal, Card } from '@material-ui/core';
import CustomLinearProgress from '../../common/CustomLinearProgress/CustomLinearProgress';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import modalStyle from '../../../styles/components/modalStyle';
import CardBody from '../../common/Card/CardBody';
import Up from '@material-ui/icons/ArrowUpward';
import Button from '../../common/FormControls/CustomButtons/Button';
import {
    primaryColor
    , grayColor
} from "../../../styles/material-dashboard-pro-react";
import CardFooter from '../../common/Card/CardFooter';
import { isEmpty, createSnackBarMess } from '../../common/Utils';
import ImageUpload from '../../common/CustomUpload/ImageUpload';

// Util
import * as HandleRequest from '../../api/HandleRequest';
import API_URL from '../../bootstrap/Url';
import { IFormState } from '../../interface/IForm';

const styles = (theme: Theme) => createStyles({
    ...modalStyle(theme),
    carousel: {
        padding: "7px",
        maxHeight: "600px",
        overflow: "scroll"
    },
    image: {
        // height: "500px"
    },
    icon: {
        color: grayColor,
        "&:hover,&:focus": {
            color: primaryColor
        },
    },
    footerRight: {
        textAlign: "right",
        width: "100%"
    },

})

export interface UploadPopupState extends IFormState {
    images: FileList, 
    upload: any
}

class UploadPopup extends React.Component<{ classes?: any, onToggleModal: any, files:any }>
{

    abortControler = new AbortController();
    public state = { 
        isLoading: false, 
        images: undefined, 
        upload: undefined,
        isValidate:false,
        isError:false,
        showMessage:false,

     };

    public componentDidMount = () => {
        const {files} = this.props;
        debugger;
        this.setState({ images:files });
    }

    public onToggleModal = (evt: any) => {
        this.props.onToggleModal("");
        this.abortControler.abort();
    }

    private handleUpload = async (event: any) => {
        const { images } = this.state;
        const response = await HandleRequest.Upload(API_URL.UPLOAD_CRL_upload, images, this.abortControler.signal)
        if (response.isError) {
            return this.setState({
                isValidate: response.isValidate,
                isError: response.isError,
                showMessage: response.isValidate,
                validateMessage: response.validateMessage,
                isLoading: false,
            });
        }

        if (response.isValidate) {
            return this.setState({
                isValidate: response.isValidate,
                validateMessage: response.validateMessage,
                isError: response.isError,
                showMessage: response.isValidate,
                isLoading: false,
            });
        }

        this.setState({
            showMessage: true,
            isValidate: response.isValidate,
            isError: response.isError
        });
        this.props.onToggleModal(images);
    }

    private handleChangeImage = (files:any) => {
        this.setState({images: files});
    }


    public render() {
        const { classes } = this.props;
        const { isLoading } = this.state;
        return <div>
            <Modal
                open={true}
                onClose={this.onToggleModal}>
                <div className={classes.modal}>
                    <div>
                        {isLoading &&
                            <CustomLinearProgress className={classes.progress}
                                color="info"
                            />
                        }
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                                <Card className={classes.header}>
                                    <CardBody>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={12}>
                                                <div className={classes.carousel}>
                                                    <legend>Regular Image</legend>
                                                    <ImageUpload selectMulti={true}
                                                        onChange = {this.handleChangeImage}
                                                        addButtonProps={{
                                                            color: "rose",
                                                            round: true
                                                        }}
                                                        changeButtonProps={{
                                                            color: "rose",
                                                            round: true
                                                        }}
                                                        removeButtonProps={{
                                                            color: "danger",
                                                            round: true
                                                        }}
                                                        files ={this.state.images}
                                                    />
                                                </div>
                                            </GridItem>
                                        </GridContainer>
                                    </CardBody>
                                    <CardFooter>
                                        <div className={classes.footerRight}>
                                            <Button color="primary" onClick={this.handleUpload}>
                                                <Up />Tải lên
                                            </Button>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </GridItem>
                        </GridContainer>
                    </div>
                </div>
            </Modal>
            {createSnackBarMess(this.state.isValidate, this.state.isError, this.state.showMessage, () => { this.setState({ showMessage: false })})}
        </div>;
    }
}

export default withStyles(styles)(UploadPopup)