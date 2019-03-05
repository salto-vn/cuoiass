import React from "react";
// used for making the prop types of this component
import PropTypes from "prop-types";

// core components

import defaultImage from "../../../img/image_placeholder.jpg";
import defaultAvatar from "../../../img/placeholder.jpg";
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import Button from '../FormControls/CustomButtons/Button';
import { isEmpty, createSnackBarMess } from '../Utils';
import { Theme, createStyles, withStyles, GridList, GridList, GridList, GridListTile, ListSubheader, GridListTileBar, IconButton } from '@material-ui/core';
import {
  grayColor
} from "../../../styles/material-dashboard-pro-react";




const styles = (theme: Theme) => createStyles({
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: "100%",
  },
  icon: {
    color: grayColor
  }
})

export interface ImageUploadState {
  files: any,
  upload: any,
  changeIndex: any
}

class ImageUpload extends React.Component<{
  avatar?: boolean,
  addButtonProps?: any,
  changeButtonProps?: any,
  removeButtonProps?: any,
  selectMulti?: boolean, classes?: any
  onChange?:any,
  files:any
}, ImageUploadState> {

  abourtController = new AbortController();
  public state = {
    files: [],
    upload: [],
    changeIndex: undefined,
  };

  handleImageChange = (e: any) => {
    e.preventDefault();
    const { files, changeIndex } = this.state;
    const { selectMulti } = this.props;
    let selectFiles = e.target.files;
    if (!isEmpty(changeIndex)) {
      files[changeIndex] = selectFiles[changeIndex];
    } else {
      if (!selectMulti) {
        files[0] = selectFiles[0];
      } else {
        for (var i = 0; i < selectFiles.length; i++) {
          files.push(selectFiles[i]);
        }
      }
    }
    this.props.onChange(files);
    this.setState({
      files: files,
    });
  }


  handleClick = (index: number, e: any) => {
    const { upload } = this.state;
    this.setState({ changeIndex: index });
    upload.click();
  }

  handleRemove = (index: number, e: any) => {
    const { files, upload } = this.state;
    files.splice(index, 1);
    upload[index] = null;
    this.setState({
      files, upload      
    });
  }


  static shouldComponentUpdate(nextProps: any, nextState: any) {
    // Typical usage (don't forget to compare props):
    
    const files = nextProps.files;
    if (!isEmpty(files)) {
      debugger;
      nextState.files= files;
      return {...nextState, files}
    }
    return {...nextState};
  }

  render() {
    var {
      avatar,
      addButtonProps,
      changeButtonProps,
      removeButtonProps,
      selectMulti,
      classes
    } = this.props;

    var {  files  } = this.state;
    if (!isEmpty(this.props.files)) {
      files = this.props.files;
    }
    return (
      <div className="fileinput text-center">
        {!selectMulti ?
          <>
            <input type="file" onChange={this.handleImageChange.bind(this)} ref={(ele: any) => this.state.upload = ele} />
            <div className={"thumbnail" + (avatar ? " img-circle" : "")}>
              {isEmpty(files) ?
                <img src={defaultImage} alt="..." /> :
                <img src={URL.createObjectURL(files[0])} alt="..." />
              }

            </div>
            <div>
              {isEmpty(files) ? (
                <Button {...addButtonProps} onClick={this.handleClick.bind(this, "")}>
                  {avatar ? "Add Photo" : "Select image"}
                </Button>
              ) : (
                  <span>
                    <Button {...changeButtonProps} onClick={this.handleClick.bind(this, "")}>
                      Change
                   </Button>
                    {avatar ? <br /> : null}
                    <Button
                      {...removeButtonProps}
                      onClick={this.handleRemove.bind(this, 0)}
                    >
                      <i className="fas fa-times" /> Remove
              </Button>
                  </span>
                )}
            </div>
          </> :
          <>
            <input type="file" multiple={true} onChange={this.handleImageChange.bind(this)} ref={(ele: any) => this.state.upload = ele} />
            {isEmpty(files) && <>
              <div className={"thumbnail" + (avatar ? " img-circle" : "")}>
                <img src={defaultImage} alt="..." />
              </div>
              <div>
                <Button {...addButtonProps} onClick={this.handleClick.bind(this, "")}>
                  {avatar ? "Add Photo" : "Select image"}
                </Button>
              </div>
            </>}

            <div className={classes.grid}>
              <GridList className={classes.gridList} cols={3}>
                {files.map((file: any, index: number) => {
                  return (<GridListTile key={index} >
                    <img style={{ width: "100%" }} src={URL.createObjectURL(file)} alt="..." />
                    />
                    <GridListTileBar
                      title=""
                      classes={{
                        root: classes.titleBar,
                        title: classes.title,
                      }}
                      actionIcon={
                      <>
                        <IconButton className={classes.icon} onClick={this.handleClick.bind(this, index)}>
                          <UpdateIcon />
                        </IconButton>
                        <IconButton className={classes.icon} onClick={this.handleRemove.bind(this, index)}>
                          <DeleteIcon />
                        </IconButton>
                      </>
                      }
                    />
                  </GridListTile>)})
                }
              </GridList>
            </div>
          </>
        }
      </div>
    );
  }
}


export default withStyles(styles)(ImageUpload);
