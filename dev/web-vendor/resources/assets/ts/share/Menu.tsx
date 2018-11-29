import React from 'react';
import { Paper, MenuList, MenuItem, ListItemIcon, Theme, ListItemText, withStyles } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import DraftsIcon from '@material-ui/icons/Drafts';
import InboxIcon from '@material-ui/icons/MoveToInbox';

const styles = (theme: Theme) => ({
    menuItem: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& $primary, & $icon': {
          color: theme.palette.common.white,
        },
      },
    },
    primary: {},
    icon: {},
  });

class NaviMenu extends React.Component<{},{}> {

    public render () {
        return (
            <Paper>
              <MenuList>
                <MenuItem >
                  <ListItemIcon>
                    <SendIcon />
                  </ListItemIcon>
                  <ListItemText inset primary="Sent mail" />
                </MenuItem>
                <MenuItem >
                  <ListItemIcon >
                    <DraftsIcon />
                  </ListItemIcon>
                  <ListItemText inset primary="Drafts" />
                </MenuItem>
                <MenuItem >
                  <ListItemIcon >
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText inset primary="Inbox" />
                </MenuItem>
              </MenuList>
            </Paper>
          );
    }
}

export default withStyles(styles)(NaviMenu);