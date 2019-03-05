import { Theme, createStyles } from "@material-ui/core";

const modalStyle = (theme: Theme) => createStyles({
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

export default modalStyle;