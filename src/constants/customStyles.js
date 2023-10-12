export const customStyles = {
  control: (styles) => ({
    ...styles,
    width: "100%",
    maxWidth: "14rem",
    minWidth: "12rem",
    borderRadius: "5px",
    color: "#fff",
    fontSize: "0.8rem",
    lineHeight: "1.75rem",
    backgroundColor: '#000',
    cursor: "pointer",
    border: "2px solid #000000",
  }),
  option: (styles) => {
    return {
      ...styles,
      color: "#fff",
      fontSize: "0.8rem",
      lineHeight: "1.75rem",
      width: "100%",
      background: '#111111',
      ":hover": {
        backgroundColor: "#555",
        color: "#fff",
        cursor: "pointer",
      },
    };
  },
  menu: (styles) => {
    return {
      ...styles,
      backgroundColor: '#000000',
      maxWidth: "14rem",
      border: "2px solid #000000",
      borderRadius: "5px",
    };
  },
  menuList: (base)=>({
    ...base,
    "::-webkit-scrollbar": {
      width: "4px",
      height: "0px",
    },
    "::-webkit-scrollbar-track": {
      background: "#555",
    },
    "::-webkit-scrollbar-thumb": {
      background: "#000", 
    },
  }),

  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: "#fff",
      fontSize: "0.8rem",
      lineHeight: "1.75rem",
    };
  },
};
