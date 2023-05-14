const styles = {
    box: {
      textAlign: "center",
    },
    container: {
      display: "flex",
      justifyContent: "center",
      marginTop: "5%"
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
        height: "150px",
        width: "150px",
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
        padding: "4px",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        label: {
          display: "flex",
          color: "#19154E",
        },
        data: {
          color: "gray",
        },
      },
    },
    buttons: {
      justifyContent: "center",
      alignItems: "center",
      margin: "1%",
      color: "white",
      backgroundColor: "#1E1C4E",
      borderRadius: "10px",
      boxShadow: "5px 5px 5px #C8CCD8",
      "&:hover": {
          color: "white",
          backgroundColor: "#4A235A"
      }
    },
    whatsApp: {
      color: "green",
    },
  };
  
  export default styles;
  