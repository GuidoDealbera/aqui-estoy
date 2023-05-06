const styles = {
    container: {
        backgroundColor: "#f3f3f3",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
    },
    header: {
        color: "#19154E",
        borderRadius: "10px",
        backgroundColor: "#fff",
        margin: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        border: "solid 2px #e1e1e1",
        width: "400px",
        height: "400px",
        avatar: {
            margin: "30px",
            height: "100px",
            width: "100px",
        },
    },
    body: {
        borderRadius: "10px",
        backgroundColor: "#fff",
        display: "flex",
        flexWrap: "wrap",
        width: "400px",
        height: "400px",
        border: "solid 2px #e1e1e1",
        margin: "10px",
        info: {
            borderTop: "solid 2px #e1e1e1",
            display: "flex",
            padding: "10px",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            label: {
                display: "flex",
                color: "#19154E"
            },
            data: {
                color: "gray"
            }
        },
    },
};

export default styles;